const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;

let playerPaddle = {
    x: 0,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0
};

let aiPaddle = {
    x: canvas.width - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 4
};

let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: ballSize,
    dx: 4,
    dy: 4
};

function drawRect(x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function drawBall(x, y, size, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, size, 0, Math.PI * 2);
    context.fill();
}

function movePaddle(paddle) {
    paddle.y += paddle.dy;
    if (paddle.y < 0) {
        paddle.y = 0;
    } else if (paddle.y + paddle.height > canvas.height) {
        paddle.y = canvas.height - paddle.height;
    }
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y < 0 || ball.y + ball.size > canvas.height) {
        ball.dy *= -1;
    }

    if (ball.x < 0 || ball.x + ball.size > canvas.width) {
        ball.dx *= -1;
    }

    if (ball.x < playerPaddle.x + playerPaddle.width &&
        ball.y > playerPaddle.y &&
        ball.y < playerPaddle.y + playerPaddle.height) {
        ball.dx *= -1;
    }

    if (ball.x + ball.size > aiPaddle.x &&
        ball.y > aiPaddle.y &&
        ball.y < aiPaddle.y + aiPaddle.height) {
        ball.dx *= -1;
    }
}

function update() {
    movePaddle(playerPaddle);
    movePaddle(aiPaddle);
    moveBall();

    if (ball.y < aiPaddle.y + aiPaddle.height / 2) {
        aiPaddle.dy = -4;
    } else {
        aiPaddle.dy = 4;
    }
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawRect(playerPaddle.x, playerPaddle.y, playerPaddle.width, playerPaddle.height, '#fff');
    drawRect(aiPaddle.x, aiPaddle.y, aiPaddle.width, aiPaddle.height, '#fff');
    drawBall(ball.x, ball.y, ball.size, '#fff');
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        playerPaddle.dy = -6;
    } else if (e.key === 'ArrowDown') {
        playerPaddle.dy = 6;
    }
});

document.addEventListener('keyup', () => {
    playerPaddle.dy = 0;
});

loop();
