import ViewportDesc from "./ViewportDesc.js";
import Color from "./Color.js";
export default class Graphics {
    constructor(canvas) {
        // check browser supports webgl
        this.context = canvas.getContext("webgl");
        if (!this.context) {
            console.warn("WebGl not supported, falling back on experimental-webgl");
            this.context = canvas.getContext("experimental-webgl");
        }
        if (!this.context) {
            console.error("Experimental-webgl not supported. Can't proceed");
            alert("Your browser does not support WebGL");
        }
        this.program = this.context.createProgram();
        // set default viewport
        this.viewportDesc = new ViewportDesc(Number(canvas.style.left.replace(/[^0-9]/g, "")), Number(canvas.style.top.replace(/[^0-9]/g, "")), canvas.width, canvas.height);
        this.SetViewport(this.viewportDesc);
        this.SetClearColor(new Color(0, 0, 0, 1));
    }
    SetViewport(desc) {
        this.context.viewport(desc.left, desc.top, desc.width, desc.height);
    }
    SetClearColor(color) {
        this.context.clearColor(color.r, color.g, color.b, color.a);
    }
    SetProgram(vertexShaderString, fragmentShaderString) {
        const context = this.context;
        const program = this.program;
        const vertexShader = context.createShader(WebGLRenderingContext.VERTEX_SHADER);
        context.shaderSource(vertexShader, vertexShaderString);
        context.compileShader(vertexShader);
        if (!context.getShaderParameter(vertexShader, WebGLRenderingContext.COMPILE_STATUS)) {
            console.error("ERROR compiling vertex shader!", context.getShaderInfoLog(vertexShader));
        }
        const fragmentShader = context.createShader(WebGLRenderingContext.FRAGMENT_SHADER);
        context.shaderSource(fragmentShader, fragmentShaderString);
        context.compileShader(fragmentShader);
        if (!context.getShaderParameter(fragmentShader, WebGLRenderingContext.COMPILE_STATUS)) {
            console.error("ERROR compiling fragment shader!", context.getShaderInfoLog(fragmentShader));
        }
        context.attachShader(program, vertexShader);
        context.attachShader(program, fragmentShader);
        context.linkProgram(program);
        if (!context.getProgramParameter(program, WebGLRenderingContext.LINK_STATUS)) {
            console.error("ERROR linking program!", context.getProgramInfoLog(program));
            return;
        }
        context.validateProgram(program);
        if (!context.getProgramParameter(program, WebGLRenderingContext.VALIDATE_STATUS)) {
            console.error("ERROR validating program!", context.getProgramInfoLog(program));
            return;
        }
    }
    SetVertexBuffer(vertex, usage) {
        const context = this.context;
        const buffer = context.createBuffer();
        context.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, buffer);
        context.bufferData(WebGLRenderingContext.ARRAY_BUFFER, vertex.GetDataSource(), usage);
    }
    SetVertexAttribute(name, size, type, normalized, stride, offset) {
        const attribLocation = this.context.getAttribLocation(this.program, name);
        this.context.vertexAttribPointer(attribLocation, size, type, normalized, stride, offset);
        this.context.enableVertexAttribArray(attribLocation);
    }
    Draw() {
        this.context.useProgram(this.program);
        this.context.drawArrays(this.context.TRIANGLES, 0, 3);
    }
}
//# sourceMappingURL=Graphics.js.map