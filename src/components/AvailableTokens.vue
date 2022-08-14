<template>
    <div class="tokenized-input__available_tokens">
        <span v-if="showLabel">{{label}}</span>
        <ul>
            <li v-for="token in tokens.tokens" :key="token.name">
                <span>{{token.name}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "AvailableTokens",
        props:{
            /**
             * The available tokens. Note that this must be an instance of the TokenCollection class.
             */
            tokens:{
                type: Object,
                required: true
            },
            /**
             * Whether to show the label
             */
            showLabel:{
                type: Boolean,
                default: true
            },
            /**
             * The text content of the label.
             */
            label:{
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>