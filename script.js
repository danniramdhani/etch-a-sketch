const container = document.querySelector(".sketch");
const drawButton = document.querySelector(".draw");
const clearButton = document.querySelector(".clear");
const eraseButton = document.querySelector(".erase");
const color = document.getElementById("color");
const newGrid = document.querySelector(".new-grid");
const infoGrid = document.querySelector(".info-grid");
const rgbButton = document.querySelector(".rgb-mode");
//const grayscaleButton = document.querySelector(".grayscale-mode");

const totalHeightAndWidth = 24;
let gridSize = 16;
let buttonIsClicked = false;
let eraseButtonIsClicked = false;

calcHeight = totalHeightAndWidth / gridSize;
calcWidth = totalHeightAndWidth / gridSize;

function changeSize(value) {
    gridSize = value;
    calcHeight = (totalHeightAndWidth / value).toFixed(3);
    calcWidth = (totalHeightAndWidth / value).toFixed(3);
}

function containerSize(value) {
    container.style.height = `${value}em`;
    container.style.width = `${value}em`;
}

function infoGridSize(value) {
    infoGrid.innerHTML = `${value} x ${value}`;
}

newGrid.addEventListener("click", () => {
    buttonIsClicked = true;
    let inputGridSize = parseInt(prompt("Change size: ", "16"));

    changeSize(inputGridSize);

    if (gridSize < 1 || gridSize > 64) {
        alert("Please enter a value between 1-64");
        return;
    }

    if (!inputGridSize) {
        changeSize(16);
    }

    container.innerHTML = "";
    loopHBoxes();
    loopVBoxes();
    infoGridSize(gridSize);
});

function loopHBoxes() {
    for (let i = 0; i < gridSize; i++) {
        const boxes = document.createElement("div");

        containerSize(totalHeightAndWidth);
        boxes.style.height = `${calcHeight}em`;
        boxes.style.width = `${calcWidth}em`;

        function draw(color) {
            boxes.addEventListener("mouseover", () => {
                boxes.style.backgroundColor = color;
            });
        }

        draw(color.value);

        rgbButton.addEventListener("click", () => {
            let randomColor =
                "#" +
                Math.floor(Math.random() * (256 * 256 * 256))
                    .toString(16)
                    .padStart(6, "0");

            draw(randomColor);
        });

        //grayscaleButton.addEventListener("click", () => {
        //});

        eraseButton.addEventListener("click", () => {
            draw("white");
            drawButton.addEventListener("click", () => {
                draw(color.value);
            });
        });

        clearButton.addEventListener("click", () => {
            boxes.style.backgroundColor = "white";
            draw(color.value);
        });

        color.addEventListener("input", () => {
            let pickedColor = color.value;

            draw(pickedColor);
            drawButton.addEventListener("click", () => {
                draw(pickedColor);
            });
        });

        container.appendChild(boxes);
    }
}

function loopVBoxes() {
    // Bug aneh, ketika newGrid button di klik, kolom boxes-nya
    // jadi lebih satu. So, untuk sementara, biar normal,
    // gridSize-nya harus di kurangin satu.
    if (buttonIsClicked === true) {
        for (let i = 0; i < gridSize - 1; i++) {
            loopHBoxes();
        }
    } else {
        for (let i = 0; i < gridSize; i++) {
            loopHBoxes();
        }
    }
}

loopVBoxes();
