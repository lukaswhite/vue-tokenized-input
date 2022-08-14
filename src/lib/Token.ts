export default class Token {
    _name: string;
    _label: string|null;
    _example: string|null;

    constructor(name: string, label: string|null = null, example: string|null = null) {
        //if()
        const re = new RegExp('^[a-zA-Z0-9-_.]+$')
        if(!re.test(name)){
            throw new Error('Invalid token name')
        }
        this._name = name.toUpperCase()
        this._label = label
        this._example = example
    }

    set name(name) {
        this._name = name.toUpperCase()
    }

    get name(): string {
        return this._name
    }

    get label(): string {
        return this._label ?? this._name.toLowerCase()
    }

    get example(): string {
        return this._example ?? this._name.toLowerCase()
    }
}