const sendBtn = document.getElementById('send-btn');
const input = document.getElementById('input');
const squares = document.querySelectorAll('.sq');
const report = document.getElementById('report');
const regTileCol = '#DC602E'; // Orange
const activeTileCol = '#ffe600'; // Yellow

const maxPos = 4;
const walkSpeed = 1;
const runSpeed = 2;

let curSpeed = walkSpeed;
let robots = [];

let placed = false;

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
        case "WALK":
            curSpeed = walkSpeed;
            break;
        case "RUN":
            curSpeed = runSpeed;
            break;
        case "CHARGE":
            for (let i = 0; i < maxPos; i++) {
                move();
            }
            break;
        case "STRAFE LEFT":
            strafeLeft();
            break;
        case "STRAFE RIGHT":
            strafeRight();
            break;
        default:
            return;
    }
});

function getActiveRobot() {
    for (let i = 0; i < robots.length; i++) {
        if (robots[i].active) {
            return robots[i];
        }
    }
}

function move() {
    let activeRobot = getActiveRobot();
    for (let i = 0; i < curSpeed; i++) {
        switch (activeRobot.roboDir) {
            case directions.NORTH:
                if (activeRobot.roboY < maxPos) {
                    activeRobot.roboY++;
                }
                break;
            case directions.EAST:
                if (activeRobot.roboX < maxPos) {
                    activeRobot.roboX++;
                }
                break;
            case directions.SOUTH:
                if (activeRobot.roboY > 0) {
                    activeRobot.roboY--;
                }
                break;
            case directions.WEST:
                if (activeRobot.roboX > 0) {
                    activeRobot.roboX--;
                }
                break;
        }
    }
    updateView();
}

function turnLeft() {
    let robot = getActiveRobot();
    let curIndex = dirArr.indexOf(robot.roboDir);
    if (curIndex == 0) {
        robot.roboDir = dirArr[dirArr.length - 1];
    } else {
        robot.roboDir = dirArr[curIndex - 1];
    }
    updateView();
}

function turnRight() {
    let robot = getActiveRobot();
    let curIndex = dirArr.indexOf(robot.roboDir);
    if (curIndex == 3) {
        robot.roboDir = dirArr[0];
    } else {
        robot.roboDir = dirArr[curIndex + 1];
    }
    updateView();
}

function displayPosition() {
    let robot = getActiveRobot();
    report.innerText = (robot.roboX + "," + robot.roboY + "," + robot.roboDir);
}

function strafeLeft() {
    let robot = getActiveRobot();
    switch (robot.roboDir) {
        case directions.NORTH:
            robot.roboX = robot.roboX > 0 ? robot.roboX - 1 : robot.roboX;
            break;
        case directions.EAST:
            robot.roboY = robot.roboY < maxPos ? robot.roboY + 1 : robot.roboY;
            break;
        case directions.SOUTH:
            robot.roboX = robot.roboX < maxPos ? robot.roboX + 1 : robot.roboX;
            break;
        case directions.WEST:
            robot.roboY = robot.roboY > 0 ? robot.roboY - 1 : robot.roboY;
            break;
    }
    updateView();
}

function strafeRight() {
    let robot = getActiveRobot();
    switch (robot.roboDir) {
        case directions.NORTH:
            robot.roboX = robot.roboX < maxPos ? robot.roboX + 1 : robot.roboX;
            break;
        case directions.EAST:
            robot.roboY = robot.roboY > 0 ? robot.roboY - 1 : robot.roboY;
            break;
        case directions.SOUTH:
            robot.roboX = robot.roboX > 0 ? robot.roboX - 1 : robot.roboX;
            break;
        case directions.WEST:
            robot.roboY = robot.roboY < maxPos ? robot.roboY + 1 : robot.roboY;
            break;
    }
    updateView();
}

function place(x, y, direction) {
    robots.push({
        roboX: x,
        roboY: y,
        roboDir: direction,
        active: robots.length == 0
    });
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
    squares.forEach(x => x.style.backgroundColor = regTileCol);
    robots.forEach(robot => {
        let roboIcon;
        switch (robot.roboDir) {
            case directions.NORTH:
                roboIcon = icon.NORTH;
                break;
            case directions.EAST:
                roboIcon = icon.EAST;
                break;
            case directions.SOUTH:
                roboIcon = icon.SOUTH;
                break;
            case directions.WEST:
                roboIcon = icon.WEST;
                break;
        }
        document.getElementById(robot.roboX.toString() + robot.roboY.toString()).innerText = roboIcon;
        document.getElementById(robot.roboX.toString() + robot.roboY.toString()).style.backgroundColor = robot.active ? activeTileCol : regTileCol;
    });
}