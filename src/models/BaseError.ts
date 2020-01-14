export default class BaseError {
    code: string;
    message: string;
    constructor(code: string, message: string) {
        this.message = message;
        this.code = code;
    }
}
