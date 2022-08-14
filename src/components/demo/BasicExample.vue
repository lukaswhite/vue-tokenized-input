<template>
    <section class="example">

        <header>
            <h3>Basic Example</h3>
            <p>Try typing <code>[[</code> to trigger the autocomplete, then use the <code>TAB</code> key to add the selected token. Alternatively, click an option.</p>
        </header>

        <tokenized-input
                v-model="text"
                :tokens="tokens"
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
        name: "BasicExample",
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