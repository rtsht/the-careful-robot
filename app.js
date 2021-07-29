const sendBtn = document.getElementById('send-btn');
const input = document.getElementById('input');
const squares = document.querySelectorAll('.sq');
const report = document.getElementById('report');

const maxPos = 4;
let placed = false;
let roboX;
let roboY;
let roboDir;

const icon = {
    NORTH: "⬆️",
    EAST: "➡️",
    SOUTH: "⬇️",
    WEST: "⬅️"
};

const directions = {
    NORTH: "NORTH",
    EAST: "EAST",
    SOUTH: "SOUTH",
    WEST: "WEST"
};

const dirArr = ["NORTH", "EAST", "SOUTH", "WEST"];

input.focus();

input.addEventListener('keyup', (e) => {
    e.preventDefault();
    if (e.key == 'Enter') {
        sendBtn.click();
    }
});

sendBtn.addEventListener('click', () => {
    report.innerText = '';
    let inputCommand = input.value;
    input.focus();
    input.value = '';
    if (inputCommand == '') {
        return;
    }
    if (placed == false || inputCommand.startsWith("PLACE")) {
        let coords = validatePlace(inputCommand);
        if (coords == null) {
            return;
        }
        place(coords[0], coords[1], coords[2]);
        placed = true;
        return;
    }
    switch (inputCommand) {
        case "MOVE":
            move();
            break;
        case "LEFT":
            turnLeft();
            break;
        case "RIGHT":
            turnRight();
            break;
        case "REPORT":
            displayPosition();
            break;
        default:
            return;

    }
});

function move() {
    switch (roboDir) {
        case directions.NORTH:
            if (roboY < maxPos) {
                roboY++;
            }
            break;
        case directions.EAST:
            if (roboX < maxPos) {
                roboX++;
            }
            break;
        case directions.SOUTH:
            if (roboY > 0) {
                roboY--;
            }
            break;
        case directions.WEST:
            if (roboX > 0) {
                roboX--;
            }
            break;
    }
    updateView();
}

function turnLeft() {
    let curIndex = dirArr.indexOf(roboDir);
    if (curIndex == 0) {
        roboDir = dirArr[dirArr.length - 1];
    } else {
        roboDir = dirArr[curIndex - 1];
    }
    updateView();
}

function turnRight() {
    let curIndex = dirArr.indexOf(roboDir);
    if (curIndex == 3) {
        roboDir = dirArr[0];
    } else {
        roboDir = dirArr[curIndex + 1];
    }
    updateView();
}

function displayPosition() {
    report.innerText = (roboX + "," + roboY + "," + roboDir);
}

function place(x, y, direction) {
    roboX = x;
    roboY = y;
    roboDir = direction;
    updateView();
}

function validatePlace(command) {
    if (command.startsWith("PLACE ") == false) {
        return null;
    }
    if (command.split(" ").length > 2) {
        return null;
    }
    let placeArr = command.split(' ')[1].split(',');
    if (!Number.isInteger(parseInt(placeArr[0], 10)) ||
        !Number.isInteger(parseInt(placeArr[1], 10))) {
        console.log("not numbers");
        return null;
    }
    if (parseInt(placeArr[0], 10) < 0 || parseInt(placeArr[0], 10) > maxPos ||
        parseInt(placeArr[1], 10) < 0 || parseInt(placeArr[1], 10) > maxPos) {
        return null;
    }
    placeArr[0] = parseInt(placeArr[0], 10);
    placeArr[1] = parseInt(placeArr[1], 10);
    if (placeArr[2] != "NORTH" && placeArr[2] != "EAST" &&
        placeArr[2] != "WEST" && placeArr[2] != "SOUTH") {
        return null;
    }
    return placeArr;
}

function updateView() {
    squares.forEach(x => x.innerHTML = '');
    let robo;
    switch (roboDir) {
        case directions.NORTH:
            robo = icon.NORTH;
            break;
        case directions.EAST:
            robo = icon.EAST;
            break;
        case directions.SOUTH:
            robo = icon.SOUTH;
            break;
        case directions.WEST:
            robo = icon.WEST;
            break;
    }
    document.getElementById(roboX.toString() + roboY.toString()).innerText = robo;
}