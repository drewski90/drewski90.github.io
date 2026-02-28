export function initHoloShader(canvas){

  const gl = canvas.getContext('webgl2')
  if(!gl) return

  function resize(){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    gl.viewport(0,0,canvas.width,canvas.height)
  }
  resize()
  window.addEventListener('resize', resize)

  gl.enable(gl.BLEND)
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE)

  // ---------- vertex ----------
  const vs = `#version 300 es
  precision highp float;

  in vec3 position;

  uniform float u_time;
  uniform float u_zoom;

  out float v_alpha;

  void main(){

    float c = cos(u_time*0.10);
    float s = sin(u_time*0.10);

    vec3 p;
    p.x = position.x*c - position.z*s;
    p.z = position.x*s + position.z*c;
    p.y = position.y;

    float depth = (p.z + 5.0);

    vec2 projected = (p.xy * u_zoom) / depth;
    gl_Position = vec4(projected,0.0,1.0);

    gl_PointSize = 3.0;   // constant size

    v_alpha = 1.0 / depth;
  }`

  // ---------- fragment ----------
  const fs = `#version 300 es
precision highp float;

uniform float u_time;

in float v_alpha;
out vec4 outColor;

void main(){

  vec2 c = gl_PointCoord - vec2(0.5);
  float d = length(c);

  if(d > 0.5) discard;

  // deep blue → purple-blue range
  vec3 blue   = vec3(0.10, 0.35, 1.00);
  vec3 purple = vec3(0.35, 0.20, 1.00);

  float t = sin(u_time * 0.25) * 0.5 + 0.5;
  vec3 color = mix(blue, purple, t);

  outColor = vec4(color, v_alpha);
}
`

  function compile(type, src){
    const s = gl.createShader(type)
    gl.shaderSource(s, src)
    gl.compileShader(s)
    if(!gl.getShaderParameter(s, gl.COMPILE_STATUS))
      console.error(gl.getShaderInfoLog(s))
    return s
  }

  const program = gl.createProgram()
  gl.attachShader(program, compile(gl.VERTEX_SHADER, vs))
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fs))
  gl.linkProgram(program)
  gl.useProgram(program)

  // ---------- spherical particle distribution ----------
  const COUNT = 2000
  const data = new Float32Array(COUNT*3)

  for(let i=0;i<COUNT;i++){
    const r = Math.pow(Math.random(), 0.35) * 4.0
    const theta = Math.random()*Math.PI*2
    const phi = Math.acos(Math.random()*2-1)

    data[i*3]   = r*Math.sin(phi)*Math.cos(theta)
    data[i*3+1] = r*Math.sin(phi)*Math.sin(theta)
    data[i*3+2] = r*Math.cos(phi)
  }

  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)

  const loc = gl.getAttribLocation(program,'position')
  gl.enableVertexAttribArray(loc)
  gl.vertexAttribPointer(loc,3,gl.FLOAT,false,0,0)

  const timeLoc  = gl.getUniformLocation(program,'u_time')
  const zoomLoc  = gl.getUniformLocation(program,'u_zoom')

  let t = 0

  function render(){

    t += 0.01

    gl.clearColor(0.0,0.0,0.03,1)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.uniform1f(timeLoc, t)
    gl.uniform1f(zoomLoc, 2.2)

    gl.drawArrays(gl.POINTS, 0, COUNT)

    requestAnimationFrame(render)
  }

  render()
}
