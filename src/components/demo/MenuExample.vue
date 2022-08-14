<template>
    <section class="example">

        <header>
            <h3>Menu</h3>
            <p>Set the <code>show-menu</code> prop to <code>true</code> to display an Insert menu. In this example, the autocomplete is hidden by setting <code>show-autocomplete</code> to <code>false</code>.</p>
        </header>

        <tokenized-input
                v-model="text"
                :tokens="tokens"
                type="textarea"
                :show-menu="true"
                :show-autocomplete="false"
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