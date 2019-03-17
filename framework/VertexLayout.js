import { Vector3 } from "./Vector.js";
import Color from "./Color.js";
const FLOAT_SIZE = Float32Array.BYTES_PER_ELEMENT;
/**
 * 색상 정보를 포함한 정점.
 */
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
// 벡터 요소 개수.
ColorVertex.VECTOR_ELEM_COUNT = 3;
// 색상 요소 개수.
ColorVertex.COLOR_ELEM_COUNT = 4;
// 정점 요소 개수.
ColorVertex.ELEM_COUNT = ColorVertex.VECTOR_ELEM_COUNT + ColorVertex.COLOR_ELEM_COUNT;
// 정점 요소 크기.
ColorVertex.ELEM_SIZE = FLOAT_SIZE;
