<template>
    <section class="example">

        <header>
            <h3>Textarea</h3>
            <p>Set the <code>type</code> prop to <code>textarea</code>, and the input behaves like a textarea; i.e. it allows carriage returns.</p>
        </header>

        <tokenized-input
                v-model="text"
                :tokens="tokens"
                type="textarea"
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
        name: "TextareaExample",
        extends: ExampleBase,
        data(){
            return {
                text: 'Dear [[FORENAME]] [[SURNAME]], \n---\nYour order [[ORDER]] is ready to collect',
                // Refer to ExampleBase for the tokens definition
            }
        }
    }
</script>

<style scoped>

</style>