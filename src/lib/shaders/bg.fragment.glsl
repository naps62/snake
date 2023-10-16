uniform float time;

void main() {
  float frequency = 1.5;
  float amplitude = 2.5;

  float red = 0.05 + 0.02 * sin(time * frequency - gl_FragCoord.x * 0.01);
  float green = 0.05 + 0.02 * cos(time * frequency + gl_FragCoord.y * 0.01);
  float blue = 0.05 + 0.02 * sin(time * frequency - gl_FragCoord.x * 0.01 +
                                 gl_FragCoord.y * 0.01);

  // Combine the color components
  vec3 color = vec3(red, green, blue) * amplitude;

  gl_FragColor = vec4(color, 1.0);
}
