import Graphics from "../framework/Graphics.js";
import { DefaultVS } from "../assets/shader/VS/DefaultVS.js";
import { DefaultFS } from "../assets/shader/FS/DefaultFS.js";
import { ColorVertex } from "../framework/VertexLayout.js";
import Color from "../framework/Color.js";
import { Vector3 } from "../framework/Vector.js";
import { VertexArray } from "../framework/Vertex.js";
let graphics;
function start() {
    const canvas = document.getElementById("gl_canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    graphics = new Graphics(canvas);
    if (!graphics.context) {
        return;
    }
    graphics.SetProgram(DefaultVS, DefaultFS);
    var triangleVertices = new VertexArray([
        new ColorVertex(new Vector3(0.0, 0.5, 0.0), new Color(1.0, 0.0, 0.0, 1.0)),
        new ColorVertex(new Vector3(-0.5, -0.5, 0.0), new Color(0.0, 1.0, 0.0, 1.0)),
        new ColorVertex(new Vector3(0.5, -0.5, 0.0), new Color(0.0, 0.0, 1.0, 1.0))
    ]);
    graphics.SetVertexBuffer(triangleVertices, WebGLRenderingContext.STATIC_DRAW);
    graphics.SetVertexAttribute("position", ColorVertex.VECTOR_ELEM_COUNT, WebGLRenderingContext.FLOAT, false, ColorVertex.ELEM_COUNT * ColorVertex.ELEM_SIZE, 0);
    graphics.SetVertexAttribute("color", ColorVertex.COLOR_ELEM_COUNT, WebGLRenderingContext.FLOAT, false, ColorVertex.ELEM_COUNT * ColorVertex.ELEM_SIZE, ColorVertex.VECTOR_ELEM_COUNT * ColorVertex.ELEM_SIZE);
    graphics.Draw();
}
window.onload = start;
//# sourceMappingURL=app.js.map