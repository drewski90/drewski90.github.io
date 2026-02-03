export function initHoloShader(canvas, {
  dprCap = 2
} = {}) {
  const gl = canvas.getContext("webgl", { alpha: true });
  if (!gl) return;

  function resize() {
    const dpr = Math.min(dprCap, window.devicePixelRatio || 1);
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  window.addEventListener("resize", resize);
  resize();

  // ---------- Shader sources ----------

  const vert = `
    attribute vec2 pos;
    void main() {
      gl_Position = vec4(pos, 0.0, 1.0);
    }
  `;

  const frag = `
    precision highp float;
    uniform vec2 u_res;
    uniform float u_time;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      float a = hash(i);
      float b = hash(i + vec2(1,0));
      float c = hash(i + vec2(0,1));
      float d = hash(i + vec2(1,1));
      vec2 u = f*f*(3.0-2.0*f);
      return mix(a, b, u.x) +
             (c - a)*u.y*(1.0-u.x) +
             (d - b)*u.x*u.y;
    }

    vec3 hsl2rgb(vec3 hsl) {
      vec3 rgb = clamp(
        abs(mod(hsl.x*6.0 + vec3(0,4,2), 6.0) - 3.0) - 1.0,
        0.0,
        1.0
      );
      return hsl.z + hsl.y * (rgb - 0.5) * (1.0 - abs(2.0*hsl.z - 1.0));
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / u_res;
      float t = u_time * 0.01;

      float n1 = noise(uv * 4.5 + vec2(0.0, t));
      float n2 = noise(uv * 5.0 - vec2(0.0, t*0.7));
      float n = mix(n1, n2, 0.3);

      float hue = 0.65;
      float light = 0.01 + n * 0.40;

      vec3 color = hsl2rgb(vec3(hue, .8, light));

      float gloss = smoothstep(0.0, 1.0, uv.y);
      color += gloss * 0.01;

      gl_FragColor = vec4(color, 1.0);
    }
  `;

  // ---------- Compile ----------

  function compile(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  }

  const program = gl.createProgram();
  gl.attachShader(program, compile(gl.VERTEX_SHADER, vert));
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, frag));
  gl.linkProgram(program);
  gl.useProgram(program);

  // Fullscreen quad
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1,-1,  1,-1,
    -1, 1,  1, 1
  ]), gl.STATIC_DRAW);

  const posLoc = gl.getAttribLocation(program, "pos");
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

  const resLoc = gl.getUniformLocation(program, "u_res");
  const timeLoc = gl.getUniformLocation(program, "u_time");

  // ---------- Render loop ----------

  let t = 0;
  let raf;

  function draw() {
    gl.uniform2f(resLoc, canvas.width, canvas.height);
    gl.uniform1f(timeLoc, t);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    t += 1;
    raf = requestAnimationFrame(draw);
  }

  draw();

  // Return cleanup handle (pro)
  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  };
}
