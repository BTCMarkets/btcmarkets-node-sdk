export interface IClientConfig {
    key: string;
    secret: string;
}

export interface IConfig extends IClientConfig {
    init: Function;
}
