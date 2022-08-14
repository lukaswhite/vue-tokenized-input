<template>
    <div
        class="tokenized-input"
        :class="{
            'tokenized-input--show-invalid': showInvalidTokens,
            'tokenized-input--has-invalid-tokens': containsInvalidTokens,
            'tokenized-input--text': type === 'text',
            'tokenized-input--textarea': type === 'textarea',
            'tokenized-input--disabled': disabled,
        }">

        <!-- @slot Allows you to add content above the editor. -->
        <slot name="above-editor"></slot>

        <div ref="editor" class="tokenized-input__editor"></div>

        <!-- @slot Allows you to add content below the editor. -->
        <slot name="below-editor"></slot>

        <div v-if="showInvalidMessage && containsInvalidTokens">
            <!--
            @slot Use this slot to add an error message if there are any tokens that have not been predefined.
            @binding {array} invalid The invalid tokens
            -->
            <slot name="invalid-message" :invalid="invalidTokens"></slot>
        </div>

        <token-preview
            v-if="showPreview"
            :value="raw"
            :re="re"
            :tokens="tokensCollection"
        ></token-preview>

        <available-tokens
            v-if="showAvailableTokens"
            :show-label="showAvailableTokensLabel"
            :label="availableTokensLabel"
            :tokens="tokensCollection"
        ></available-tokens>

        <div v-if="showAutocomplete" ref="suggestion" class="tokenized-input__autocomplete">
            <div
                v-for="token in tokensCollection.tokens"
                :key="token.name"
                class="tokenized-input__autocomplete__option"
            ><span>{{token.label}}</span></div>
        </div>
    </div>
</template>

