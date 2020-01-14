import config from '../config';
import { IClientConfig } from '../types/Client';
import { SOCKET_URL, SOCKET_VERSION } from '../constants';
import WebSocket from 'ws';
import { buildSocketHeaders } from '../helpers/authHelpers';
import {
    ISocketRequest,
    IPublicSocketRequest,
    ISubscriptionRequest,
    IEventError,
    IOrderChangeEvent,
    IOrderChangeEventData,
    ITradeEventData,
    ITradeEvent,
    ITickEventData,
    ITickEvent,
    IOrderbookEventData,
    IOrderbookEvent,
    IFundChangeEventData,
    IFundChangeEvent,
    IHeartbeatEventData,
    IHeartbeatEvent,
    IOrderBookUpdateEventData,
    IOrderBookUpdateEvent,
} from '../types/WebSocket';
import { EventEmitter } from 'events';

class WebSocketClient extends EventEmitter {
    private config: IClientConfig;
    private ws: WebSocket | undefined | null;
    private headers: ISocketRequest | IPublicSocketRequest;
    // private orderbookSnapshotByMarket: any;
    // private orderbookUpdateQueue: any[];

    constructor() {
        super();
        this.config = config;
        this.headers = {
            clientType: 'api',
        };
        // this.orderbookUpdateQueue = [];

        if (this.config.key || this.config.secret) {
            this.headers = {
                ...this.headers,
                ...buildSocketHeaders(this.config.key, this.config.secret),
            };
        }
    }

