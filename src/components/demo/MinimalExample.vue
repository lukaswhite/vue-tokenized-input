<template>
    <section class="example">

        <header>
            <h3>Minimal Example</h3>
            <p>Here, the <code>show-autocomplete</code> prop is set to <code>false</code> to disable the autocomplete, <code>show-preview</code> prop is set to <code>false</code> to hide the preview.</p>
        </header>

        <tokenized-input
                v-model="text"
                :tokens="tokens"
                :show-menu="false"
                :show-autocomplete="false"
                :show-available-tokens="false"
                :show-invalid-tokens="false"
                :show-preview="false"
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
        name: "MinimalExample",
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