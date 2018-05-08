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

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gProg.vertexPositionAttribute = gl.getAttribLocation(program,   "aVertexPosition");
    gl.enableVertexAttribArray(gProg.vertexPositionAttribute);
    gProg.vertexNormalAttribute = gl.getAttribLocation(program,     "aVertexNormal");
    gl.enableVertexAttribArray(gProg.vertexNormalAttribute);
    gProg.vertexColorAttribute = gl.getAttribLocation(program,      "aVertexColor");
    gl.enableVertexAttribArray(gProg.vertexColorAttribute);
    gProg.textureCoordAttribute = gl.getAttribLocation(program,     "aTextureCoord");
    gl.enableVertexAttribArray(gProg.textureCoordAttribute);

    gProg.skinWeightAttribute = gl.getAttribLocation(program,     "aSkinWeight");
    gl.enableVertexAttribArray(gProg.skinWeightAttribute);

    gProg.world = gl.getUniformLocation(program,              "uWorld");
    gProg.worldView = gl.getUniformLocation(program,          "uWorldView");
    gProg.worldViewProj = gl.getUniformLocation(program,      "uWorldViewProj");
    gProg.viewInv = gl.getUniformLocation(program,            "uView");
    gProg.viewInv = gl.getUniformLocation(program,            "uViewInv");

    gProg.sampler = [];
    gProg.sampler[0] = gl.getUniformLocation(program,           "uSampler0");
    gProg.sampler[1] = gl.getUniformLocation(program,           "uSampler1");
    gProg.sampler[2] = gl.getUniformLocation(program,           "uSampler2");

    gProg.joint0 = gl.getUniformLocation(program,             "uJoint0");
    gProg.joint1 = gl.getUniformLocation(program,             "uJoint1");
    gProg.joint2 = gl.getUniformLocation(program,             "uJoint2");
    gProg.joint3 = gl.getUniformLocation(program,             "uJoint3");
    gProg.joint0InvTranspose = gl.getUniformLocation(program, "uJoint0InvTranspose");

    gProg.currentTime = gl.getUniformLocation(program,          "uCurrentTime");
    gProg.currentJellyfishTime = gl.getUniformLocation(program, "uCurrentJellyfishTime");

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
  gl.useProgram(currentProgram);
}
