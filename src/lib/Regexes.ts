export default class {
    prefix: string;
    suffix: string;

    constructor(prefix: string, suffix: string) {
        this.prefix = prefix
        this.suffix = suffix
    }

    get(): RegExp
    {
        return new RegExp(`${this.prefix}[a-zA-Z0-9-_.]+${this.suffix}`, 'g')
    }

    /**
    token(): RegExp
    {
        return new RegExp(`${this.prefix}[a-zA-Z0-9-_.]+`)
    }**/
}