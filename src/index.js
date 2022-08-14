import TokenizedInput from "./components/TokenizedInput";
import './scss/styles.scss'

const TokenizedInputPlugin = {
    install (Vue) {
        Vue.component('tokenized-input', TokenizedInput)
    }
}
// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(TokenizedInputPlugin)
}

export default TokenizedInputPlugin