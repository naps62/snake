uniform float time;

void main() {
  float frequency = 3.0;
  float amplitude = 0.2;

  float red = 1.5 + 0.5 * cos(-time * frequency + gl_FragCoord.x * 0.01);
  float green = 1.5 + 0.5 * sin(time * frequency - gl_FragCoord.y * 0.01);
  float blue = 1.5 + 0.5 * cos(-time * frequency + gl_FragCoord.x * 0.01 +
                               gl_FragCoord.y * 0.01);

  vec3 color = vec3(red, green, blue) * amplitude;

  gl_FragColor = vec4(color, 0.5);
}
