import {schema} from "prosemirror-schema-basic";
import {Schema} from "prosemirror-model"

export default function(spec: Object) {
    return new Schema({
        nodes: schema.spec.nodes.addBefore("image", "token", spec),
        marks: schema.spec.marks
    })
}