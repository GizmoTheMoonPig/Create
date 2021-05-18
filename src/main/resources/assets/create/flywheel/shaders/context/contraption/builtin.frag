#flwinclude <"create:context/world/fog.glsl">
#flwinclude <"create:core/lightutil.glsl">

varying vec3 BoxCoord;
uniform sampler3D uLightVolume;

uniform sampler2D uBlockAtlas;
uniform sampler2D uLightMap;

vec4 FLWBlockTexture(vec2 texCoords) {
    return texture2D(uBlockAtlas, texCoords);
}

void FLWFinalizeColor(vec4 color) {
    #if defined(USE_FOG)
    float a = color.a;
    float fog = clamp(FLWFogFactor(), 0., 1.);

    color = mix(uFogColor, color, fog);
    color.a = a;
    #endif

    gl_FragColor = color;
}

vec4 FLWLight(vec2 lightCoords) {
    lightCoords = max(lightCoords, texture3D(uLightVolume, BoxCoord).rg);

    return texture2D(uLightMap, shiftLight(lightCoords));
}