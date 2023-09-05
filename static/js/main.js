import { Cloud } from "./cloud.js";

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.style.border = "5px solid red";

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let offsetX;
let offsetY;

let getOffset = function () {
  let canvasOffset = canvas.getBoundingClientRect();
  offsetX = canvasOffset.left;
  offsetY = canvasOffset.top;
};

getOffset();

window.onscroll = function () {
  getOffset();
};
window.onresize = function () {
  getOffset();
};
window.onresize = function () {
  getOffset();
};

let img = new Image();
img.src = "/public/cloud.png";

let shapes = [];
let currentShapeIndex = null;
let isDragging = false;
let startX = null;
let startY = null;

shapes.push({
  x: 200,
  y: 0,
  width: 200,
  height: 200,
  color: "green",
});

shapes.push({
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  color: "blue",
});

shapes.push({
  x: 200,
  y: 200,
  width: 200,
  height: 200,
  color: "red",
});

let isMouseInShape = function (x, y, shape) {
  let shapeLeft = shape.x;
  let shapeRight = shape.x + shape.width;
  let shapeTop = shape.y;
  let shapeBottom = shape.y + shape.height;

  if (x > shapeLeft && x < shapeRight && y > shapeTop && y < shapeBottom) {
    return true;
  }
  return false;
};

let mouseDown = function (event) {
  event.preventDefault();

  startX = parseInt(event.clientX - offsetX);
  startY = parseInt(event.clientY - offsetY);

  let index = 0;
  for (let shape of shapes) {
    if (isMouseInShape(startX, startY, shape)) {
      currentShapeIndex = index;
      isDragging = true;
      index++;
    }
    index++;
  }
};

let mouseUp = function (event) {
  if (!isDragging) {
    return;
  }

  event.preventDefault();
  isDragging = false;
};

let mouseOut = function (event) {
  if (!isDragging) {
    return;
  }

  event.preventDefault();
  isDragging = false;
};

let mouseMove = function (event) {
  if (!isDragging) {
    return;
  } else {
    event.preventDefault();
    let mouseX = parseInt(event.clientX - offsetX);
    let mouseY = parseInt(event.clientY - offsetY);

    let dx = mouseX - startX;
    let dy = mouseY - startY;

    let currentShape = shapes[currentShapeIndex];

    currentShape.x += dx;
    currentShape.y += dy;

    drawShapes();

    startX = mouseX;
    startY = mouseY;
  }
};

let doubleClick = async function (event) {
  event.preventDefault();

  console.log("doubleClick", event);
  startX = parseInt(event.clientX - offsetX);
  startY = parseInt(event.clientY - offsetY);

  let inShape = false;
  for (let shape of shapes) {
    if (isMouseInShape(startX, startY, shape)) {
      inShape = true;
      return;
    }
  }

  if (inShape == false) {
    console.log("create");
    // createNewCloud(startX, startY);
    askForThought(startX, startY);
  }
};

let askForThought = function (x, y) {
  let input = document.createElement("input");

  let cloud = new Cloud(img, startX, startY, context, "");
  cloud.render();
  input.setAttribute("type", "text");
  input.style.position = "fixed";
  input.style.left = x - 4 + "px";
  input.style.top = y - 4 + "px";

  // canvas.addEventListener("click", function (e) {
  //   if (e && input) {
  //     cloud.update(input.value);
  //     document.body.removeChild(input);
  //   }
  // });

  input.onkeydown = function (e) {
    if (e.key == "Enter") {
      console.log(input);
      cloud.update(this.value);
      document.body.removeChild(this);
    }
  };

  document.body.appendChild(input);

  input.focus();
};

canvas.onmousedown = mouseDown;
canvas.onmouseup = mouseUp;
canvas.onmouseout = mouseOut;
canvas.onmousemove = mouseMove;
canvas.ondblclick = doubleClick;

let drawShapes = function () {
  context.clearRect(0, 0, canvasWidth, canvasHeight);

  for (let shape of shapes) {
    context.fillStyle = shape.color;
    context.fillRect(shape.x, shape.y, shape.width, shape.height);
    context.fillStyle = "black";
  }
};

drawShapes();
