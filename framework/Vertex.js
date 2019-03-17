export class VertexArray {
    constructor(vertices) {
        this.vertices = vertices;
        this.dataSize = vertices[0].GetElemCount()
            * vertices[0].GetElemSize()
            * vertices.length;
    }
    /**
     * 정점 배열을 Float32Array형으로 반환.
     */
    GetDataSource() {
        let dataSrc = new Float32Array(this.dataSize);
        let i = 0;
        for (const vertex of this.vertices) {
            for (const elem of vertex.ToFloat32Array()) {
                dataSrc[i++] = elem;
            }
        }
        return dataSrc;
    }
}
