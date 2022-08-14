<template>
    <section class="example display-errors-example">

        <header>
            <h3>Slots</h3>
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
            <template v-slot:above-editor>
                <p>Use the <code>above-editor</code> slot to add content here.</p>
            </template>
            <template v-slot:below-editor>
                <p>Use the <code>below-editor</code> slot to add content here.</p>
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
        name: "SlotsExample",
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