<template>
    <section class="example">

        <header>
            <h3>Disabling the Widget</h3>
            <p>Setting the <code>disabled</code> prop to <code>true</code> prevents editing.</p>
            <p>Note that the CSS class <code>tokenized-input--disabled</code> gets added to the containing class.</p>
        </header>

        <div style="padding-bottom:0.5rem;">
            <div class="toggle-switch">
                <input type="checkbox" id="disabled-example-disabled" v-model="disabled" /><label for="disabled-example-disabled">Toggle</label>
            </div>
        </div>

        <tokenized-input
                v-model="text"
                :tokens="tokens"
                :show-menu="false"
                :show-autocomplete="true"
                :show-available-tokens="false"
                :show-invalid-tokens="true"
                :disabled="disabled"
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
                disabled: true
                // Refer to ExampleBase for the tokens definition
            }
        }
    }
</script>

<style scoped>

</style>