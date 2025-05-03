const canvas = document.getElementById("paintCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth * 0.8;
canvas.height = 400;

let painting = false;
let brushColor = "#000000";
let brushSize = 5;
let currentTool = "brush";
let textInput = "";

document.getElementById("colorPicker").addEventListener("input", (e) => brushColor = e.target.value);
document.getElementById("sizePicker").addEventListener("input", (e) => brushSize = e.target.value);
document.getElementById("toolPicker").addEventListener("change", (e) => currentTool = e.target.value);

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mousemove", draw);

function startDrawing(event) {
    painting = true;

    if (currentTool === "fill") {
        floodFill(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop, brushColor);
    } else if (currentTool === "text") {
        textInput = prompt("Введите текст:");
        ctx.fillStyle = brushColor;
        ctx.font = `${brushSize * 3}px Arial`;
        ctx.fillText(textInput, event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    }
}

function stopDrawing() {
    painting = false;
    ctx.beginPath();
}

function draw(event) {
    if (!painting || currentTool === "fill" || currentTool === "text") return;

    ctx.lineWidth = currentTool === "pencil" ? 1 : brushSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = currentTool === "eraser" ? "white" : brushColor;
    
    ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
}

// Заливка области
function floodFill(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveImage(format) {
    let link = document.createElement("a");
    link.download = `paint.${format}`;
    link.href = canvas.toDataURL(`image/${format}`);
    link.click();
}
