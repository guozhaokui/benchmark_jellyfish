// JavaScript Document
function getShader(gl, id, isVS) {
    var str = shaders[id];
    if(!str)
        return;

    var shader;
    if (!isVS) {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else{
        shader = gl.createShader(gl.VERTEX_SHADER);
    } 
    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

function createProgram(fragmentShaderID, vertexShaderID) {
    var fragmentShader = getShader(gl, fragmentShaderID,false);
    var vertexShader = getShader(gl, vertexShaderID,true);

    var nProgram = gl.createProgram();
    var program = {nGpuProg:nProgram};
    gl.attachShader(nProgram, vertexShader);
    gl.attachShader(nProgram, fragmentShader);
    gl.linkProgram(nProgram);
    if (!gl.getProgramParameter(nProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    program.vertexPositionAttribute = gl.getAttribLocation(nProgram,   "aVertexPosition");
    gl.enableVertexAttribArray(nProgram.vertexPositionAttribute);
    program.vertexNormalAttribute = gl.getAttribLocation(nProgram,     "aVertexNormal");
    gl.enableVertexAttribArray(nProgram.vertexNormalAttribute);
    program.vertexColorAttribute = gl.getAttribLocation(nProgram,      "aVertexColor");
    gl.enableVertexAttribArray(nProgram.vertexColorAttribute);
    program.textureCoordAttribute = gl.getAttribLocation(nProgram,     "aTextureCoord");
    gl.enableVertexAttribArray(nProgram.textureCoordAttribute);

    program.skinWeightAttribute = gl.getAttribLocation(nProgram,     "aSkinWeight");
    gl.enableVertexAttribArray(nProgram.skinWeightAttribute);

    program.world = gl.getUniformLocation(nProgram,              "uWorld");
    program.worldView = gl.getUniformLocation(nProgram,          "uWorldView");
    program.worldViewProj = gl.getUniformLocation(nProgram,      "uWorldViewProj");
    program.viewInv = gl.getUniformLocation(nProgram,            "uView");
    program.viewInv = gl.getUniformLocation(nProgram,            "uViewInv");

    program.sampler = [];
    program.sampler[0] = gl.getUniformLocation(nProgram,           "uSampler0");
    program.sampler[1] = gl.getUniformLocation(nProgram,           "uSampler1");
    program.sampler[2] = gl.getUniformLocation(nProgram,           "uSampler2");

    program.joint0 = gl.getUniformLocation(nProgram,             "uJoint0");
    program.joint1 = gl.getUniformLocation(nProgram,             "uJoint1");
    program.joint2 = gl.getUniformLocation(nProgram,             "uJoint2");
    program.joint3 = gl.getUniformLocation(nProgram,             "uJoint3");
    program.joint0InvTranspose = gl.getUniformLocation(nProgram, "uJoint0InvTranspose");

    program.currentTime = gl.getUniformLocation(nProgram,          "uCurrentTime");
    program.currentJellyfishTime = gl.getUniformLocation(nProgram, "uCurrentJellyfishTime");

    return program;
}

var currentProgram;
var shaderProgram = {};
  
function initShaders() {
    shaderProgram["jellyfish"] = createProgram("jellyfish_fs", "jellyfish_vs");
    currentProgram = shaderProgram["jellyfish"];
    setShader("jellyfish");
    bindTexture('jellyfish', 0);
    bindTexture('luminescence', 2);
    bindTexture('caustics'+localParam.cycle32, 1);
}

function setShader(name){
  currentProgram = shaderProgram[name];
  gl.useProgram(currentProgram.nGpuProg);
}
