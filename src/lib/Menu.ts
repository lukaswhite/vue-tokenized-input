import TokenCollection from "./TokenCollection";
import {Dropdown, MenuItem, menuBar} from "prosemirror-menu";
import Token from "./Token";
import {Schema} from "prosemirror-model";

function insertToken(token: string, schema: Schema) {
    return function(state: any, dispatch: any) {
        let {$from} = state.selection, index = $from.index()
        if (!$from.parent.canReplaceWith(index, index, schema.nodes.token))
            return false
        if (dispatch)
            dispatch(state.tr.replaceSelectionWith(schema.nodes.token.create({token})))
        return true
    }
}

export default function createMenu(tokens: TokenCollection, schema: Schema, label: string) {

    let items: MenuItem[] = tokens.tokens.map((token: Token) => new MenuItem({
        title: "Insert " + token.label,
        label: `${token.label}`,
        enable() { return true },
        run: insertToken(token.name, schema)
    }))

    return menuBar({content:[[new Dropdown(items, {label:label})]]})
}