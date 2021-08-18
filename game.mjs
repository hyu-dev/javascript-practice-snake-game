import {
  update as updateSnake,
  draw as drawSnake,
  SNAKE_SPEED,
  getSnakeHead,
  snakeIntersection,
} from "./snake.mjs";
import { update as updateFood, draw as drawFood } from "./food.mjs";
import { outsideGrid } from "./grid.mjs";
import { timecheck, endTime, startTime, setEndTime } from "./time.mjs";

// 렌더링된 시간
let lastRenderTime = 0;
// 게임이 끝났는지
let gameOver = false;
// 게임이 진행되는 보드판
const gameBoard = document.getElementById("game-board");
// 시간체크
const timeBoard = document.getElementById("count");

// 게임이 실행되는 메인함수
function main(currentTime) {
  // 방향키가 눌리지 않은 상태
  if (startTime === undefined) {
    timeBoard.innerText = "00:00:00";
  } else {
    // 방향키가 눌렸을때 시간 체크
    checkTime();
  }
  // 게임이 끝났다면 true라면
  if (gameOver) {
    // 다시 시작할건지?
    if (confirm("You lost, Press ok to restart.")) {
      // 시작한다면 주소를 로컬주소/game.html 로 이동하라
      window.location = "/game.html";
    }
    // 아니면 그대로 종료
    return;
  }
  // 게임이 끝나지 않았다면 반복해서 animationFrame을 불러와라
  window.requestAnimationFrame(main);
  // 현재시간에서 마지막으로 렌더링된 시간을 빼고 ms(밀리세컨)에서 s(세컨)로 변경
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  // 마지막으로 렌더링된 시간이 1초보다 작다면 다음을 진행하지 않고 종료해라
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  // 마지막으로 렌더링된 시간이 1초가 되면 현재시간을 lastRenderTime에 담는다
  lastRenderTime = currentTime;

  // update 함수를 실행한다
  update();
  // draw 함수를 실행한다
  draw();
}
// main 함수 실행
window.requestAnimationFrame(main);

// update 함수 실행
function update() {
  // snake의 update 함수를 실행
  updateSnake();
  // food의 update 함수 실행
  updateFood();
  // 게임오버되었는지 확인 (게임영역을 벗어난 경우)
  checkDeath();
}

function draw() {
  // 게임보드공간을 비워준다
  gameBoard.innerHTML = "";
  // 비워진 gameBoard를 snake의 draw 함수에 넣어 실행한다
  drawSnake(gameBoard);
  // 비워진 gameBoard를 food의 draw 함수에 넣어 실행한다
  drawFood(gameBoard);
}

function checkDeath() {
  // snake의 머리부분이 grid 영역을 벗어나거나 자기자신과 충돌하면 gameover 된다 (true처리되어 main에서 종료됨)
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

function checkTime() {
  setEndTime(timecheck());
  const min =
    Math.floor(((endTime - startTime) / 1000 / 60) % 60) < 10
      ? "0" + Math.floor(((endTime - startTime) / 1000 / 60) % 60)
      : Math.floor(((endTime - startTime) / 1000 / 60) % 60);
  const sec =
    Math.floor(((endTime - startTime) / 1000) % 60) < 10
      ? "0" + Math.floor(((endTime - startTime) / 1000) % 60)
      : Math.floor(((endTime - startTime) / 1000) % 60);
  const msec =
    Math.floor(((endTime - startTime) / 10) % 100) < 10
      ? "0" + Math.floor(((endTime - startTime) / 10) % 100)
      : Math.floor(((endTime - startTime) / 10) % 100);
  const time = `${min}:${sec}:${msec}`;
  timeBoard.innerText = time;
}
