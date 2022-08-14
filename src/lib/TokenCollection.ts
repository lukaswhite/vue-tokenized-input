import Token from "./Token";

import TokenDef from "../types/TokenDef";

export default class TokenCollection {

    tokens: Token[];

    constructor(tokens : Token[]) {
        this.tokens = tokens
    }

    static createFromArray(arr: Array<TokenDef>)
    {
        return new this(arr.map((item:TokenDef) => {
            return new Token(item.name, item.label, item.example)
        }))
    }

    add(token: Token){
        this.tokens.push(token)
    }

    has(name: string): boolean
    {
        return this.get(name) !== undefined
    }

    get(name: string): Token
    {
        return this.tokens.filter((token: Token) => token.name === name.toUpperCase())[0]
    }

    count(): number
    {
        return this.tokens.length
    }

    isEmpty(): boolean
    {
        return this.count() === 0
    }

    forEach(fn: () => {}){
        return this.tokens.forEach(fn)
    }

    map(fn: () => any){
        return this.tokens.map(fn)
    }
}