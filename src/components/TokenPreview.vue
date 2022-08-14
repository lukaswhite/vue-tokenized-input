<template>
    <div class="tokenized-input__preview" v-html="html"></div>
</template>

<script>

    import HtmlHelpers from "../lib/HtmlHelpers";

    export default {
        name: "TokenPreview",
        props:{
            /**
             * The underlying value
             */
            value:{
                type:String
            },
            /**
             * The available tokens; it uses this to extract the example text.
             */
            tokens:{
                type:Object,
                required:true
            },
            /**
             * The regular expression used to parse the content.
             */
            re:{
                type:RegExp,
                required:true
            }
        },
        computed:{
            html(){
                if(!this.value){
                    return ''
                }
                return HtmlHelpers.nl2br(this.value.replace(this.re, (match) =>  {
                    const name = new RegExp('[a-zA-Z0-9]+', 'g').exec(match)[0]
                    let token = this.tokens.get(name) ?? {name: name, label: name, example: name}
                    return '<span class="token">' + token.example + '</span>'
                }))
            }
        }
    }
</script>

<style scoped>

</style>