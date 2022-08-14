<template>
    <section class="example">

        <header>
            <h3>Custom Token Delimiters</h3>
            <p>You can change the format of the tokens using the <code>token-prefix</code> and <code>token-suffix</code> props.</p>
        </header>

        <tokenized-input
                v-model="text"
                :tokens="tokens"
                token-prefix="{{"
                token-suffix="}}"
                :show-menu="false"
                :show-autocomplete="true"
                :show-available-tokens="false"
                :show-invalid-tokens="true"
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
        name: "CustomTokenFormatExample",
        extends: ExampleBase,
        data(){
            return {
                text: 'Dear {{FORENAME}} {{SURNAME}}, Your order {{ORDER}} is ready to collect',
                // Refer to ExampleBase for the tokens definition
            }
        }
    }
</script>

<style scoped>

</style>