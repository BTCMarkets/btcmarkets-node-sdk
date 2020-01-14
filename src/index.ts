import { IClientConfig } from './types/Client';
import clientConfig from './config';
import Markets from './services/Markets';
import Account from './services/Account';
import Funds from './services/Funds';
import Trades from './services/Trades';
import Orders from './services/Orders';
import Batches from './services/Batches';
import Reports from './services/Reports';
import Socket from './services/WebSocket';

class Client {
    public markets: Markets;
    public orders: Orders;
    public account: Account;
    public funds: Funds;
    public trades: Trades;
    public batches: Batches;
    public reports: Reports;
    public socket: Socket;

    constructor(config?: IClientConfig) {
        if (config) {
            clientConfig.init(config);
        }

        this.markets = new Markets();
        this.account = new Account();
        this.funds = new Funds();
        this.trades = new Trades();
        this.orders = new Orders();
        this.batches = new Batches();
        this.reports = new Reports();
        this.socket = new Socket();
    }
}

export default Client;
