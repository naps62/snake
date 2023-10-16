uniform float time;

void main() {
  float frequency = 0.8;
  float amplitude = 0.8;

  float red = 3.3 + 1.5 * cos(-time * frequency + gl_FragCoord.y * 0.01);
  float green = 0.3 + 0.4 * sin(-time * frequency - gl_FragCoord.x * 0.01);
  float blue = 0.3 + 0.4 * sin(time * frequency + gl_FragCoord.x * 0.01 +
                               gl_FragCoord.y * 0.01);

  // Combine the color components
  vec3 color = vec3(red, green, blue) * amplitude;

  gl_FragColor = vec4(color, 0.5);
}
