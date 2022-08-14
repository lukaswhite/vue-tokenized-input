<template>
    <section class="example">

        <header>
            <h3>Show the Available Tokens</h3>
            <p>Set the <code>show-available-tokens</code> prop to <code>to show the available tokens.</code></p>
        </header>

        <tokenized-input
                v-model="text"
                :tokens="tokens"
                :show-menu="false"
                :show-preview="false"
                :show-autocomplete="true"
                :show-available-tokens="true"
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
        name: "AvailableTokensExample",
        extends: ExampleBase,
        data(){
            return {
                text: 'Dear [[FORENAME]] [[SURNAME]], Your order [[ORDER]] is ready to collect',
                // Refer to ExampleBase for the tokens definition
            }
        }
    }
</script>

<style scoped>

</style>