// JavaScript Document<script type="text/javascript">
/**@type {WebGLRenderingContext} */
var gl;
var canvas,docWidth,docHeight;
var useCmdBuf=window.conch;
var _glCommandEncoder;
var gProg={};

function patchGL(gl){
    //shader: WebGLShader | null, pname: number
    gl.getShaderParameter=function(shader,pname){
        switch(pname){
            case gl.COMPILE_STATUS:return true;
            default: return true;
        }
    }

    //getProgramParameter(program: WebGLProgram | null, pname: number): any;
    //  gl.LINK_STATUS
    gl.getProgramParameter=function(program,pname){
        switch(pname){
            case gl.LINK_STATUS:
            return true;
        }
        return true;
    }

    //getAttribLocation(program: WebGLProgram | null, name: string): number;
    /*
    aVertexPosition:0   aVertexNormal  aVertexColor aTextureCoord  aSkinWeight
    */

    //getUniformLocation(program: WebGLProgram | null, name: string): WebGLUniformLocation | null;
    /*
    uSampler0  uSampler1   uSampler2  uJoint0   uJoint1 uJoint2  uJoint3 uJoint0InvTranspose   uCurrentTime  uCurrentJellyfishTime
    */

    if(useCmdBuf){
        _glCommandEncoder =gl.createCommandEncoder(102400, 2560, false);
    } 

}

function initWin(w,h){
    w=canvas.width =  document.body.clientWidth|| window.innerWidth;
    h=canvas.height = document.body.clientHeight || window.innerHeight;
    try {
        gl = canvas.getContext( "experimental-webgl" ) ;
        gl.viewportWidth = w;
        gl.viewportHeight = h;
    } catch(e) {  

    }
    if (!gl) {
        alert("Your browser failed to initialize WebGL.");
    }
    patchGL(gl);
}

window.onresize =function() {
    initWin(null,null);
};

function webGLStart() {
    canvas = document.createElement('canvas');
    document.body.appendChild(canvas);

    initWin();
    initBuffers();
    initShaders();
    initTextures();

    setDebugParam();

    gl.clearColor(0., 0., 0., 0.);
    gl.clearDepth(1.);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.BLEND);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    interact();
    animate();
}

window.onload=function(){
    webGLStart();
}

function addJellyfish(){
    Param.jCount+=5;
    console.log('count='+Param.jCount);
}

document.addEventListener( "touchend",addJellyfish);
document.addEventListener('mouseup',addJellyfish);


