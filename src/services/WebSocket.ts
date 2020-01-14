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

    constructor() {
        super();
        this.config = config;
        this.headers = {
            clientType: 'api',
        };

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

    //end region
}

export default WebSocketClient;
