const canvas = document.getElementById("paintCanvas");
const ctx = canvas.getContext("2d");

// Автоматическое определение размера экрана
function adjustCanvasSize() {
    if (window.innerWidth < 600) {
        canvas.width = window.innerWidth * 0.95;
        canvas.height = 300;
    } else {
        canvas.width = window.innerWidth * 0.8;
        canvas.height = 400;
    }
}
adjustCanvasSize();
window.addEventListener("resize", adjustCanvasSize);

let painting = false;
let brushColor = "#000000";
let brushSize = 5;
let currentTool = "brush";
let textInput = "";

// Настройка элементов управления
document.getElementById("colorPicker").addEventListener("input", (e) => brushColor = e.target.value);
document.getElementById("sizePicker").addEventListener("input", (e) => brushSize = e.target.value);
document.getElementById("toolPicker").addEventListener("change", (e) => currentTool = e.target.value);
document.getElementById("themeToggle").addEventListener("change", toggleTheme);

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

// Очистка холста
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Сохранение изображения в выбранном формате
function saveImage(format) {
    let link = document.createElement("a");
    link.download = `paint.${format}`;
    link.href = canvas.toDataURL(`image/${format}`);
    link.click();
}

// Переключение Night/Light Mode
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}
