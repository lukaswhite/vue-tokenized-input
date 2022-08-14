<template>
    <section class="example">

        <header>
            <h3>I18n</h3>
            <p>You can provide translated strings for the menu label and available tokens label using the <code>insert-label</code> and <code>available-tokens-label</code> props respectively.</p>
        </header>

        <tokenized-input
                v-model="text"
                :tokens="tokens"
                :show-menu="true"
                :show-preview="false"
                :show-autocomplete="true"
                :show-available-tokens="true"
                :show-invalid-tokens="true"
                available-tokens-label="Jetons disponibles"
                insert-label="Insérer"
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
        name: "I18nExample",
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