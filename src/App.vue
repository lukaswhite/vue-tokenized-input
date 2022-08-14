<template>
  <div id="app">
    <header class="demo-page-header">
      <img alt="Vue logo" class="logo" src="./assets/logo.png" />
      <h2>Vue Tokenized Input</h2>
    </header>
    <!--
    <tokenized-input
            v-model="text"
            :tokens="tokens"
            type="textarea"
            :show-menu="false"
            :show-autocomplete="true"
            :show-available-tokens="false"
            :show-invalid-tokens="true"
    ></tokenized-input>

    <section>
      <span>Raw value:</span><br/>
      <code class="raw" v-if="text && text.length">{{text}}</code>
      <span v-else><em>Empty</em></span>
    </section>-->

    <basic-example></basic-example>

    <div class="divider"><div></div></div>

    <minimal-example></minimal-example>

    <div class="divider"><div></div></div>

    <textarea-example></textarea-example>

    <div class="divider"><div></div></div>

    <menu-example></menu-example>

    <div class="divider"><div></div></div>

    <display-errors-example></display-errors-example>

    <div class="divider"><div></div></div>

    <disallow-invalid-tokens-example></disallow-invalid-tokens-example>

    <div class="divider"><div></div></div>

    <available-tokens-example></available-tokens-example>

    <div class="divider"><div></div></div>

    <custom-token-format-example></custom-token-format-example>

    <div class="divider"><div></div></div>

    <disabled-example></disabled-example>

    <div class="divider"><div></div></div>

    <slots-example></slots-example>

    <div class="divider"><div></div></div>

    <i18n-example></i18n-example>

  </div>
</template>

<script>
  //import TokenizedInput from './components/TokenizedInput'
  import BasicExample from "./components/demo/BasicExample";
  import MinimalExample from "./components/demo/MinimalExample"
  import TextareaExample from "./components/demo/TextareaExample";
  import MenuExample from "./components/demo/MenuExample";
  import DisplayErrorsExample from "./components/demo/DisplayErrorsExample";
  import DisallowInvalidTokensExample from "./components/demo/DisallowInvalidTokensExample";
  import AvailableTokensExample from "./components/demo/AvailableTokensExample";
  import CustomTokenFormatExample from "./components/demo/CustomTokenFormatExample";
  import DisabledExample from "./components/demo/DisabledExample";
  import SlotsExample from "./components/demo/SlotsExample";
  import I18nExample from "./components/demo/I18nExample";
  import './scss/demo.scss'

  export default {
    name: 'App',
    components:{
      BasicExample,
      MinimalExample,
      TextareaExample,
      MenuExample,
      DisplayErrorsExample,
      DisallowInvalidTokensExample,
      AvailableTokensExample,
      CustomTokenFormatExample,
      DisabledExample,
      SlotsExample,
      I18nExample
    },
      data(){
          return {
              // text: 'Dear [[FORENAME]] [[SURNAME]], \nYour order [[ORDER]] is ready to collect',
            text: null,
            // tokensX:[],
            tokens:[
              {
                name: 'forename',
                label: 'First Name',
                example: 'Joe'
              },
              {
                name: 'surname',
                label: 'Last Name',
                example: 'Bloggs'
              },
              {
                name: 'order',
                label: 'Order Number',
                example: 'ABC123'
              },
              {name:"other",example:'something else'}
            ]
          }
      }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 3rem;
    padding-left: 1rem;
  }
  .demo-page-header {
    display: flex;
    margin-bottom: 1rem;
  }

  .example header h3 {
    border-left: solid 5px #ddd;
    padding-left: 10px;
  }
  .example header code {
    border: solid 1px #ddd;
    font-size: 0.8rem;
    padding: 0.1rem;
    background: #f7f7f7;
    border-radius: 0.25rem;
  }
  .logo {
    width: 80px;
  }
  .raw {
    margin-top: 1rem;
    padding: 10px 2px 5px 12px;
    border-left: solid 3px #eee;
  }
  .display-errors-example .tokenized-input--has-invalid-tokens .tokenized-input__editor {
    border-color: #f44336;
  }

</style>
