<template>
    <section class="example">

        <header>
            <h3>Don't Allow Invalid Tokens</h3>
            <p>If you set the <code>allow-undefined-tokens</code> prop to <code>false</code>, users are prevented from entering tokens that have not been predefined. Try entering the token <code>[[TITLE]]</code> to see it in action.</p>
        </header>

        <tokenized-input
                v-model="text"
                :tokens="tokens"
                type="textarea"
                :show-menu="false"
                :show-autocomplete="true"
                :show-available-tokens="false"
                :allow-undefined-tokens="false"
        ></tokenized-input>

        <section class="raw">
            <span>Raw value:</span><br/>
            <code v-if="text && text.length">{{text}}</code>
            <span v-else><em>Empty</em></span>
        </section>
    </section>
</template>

<script>

    import ExampleBase from "./ExampleBase";

    export default {
        name: "DisallowInvalidTokensExample",
        extends: ExampleBase,
        data(){
            return {
                text: 'Dear [[FORENAME]] [[SURNAME]], \nYour order [[ORDER]] is ready to collect',
                // Refer to ExampleBase for the tokens definition
            }
        }
    }
</script>

<style scoped>

</style>