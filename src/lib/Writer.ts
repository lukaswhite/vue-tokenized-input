import {Node} from "prosemirror-model";

/**
 * Converts a Prosemirror document to a tokenized string.
 */
export default class {

    prefix: string;
    suffix: string;

    constructor(prefix: string, suffix: string) {
        this.prefix = prefix
        this.suffix = suffix
    }

    run(node: Node)
    {
        let result: Array<Array<string>> = []

        node.forEach((paragraph: Node) => {
            
            let children: string[] = []

            paragraph.forEach((child: Node) => {
                if(child.type.name === 'token'){
                    children.push(`${this.prefix}${child.attrs.token.toString().toUpperCase()}${this.suffix}`)
                } else {
                    if(child.text!==undefined){
                        children.push(child.text)
                    }
                }
            })

            result.push(children)
        })


        return result.map((lines: string[]) => lines.join('')).join("\n")
    }
}