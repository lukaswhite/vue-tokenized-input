<template>
    <section class="example display-errors-example">

        <header>
            <h3>Highlighting Invalid Tokens</h3>
            <p>Set the <code>show-invalid-tokens</code> prop to <code>true</code> to highlight tokens that have not been predefined.</p>
            <p>You'll also note that the CSS class <code>tokenized-input--has-invalid-tokens</code> is added to the component for any additional styling you may wish to add.</p>
            <p>There is also a slot named <code>invalid-message</code> that allows you to add an error message. It doesn't have any default content, so be sure to add some &mdash; and set the <code>show-invalid-message</code> to <code>true</code> to enable it. The <code>invalid</code> prop provides an array of the invalid tokens.</p>
        </header>

        <tokenized-input
                ref="input"
                v-model="text"
                :tokens="tokens"
                type="textarea"
                :show-menu="false"
                :show-autocomplete="true"
                :show-available-tokens="false"
                :show-invalid-tokens="true"
                :show-invalid-message="true"
        >
            <template v-slot:invalid-message="{invalid}">
                <div class="error">
                    Please remove the tokens highlighted in pink. ({{invalid.join(', ')}})
                </div>
            </template>
        </tokenized-input>

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
        name: "DisplayErrorsExample",
        extends: ExampleBase,
        data(){
            return {
                text: 'Dear [[TITLE]] [[FORENAME]] [[SURNAME]], \nYour order [[ORDER]] is ready to collect at [[TIME]].',
                // Refer to ExampleBase for the tokens definition
            }
        }
    }
</script>

<style scoped>
    .error {
        padding: 0.5rem;
        color: #f44336;
    }
</style>