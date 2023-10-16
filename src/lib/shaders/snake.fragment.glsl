uniform float time;

void main() {
  float frequency = 0.5;
  float amplitude = 0.3;

  float red = 2.3 + 1.5 * sin(time * frequency - gl_FragCoord.x * 0.01);
  float green = 2.3 + 1.5 * cos(time * frequency + gl_FragCoord.y * 0.01);
  float blue = 2.3 + 1.5 * sin(time * frequency - gl_FragCoord.x * 0.01 +
                               gl_FragCoord.y * 0.01);

  vec3 color = vec3(red, green, blue) * amplitude;

  gl_FragColor = vec4(color, 1.0);
}
