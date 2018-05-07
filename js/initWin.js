// JavaScript Document<script type="text/javascript">
var gl;
var canvas,docWidth,docHeight;

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