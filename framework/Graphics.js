import ViewportDesc from "./ViewportDesc.js";
import Color from "./Color.js";
/**
 * WebGL의 버퍼 생성부터 셰이더, 렌더링까지의 절차를 간편화 하기위한 클래스.
 */
export default class Graphics {
    constructor(canvas) {
        // 브라우저가 WebGL을 지원하는지 확인.
        this.context = canvas.getContext("webgl");
        if (!this.context) {
            console.warn("WebGl not supported, falling back on experimental-webgl");
            this.context = canvas.getContext("experimental-webgl");
        }
        if (!this.context) {
            console.error("Experimental-webgl not supported. Can't proceed");
            alert("브라우저가 WebGL을 지원하지 않습니다.");
        }
        this.program = this.context.createProgram();
        // canvas 정보에 맞게 뷰포트를 생성.
        this.viewportDesc = new ViewportDesc(Number(canvas.style.left.replace(/[^0-9]/g, "")), Number(canvas.style.top.replace(/[^0-9]/g, "")), canvas.width, canvas.height);
        // 뷰포트와 클리어 지우기 색 설정.
        this.SetViewport(this.viewportDesc);
        this.SetClearColor(new Color(0, 0, 0, 1));
    }
    /**
     * 뷰포트 설정.
     * @param desc 뷰포트 명세.
     */
    SetViewport(desc) {
        this.context.viewport(desc.left, desc.top, desc.width, desc.height);
    }
    /**
     * 지우기 색 설정.
     * @param color 지우기 색.
     */
    SetClearColor(color) {
        this.context.clearColor(color.r, color.g, color.b, color.a);
    }
    /**
     * WebGLProgram을 만들고 설정.
     * @param vertexShaderString string 타입의 vertex 셰이더 파일.
     * @param fragmentShaderString string 타입의 fragment 셰이더 파일.
     */
    SetProgram(vertexShaderString, fragmentShaderString) {
        const context = this.context;
        const program = this.program;
        // vertex 셰이더 컴파일.
        const vertexShader = context.createShader(WebGLRenderingContext.VERTEX_SHADER);
        context.shaderSource(vertexShader, vertexShaderString);
        context.compileShader(vertexShader);
        if (!context.getShaderParameter(vertexShader, WebGLRenderingContext.COMPILE_STATUS)) {
            console.error("ERROR compiling vertex shader!", context.getShaderInfoLog(vertexShader));
        }
        // fragment 셰이더 컴파일.
        const fragmentShader = context.createShader(WebGLRenderingContext.FRAGMENT_SHADER);
        context.shaderSource(fragmentShader, fragmentShaderString);
        context.compileShader(fragmentShader);
        if (!context.getShaderParameter(fragmentShader, WebGLRenderingContext.COMPILE_STATUS)) {
            console.error("ERROR compiling fragment shader!", context.getShaderInfoLog(fragmentShader));
        }
        // vertex 셰이더와 fragment 셰이더 적용.
        context.attachShader(program, vertexShader);
        context.attachShader(program, fragmentShader);
        // program 링크.
        context.linkProgram(program);
        if (!context.getProgramParameter(program, WebGLRenderingContext.LINK_STATUS)) {
            console.error("ERROR linking program!", context.getProgramInfoLog(program));
            return;
        }
        // program 유효성 검사.
        context.validateProgram(program);
        if (!context.getProgramParameter(program, WebGLRenderingContext.VALIDATE_STATUS)) {
            console.error("ERROR validating program!", context.getProgramInfoLog(program));
            return;
        }
    }
    /**
     * vertex 버퍼 설정.
     * @param vertices vertex 배열.
     * @param usage vertex 용법.
     */
    SetVertexBuffer(vertices, usage) {
        const context = this.context;
        const buffer = context.createBuffer();
        context.bindBuffer(WebGLRenderingContext.ARRAY_BUFFER, buffer);
        context.bufferData(WebGLRenderingContext.ARRAY_BUFFER, vertices.GetDataSource(), usage);
    }
    /**
     * 셰이더 파일의 속성값 설정.
     * @param name 셰이더 파일의 속성명.
     * @param size 속성의 크기.
     * @param type 속성의 타입.
     * @param normalized 정규화 되었는지.
     * @param stride 다음 데이터 시작점까지의 바이트 크기.
     * @param offset 데이터를 읽는 시작점 오프셋(바이트 크기).
     */
    SetVertexAttribute(name, size, type, normalized, stride, offset) {
        const attribLocation = this.context.getAttribLocation(this.program, name);
        this.context.vertexAttribPointer(attribLocation, size, type, normalized, stride, offset);
        this.context.enableVertexAttribArray(attribLocation);
    }
    /**
     * 설정된 vertex 버퍼를 가지고 canvas에 그림.
     * @param mode 그리기 모드.
     * @param start 그릴 vertex 버퍼 배열의 시작점.
     * @param count 그릴 vertex 개수.
     */
    Draw(mode, start, count) {
        this.context.useProgram(this.program);
        this.context.drawArrays(mode, start, count);
    }
}
