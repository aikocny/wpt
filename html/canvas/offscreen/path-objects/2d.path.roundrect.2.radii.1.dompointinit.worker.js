// DO NOT EDIT! This test has been generated by /html/canvas/tools/gentest.py.
// OffscreenCanvas test in a worker:2d.path.roundrect.2.radii.1.dompointinit
// Description:Verify that when two radii are given to roundRect(), the first radius, specified as a DOMPoint, applies to the top-left and bottomInit-right corners.
// Note:

importScripts("/resources/testharness.js");
importScripts("/html/canvas/resources/canvas-tests.js");

var t = async_test("Verify that when two radii are given to roundRect(), the first radius, specified as a DOMPoint, applies to the top-left and bottomInit-right corners.");
var t_pass = t.done.bind(t);
var t_fail = t.step_func(function(reason) {
    throw reason;
});
t.step(function() {

var canvas = new OffscreenCanvas(100, 50);
var ctx = canvas.getContext('2d');

ctx.fillStyle = '#f00';
ctx.fillRect(0, 0, 100, 50);
ctx.roundRect(0, 0, 100, 50, [{x: 40, y: 20}, 0]);
ctx.fillStyle = '#0f0';
ctx.fill();

// top-left corner
_assertPixel(canvas, 20,1, 255,0,0,255);
_assertPixel(canvas, 41,1, 0,255,0,255);
_assertPixel(canvas, 1,10, 255,0,0,255);
_assertPixel(canvas, 1,21, 0,255,0,255);

// bottom-right corner
_assertPixel(canvas, 79,48, 255,0,0,255);
_assertPixel(canvas, 58,48, 0,255,0,255);
_assertPixel(canvas, 98,39, 255,0,0,255);
_assertPixel(canvas, 98,28, 0,255,0,255);

// other corners
_assertPixel(canvas, 98,1, 0,255,0,255);
_assertPixel(canvas, 1,48, 0,255,0,255);
t.done();

});
done();