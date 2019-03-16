export const DefaultVS = [
    "precision mediump float;",
    "",
    "attribute vec3 position;",
    "attribute vec4 color;",
    "varying vec4 fragColor;",
    "",
    "void main()",
    "{",
    "   fragColor = color;",
    "   gl_Position = vec4(position, 1.0);",
    "}"
].join("\n");
