const canvas = document.getElementById("paintCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth * 0.8;
canvas.height = 400;

let painting = false;
let brushColor = "#000000";
let brushSize = 5;
let eraserMode = false;

// Слушатели событий
canvas.addEventListener("mousedown", () => painting = true);
canvas.addEventListener("mouseup", () => {
    painting = false;
    ctx.beginPath();
});
canvas.addEventListener("mousemove", draw);
document.getElementById("colorPicker").addEventListener("input", (e) => brushColor = e.target.value);
document.getElementById("sizePicker").addEventListener("input", (e) => brushSize = e.target.value);

function draw(event) {
    if (!painting) return;

    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = eraserMode ? "white" : brushColor;
    
    ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
}

function setEraser() {
    eraserMode = true;
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
