precision highp float;

uniform sampler2D uTexture;

varying vec2 vPUv;
varying vec2 vUv;

void main() {
    vec4 color = vec4(0.0);
    vec2 uv = vUv;
    vec2 puv = vPUv;

	// pixel color
    vec4 colA = texture2D(uTexture, puv);

    vec3 color1 = vec3(0.87, 0.88, 0.84); // #DEE0D6 in RGB

	// greyscale
    float grey = colA.r * 0.21 + colA.g * 0.71 + colA.b * 0.07;
    vec4 colB = vec4(grey, grey, grey, 1.0);

	// circle
    float border = 0.3;
    float radius = 0.5;
    float dist = radius - distance(uv, vec2(0.5));
    float t = smoothstep(0.0, border, dist);

	// final color
    color = vec4(mix(colA.rgb, color1, grey), 1.0);
    color.a = t;

    gl_FragColor = color;
}