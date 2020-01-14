import { IClientConfig, IConfig } from './types/Client';

const init = (obj: IClientConfig) => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key) && config.hasOwnProperty(key)) {
            config[key as keyof IClientConfig] = obj[key as keyof IClientConfig];
        }
    }
};

const config: IConfig = {
    key: '',
    secret: '',
    init: init,
};

export default config;
