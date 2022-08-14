import TokenCollection from "@/lib/TokenCollection";
import {Node} from "prosemirror-model";

function getToken(dom: HTMLElement): string
{
    let attr = dom.getAttribute("token")
    if(attr === null){
        return ''
    }
    return attr.toString()
}

export default function(tokens: TokenCollection) {
    return {
        attrs: {token: {}},
        inline: true,
        group: "inline",
        draggable: true,

        toDOM: (node:Node) => ["span", {
            "token": node.attrs.token,
            title: node.attrs.token,
            class: tokens.has(node.attrs.token.toString()) ? "tokenized-input__token" : "tokenized-input__token tokenized-input__token--invalid"
        },
            //`${node.attrs.token}`
            tokens.has(node.attrs.token.toString()) ? tokens.get(node.attrs.token.toString()).label : node.attrs.token.toString()
        ],
        parseDOM: [{
            tag: "span[token]",
            getAttrs: (dom: HTMLElement|string) => {
                let token = typeof dom === "string" ? dom : getToken(dom)
                return tokens.has(token) ? {token} : false
            }
        }]
    }
}