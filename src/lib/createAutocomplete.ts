import { EditorView, DecorationAttrs } from 'prosemirror-view';
import {ActionKind, autocomplete, AutocompleteAction, FromTo, Options} from 'prosemirror-autocomplete';
import TokenCollection from "./TokenCollection";
import { PluginKey } from 'prosemirror-state';
import {Schema} from "prosemirror-model"

const pluginKey = new PluginKey('autocomplete');

type Trigger = {
    name: string;
    trigger: string | RegExp;
    cancelOnFirstSpace?: boolean; // Default is true
    allArrowKeys?: boolean; // Default is false
    decorationAttrs?: DecorationAttrs;
};

interface OpenAutocomplete {
    action: 'add';
    trigger: string;
    filter?: string;
    type: Trigger | null;
}

interface CloseAutocomplete {
    action: 'remove';
}

type AutocompleteTrMeta = OpenAutocomplete | CloseAutocomplete;


function closeAutocomplete(view: EditorView) {
    const plugin = pluginKey.get(view.state);
    if(typeof plugin === 'object') {
        const meta: AutocompleteTrMeta = { action: 'remove' };
        const tr = view.state.tr.setMeta(plugin, meta);
        view.dispatch(tr);
        return true;
    }
}

function placeSuggestion(el: HTMLElement, picker: any) {
    el.style.display = 'block'
    const rect = document.getElementsByClassName('autocomplete')[0]?.getBoundingClientRect();
    el.style.top = `${rect.top + rect.height}px`;
    el.style.left = `${rect.left}px`;
    [].forEach.call(el.children, (item: HTMLDivElement, i) => {
        item.classList[i === picker.current ? 'add' : 'remove']('selected');
    });
}

export default function (schema: Schema, suggestion: HTMLElement, tokens: TokenCollection, prefix: string) {

    const picker = {
        view: null as EditorView | null,
        open: false,
        current: 0,
        range: null as FromTo | null,
    };

    [].forEach.call(suggestion.children, (item: HTMLDivElement) => {
        item.addEventListener('click', () => {
            if (!picker.view) return;
            closeAutocomplete(picker.view);
            picker.open = false;
            placeSuggestion(suggestion, picker)
            if (!picker.range) return;
            const token = tokens.tokens[picker.current].name
            const tr = picker.view.state.tr
                .replaceRangeWith(picker.range.from, picker.range.to, schema.nodes.token.create({token}))
            picker.view.dispatch(tr);
            picker.view.focus();
        });
    });

    const options: Options = {
        triggers: [
            { name: 'token', trigger: prefix }
        ],
        reducer: (action: AutocompleteAction): boolean => {
            picker.view = action.view;
            if(action.kind === ActionKind.open){
                picker.current = 0;
                picker.open = true;
                picker.range = action.range;
                placeSuggestion(suggestion, picker)
            }
            if(action.kind === ActionKind.close) {
                suggestion.style.display = 'none'
            }
            if(action.kind === ActionKind.down) {
                suggestion.style.display = 'none'
                picker.current += 1;
                picker.current %= tokens.tokens.length;
                placeSuggestion(suggestion, picker)
            }
            if(action.kind === ActionKind.up) {
                picker.current -= 1;
                picker.current += tokens.tokens.length;
                picker.current %= tokens.tokens.length;
                placeSuggestion(suggestion, picker)
            }
            if(action.kind === ActionKind.enter) {
                const token = tokens.tokens[picker.current].name
                const tr = action.view.state.tr
                    .replaceRangeWith(action.range.from, action.range.to, schema.nodes.token.create({token}))
                action.view.dispatch(tr);
                return true;
            }
            return true
        }
    };

    return autocomplete(options)
}
