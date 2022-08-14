/**
 * Parses a tokenized string to JSON, in a format suitable for initializing the Prosemirror
 * editor.
 *
 * @todo There are better ways to do this; refactor.
 */
export default class {

    constructor(re) {
        this.re = re
    }

    empty(){
        return {
            type: 'doc',
            content: []
        }
    }

    run(str){

        let doc = {
            type: 'doc',
            content: []
        }

        if(!str.length){
            return doc
        }

        str.split("\n").map(line => {
            doc.content.push({
                type: 'paragraph',
                content: this.parseLine(line)
            })
        })

        return doc
    }

    parseLine(str)
    {
        // eslint-disable-next-line
        let r = str.replace(this.re, (t) => {
            let token = new RegExp('[(a-zA-Z0-9]+', 'g').exec(t)[0]
            return `|--|--|___TOKEN___:::${token}|--|--|`
        })
        let parts = r.split('|--|--|')
        return parts.map(str => {
            if(str.startsWith('___TOKEN___:::')){
                return {
                    type: 'token',
                    attrs: {
                        token: str.split(':::')[1]
                    }
                }
            }
            return {
                type: 'text',
                text: str
            }
        })
    }
}