<script>

    import {EditorState} from "prosemirror-state"
    import {EditorView} from "prosemirror-view"
    import {Node} from "prosemirror-model"
    import {inputRules} from "prosemirror-inputrules"
    import {keymap} from "prosemirror-keymap"
    import {baseKeymap} from "prosemirror-commands"

    import buildSpec from "../lib/Spec"
    import buildSchema from "../lib/Schema"
    import createMenu from "../lib/Menu";
    import createAutocomplete from "@/lib/createAutocomplete";
    import createInputRule from "../lib/createInputRule"
    import TokenCollection from "../lib/TokenCollection";
    import Parser from "../lib/Parser";
    import Writer from "../lib/Writer";
    import Regexes from "@/lib/Regexes";

    import AvailableTokens from "./AvailableTokens";
    import TokenPreview from "./TokenPreview";

    export default {
        name: "TokenizedInput",
        components: {TokenPreview, AvailableTokens},
        props:{
            /**
             * The input type
             * @values text, textarea
             */
            type: {
                type: String,
                default: 'text',
                validator: function (value) {
                    return ['text', 'textarea'].includes(value)
                }
            },
            /**
             * The value (v-model)
             */
            value: {
                type: String,
                default: ''
            },
            /**
             * The token prefix; defaults to [[
             */
            tokenPrefix: {
                type: String,
                default: '[['
            },
            /**
             * The token suffix; defaults to ]]
             */
            tokenSuffix: {
                type: String,
                default: ']]'
            },
            /**
             * The available tokens. Each entry must have at least a name, and an optional (but recommended)
             * label and example.
             */
            tokens:{
                type: Array,
                default: () => []
            },
            /**
             * When set to true, any tokens that are not pre-defined will be assigned an additional
             * CSS class.
             */
            showInvalidTokens:{
                type: Boolean,
                default: true
            },
            /**
             * When set to false, users are prevented from entering tokens that have not been predefined.
             */
            allowUndefinedTokens:{
                type: Boolean,
                default: true
            },
            /**
             * Used in conjunction with the invalid-message slot, to display an error message when the
             * value contains any tokens that have not been predefined.
             */
            showInvalidMessage:{
                type: Boolean,
                default: false
            },
            /**
             * Whether to show the insert menu.
             */
            showMenu:{
                type: Boolean,
                default: false
            },
            /**
             * Whether to show the autocomplete.
             */
            showAutocomplete:{
                type: Boolean,
                default: false
            },
            /**
             * The label to display on the menu.
             */
            insertLabel:{
                type: String,
                default: 'Insert'
            },
            /**
             * Whether to show the preview.
             */
            showPreview:{
                type: Boolean,
                default: true
            },
            /**
             * When set to true, this renders a list of the available tokens below the widget.
             */
            showAvailableTokens:{
                type: Boolean,
                default: true
            },
            /**
             * Set to false to hide the label that gets prepended to the list of available tokens.
             */
            showAvailableTokensLabel:{
                type: Boolean,
                default: true
            },
            /**
             * The text that gets prepended to the list of available tokens.
             */
            availableTokensLabel:{
                type: String,
                default: 'Available tokens'
            },
            /**
             * Whether to show the clear button
             */
            showClearButton:{
                type: Boolean,
                default: true
            },
            /**
             * Set to true to disable the widget.
             */
            disabled:{
                type: Boolean,
                default: false
            },
            /**
             * An object containing any additional CSS classes to wish to add to the component.
             */
            cssClasses:{
                type: Object,
                default: () => {}
            }
        },
        data: function(){
            return {
                val: null,
                view: null,
                re: new Regexes(this.tokenPrefix, this.tokenSuffix).get(),
                tokensCollection: TokenCollection.createFromArray(this.tokens),
                previewer: null,
                parser: new Parser(new Regexes(this.tokenPrefix, this.tokenSuffix).get()),
                writer: new Writer(this.tokenPrefix, this.tokenSuffix),
                css: Object.assign(
                    {},
                    {
                        wrapper: 'token-input-wrapper',
                        editor: 'token-input-holder',
                        token: 'token',
                        'invalid-token': 'invalid'
                    },
                    this.cssClasses
                )
            }
        },
        mounted(){

            // First up, create the schema, incorporating the specification for the
            // custom token node type
            const tokenSchema = buildSchema(buildSpec(this.tokensCollection))

            // Generate the input rule
            const rule = createInputRule(
                tokenSchema,
                this.tokensCollection,
                this.re,
                this.allowUndefinedTokens
            )

            // Create the initial state
            let startDoc = Node.fromJSON(
                tokenSchema,
                this.value ? this.parser.run(this.value) : this.parser.empty()
            )

            // Define the plugins dynamically
            let plugins = [inputRules({rules: [rule]})]
            if(this.showMenu && !this.tokensCollection.isEmpty()){
                plugins.push(createMenu(this.tokensCollection, tokenSchema, this.insertLabel))
            }
            if(this.type === 'textarea'){
                plugins.push(keymap(baseKeymap))
            }
            if(this.showAutocomplete){
                plugins.push(...createAutocomplete(
                    tokenSchema,
                    this.$refs.suggestion,
                    this.tokensCollection,
                    this.tokenPrefix
                ))
            }

            this.$nextTick(() => {
                this.view = new EditorView(this.$refs.editor, {
                    state: EditorState.create({
                        doc: startDoc,
                        plugins: plugins
                    }),
                    editable: this.isEnabled
                })
            })
        },
        computed:{
            /**
             * This generates the underlying value
             * @returns {string}
             */
            raw(){
                if(!this.view){
                    return ''
                }
                return this.writer.run(this.view.state.doc)
            },
            invalidTokens(){
                return [...this.raw.matchAll(this.re)]
                    .map(token => new RegExp('[a-zA-Z0-9]+', 'g').exec(token)[0])
                    .filter(name => !this.tokensCollection.has(name))
                    .filter((v, i, a) => a.indexOf(v) === i)
            },
            containsInvalidTokens(){
                return this.invalidTokens.length > 0
            }
        },
        watch:{
            raw(){
                this.$emit('input', this.raw)
            }
        },
        methods:{
            isEnabled(){
                return !this.disabled
            }
        }
    }
</script>

<style scoped>

</style>