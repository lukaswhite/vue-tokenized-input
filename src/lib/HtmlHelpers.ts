export default class {
    /**
     * This function is same as PHP's nl2br() with default parameters.
     *
     * @param {string} str Input text
     * @param {boolean} replaceMode Use replace instead of insert
     * @param {boolean} isXhtml Use XHTML
     * @return {string} Filtered text
     */
    static nl2br(str: string, replaceMode: boolean = false, isXhtml: boolean = false) {

        const breakTag = (isXhtml) ? '<br />' : '<br>';
        const replaceStr = (replaceMode) ? '$1'+ breakTag : '$1'+ breakTag +'$2';
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, replaceStr);
    }
}