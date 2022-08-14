import {Schema} from "prosemirror-model";
import {InputRule} from "prosemirror-inputrules"
import {EditorState} from "prosemirror-state";
import TokenCollection from "../lib/TokenCollection";

/**
 * Creates an input rule that creates a token as the user types.
 *
 * @param schema
 * @param tokens
 * @param re
 * @param allowUndefined
 */
export default function(schema: Schema, tokens: TokenCollection, re: RegExp, allowUndefined: boolean){
    return new InputRule(
        re,
        (state: EditorState, match: RegExpMatchArray,start: number, end: number) => {
            let parsed = new RegExp('[(a-zA-Z0-9]+', 'g').exec(match[0])
            if(!parsed){
                return null
            }
            let token = parsed.toString()
            if(!tokens.has(token) && !allowUndefined){
                return state.tr.replaceRangeWith(start, end, schema.text(token))
            }
            return state.tr
                .replaceRangeWith(start, end, schema.nodes.token.create({token}))
        }
    )
}