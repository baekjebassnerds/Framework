import { Vector3 } from "./Vector.js";
import Color from "./Color.js";
const FLOAT_SIZE = Float32Array.BYTES_PER_ELEMENT;
export class ColorVertex {
    constructor(vector = new Vector3(), color = new Color()) {
        this.x = vector.x;
        this.y = vector.y;
        this.z = vector.z;
        this.r = color.r;
        this.g = color.g;
        this.b = color.b;
        this.a = color.a;
    }
    ToFloat32Array() {
        return new Float32Array([
            this.x, this.y, this.z,
            this.r, this.g, this.b, this.a
        ]);
    }
    GetElemCount() {
        return ColorVertex.ELEM_COUNT;
    }
    GetElemSize() {
        return ColorVertex.ELEM_SIZE;
    }
}
ColorVertex.VECTOR_ELEM_COUNT = 3;
ColorVertex.COLOR_ELEM_COUNT = 4;
ColorVertex.ELEM_COUNT = ColorVertex.VECTOR_ELEM_COUNT + ColorVertex.COLOR_ELEM_COUNT;
ColorVertex.ELEM_SIZE = FLOAT_SIZE;
//# sourceMappingURL=VertexLayout.js.map