    public subscribe(request: ISubscriptionRequest) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.close();
        }
        this.connect(request);
    }

    //region Events
    public onOpen() {
        this.emit('open');
    }
    public onMessage(data: any) {
        data = JSON.parse(data);

        switch (data.messageType) {
            case 'orderChange':
                this.emit('message', {
                    messageType: data.messageType,
                    data: {
                        ...this._castEventDataToInterface(data),
                        orderId: data.orderId.toString(),
                    } as IOrderChangeEventData,
                } as IOrderChangeEvent);
                break;
            case 'trade':
                this.emit('message', {
                    messageType: data.messageType,
                    data: {
                        ...this._castEventDataToInterface(data),
                        tradeId: data.tradeId.toString(),
                    } as ITradeEventData,
                } as ITradeEvent);
                break;
            case 'tick':
                this.emit('message', {
                    messageType: data.messageType,
                    data: this._castEventDataToInterface(data) as ITickEventData,
                } as ITickEvent);
                break;
            case 'orderbook':
                this.emit('message', {
                    messageType: data.messageType,
                    data: this._castEventDataToInterface(data) as IOrderbookEventData,
                } as IOrderbookEvent);
                break;
            case 'fundChange':
                this.emit('message', {
                    messageType: data.messageType,
                    data: {
                        ...this._castEventDataToInterface(data),
                        fundtransferId: data.fundtransferId.toString(),
                    } as IFundChangeEventData,
                } as IFundChangeEvent);
                break;
            case 'heartbeat':
                this.emit('message', {
                    messageType: data.messageType,
                    data: this._castEventDataToInterface(data) as IHeartbeatEventData,
                } as IHeartbeatEvent);
                break;
            case 'orderbookUpdate':
                this.emit('message', {
                    messageType: data.messageType,
                    data: this._castEventDataToInterface(data) as IOrderBookUpdateEventData,
                } as IOrderBookUpdateEvent);
                break;
            case 'error':
                this.onError(data);
                break;
        }
    }

    public onClose() {
        this.emit('close');
    }

    public onError(error: IEventError) {
        if (!error) {
            return;
        }

        this.emit('error', error);
    }
    //endregion

    //reigon Methods
    public addSubscription(request: ISubscriptionRequest) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            const payload = {
                ...this.headers,
                ...request,
                messageType: 'addSubscription',
            };

            this.ws.send(JSON.stringify(payload));
        } else {
            this.emit('error', {
                messageType: 'addSubscription',
                code: 3,
                message: 'connection is not open',
            });
        }
    }

    public removeSubscription(request: ISubscriptionRequest) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            const payload = {
                ...this.headers,
                ...request,
                messageType: 'removeSubscription',
            };

            this.ws.send(JSON.stringify(payload));
        } else {
            this.emit('error', {
                messageType: 'addSubscription',
                code: 3,
                message: 'connection is not open',
            });
        }
    }

    public close() {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.close();
        } else {
            this.emit('error', {
                messageType: 'close',
                code: 3,
                message: 'connection is already closed',
            });
        }
    }

    //endregion

    //region Private Methods
    private connect(request: ISubscriptionRequest) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this._subscribe(request);
        } else {
            this.ws = new WebSocket(SOCKET_URL + SOCKET_VERSION);
            this.ws.on('open', () => {
                this._subscribe(request);
                this.onOpen();
            });
            this.ws.on('message', this.onMessage.bind(this));
            this.ws.on('close', this.onClose.bind(this));
            this.ws.on('error', this.onError.bind(this));
        }
    }

    private _subscribe(request: ISubscriptionRequest) {
        if (!request) {
            this.emit('error', {
                messageType: 'subscribe',
                code: 3,
                message: 'subscribe arguments are missing',
            });
            return;
        }

        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            const payload = {
                ...this.headers,
                ...request,
                messageType: 'subscribe',
            };

            this.ws.send(JSON.stringify(payload));
        } else {
            this.emit('error', {
                messageType: 'subscribe',
                code: 3,
                message: 'connection is not open',
            });
        }
    }

    private _castEventDataToInterface(data: any) {
        const { messageType, timestamp, ...otherKeys } = data;
        const result = { ...otherKeys };

        if (timestamp) {
            result.timestamp = new Date(timestamp);
        }

        return result;
    }

    // private _castOrderbookUpdate(data: any): IOrderBookUpdateEventData | null {
    //     const { messageType, snapshot, ...otherKeys } = data;

    //     if (snapshot) {
    //         if (!this.orderbookSnapshotByMarket) {
    //             this.orderbookSnapshotByMarket = {};
    //         }

    //         this.orderbookSnapshotByMarket[data.marketId as string] = {
    //             ...otherKeys,
    //         } as IOrderBookUpdateEventData;
    //         //Appling queue
    //         this._orderbookUpdateQueue(data.marketId);
    //     } else {
    //         if (!this.orderbookSnapshotByMarket || !this.orderbookSnapshotByMarket[data.marketId]) {
    //             this.orderbookUpdateQueue.push(data);
    //             return null;
    //         }

    //         const snapshotObject = this.orderbookSnapshotByMarket[data.marketId] as IOrderBookUpdateEventData;
    //         const updateResult = this._pushOrderbookUpdateToSnapshot(snapshotObject, data);
    //         if (!updateResult) {
    //             return null;
    //         }
    //     }

    //     return this.orderbookSnapshotByMarket[data.marketId] as IOrderBookUpdateEventData;
    // }

    // private _mergeOrderbookArrays(newArray: any[], targetArray: any[], isAscending: boolean): void {
    //     for (const item of newArray) {
    //         const existingOrder = targetArray.filter(x => x[0] === item[0])[0]; //Getting bid or ask with same price
    //         if (!existingOrder && item[2] !== 0) {
    //             targetArray.push(item);
    //             //sorting array
    //             targetArray.sort((a, b) =>
    //                 isAscending ? parseFloat(a[0]) - parseFloat(b[0]) : parseFloat(b[0]) - parseFloat(a[0])
    //             );
    //         } else {
    //             if (item[2] === 0) {
    //                 const index = targetArray.findIndex(b => b[0] === item[0]);
    //                 targetArray.splice(index, 1);
    //             } else {
    //                 existingOrder[1] = item[1]; // Volume
    //                 existingOrder[2] = item[2]; // count
    //             }
    //         }
    //     }
    // }

    // private _pushOrderbookUpdateToSnapshot(snapshotObject: IOrderBookUpdateEventData, updateData: any) {
    //     if (snapshotObject.snapshotId >= updateData.snapshotId) {
    //         return false;
    //     }

    //     snapshotObject.snapshotId = updateData.snapshotId;

    //     this._mergeOrderbookArrays(updateData.bids, snapshotObject.bids, false);
    //     this._mergeOrderbookArrays(updateData.asks, snapshotObject.asks, true);
    //     return true;
    // }

    // private _orderbookUpdateQueue(marketId: string) {
    //     const marketQueue = this.orderbookUpdateQueue.filter(x => x.marketId === marketId);

    //     //Appling queue
    //     if (marketQueue.length > 0) {
    //         marketQueue.sort((a, b) => b.snapshotId - a.snapshotId);
    //         while (marketQueue.length > 0) {
    //             const queueData = marketQueue.pop();
    //             const snapshotObject = this.orderbookSnapshotByMarket[
    //                 queueData.marketId as string
    //             ] as IOrderBookUpdateEventData;
    //             if (!snapshotObject) {
    //                 console.log(queueData.marketId, 'marketId');
    //                 console.log(this.orderbookSnapshotByMarket, 'snapshot');
    //             }
    //             this._pushOrderbookUpdateToSnapshot(snapshotObject, queueData);
    //             //removing processed element from queue
    //             const index = this.orderbookUpdateQueue.findIndex(i => i.snapshotId === queueData.snapshotId);
    //             if (index > -1) {
    //                 this.orderbookUpdateQueue.splice(index, 1);
    //             }
    //         }
    //         this.orderbookUpdateQueue.filter(el => !this.orderbookUpdateQueue.includes(el));
    //     }
    // }
    //end region
}

export default WebSocketClient;
