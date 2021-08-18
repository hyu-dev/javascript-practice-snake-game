import { onSnake, expandSnake } from "./snake.mjs";
import { randomGridPosition } from "./grid.mjs";

// 랜덤하게 food의 좌표를 생성
let food = getRandomFoodPosition();
// food와 snake가 충돌했을 때 snake의 몸통을 몇개로 늘릴 건지 개수 초기화
const EXPANSION_RATE = 1;

// food의 update 함수
export function update() {
  // food와 snake의 좌표값이 일치하면 (ignoreHead가 없기때문에 equalPosition 함수를 실행하여 위치가 동일한지 확인)
  if (onSnake(food)) {
    // food 와 snake 좌표값이 동일하면 snake의 몸통을 늘림 (개수는 인자로 들어가는 값)
    expandSnake(EXPANSION_RATE);
    // 몸통이 늘어남과 동시에 food의 랜덤한 좌표값 새로 생성
    food = getRandomFoodPosition();
  }
}

// food의 draw 함수
export function draw(gameBoard) {
  // food element를 생성
  const foodElement = document.createElement("div");
  // 해당 element의 grid 행(row => y축) 값에 불러온 y축좌표를 넣는다
  foodElement.style.gridRowStart = food.y;
  // 해당 element의 grid 열(column => x축) 값에 불러온 x축좌표를 넣는다
  foodElement.style.gridColumnStart = food.x;
  // 생성한 food element 에 classname을 추가한다
  foodElement.classList.add("food");
  // game.mjs로 부터 인자로 받아온 gameboard안에 자식노드로 생성한 food element를 넣는다
  gameBoard.appendChild(foodElement);
}

// food의 좌표를 랜덤하게 생성하는 함수
function getRandomFoodPosition() {
  // 새로운 food 포지션 변수 선언
  let newFoodPosition;
  // food 포지션 변수가 null 이거나 onSnake에 담긴 food 포지션이 true로 판명나면 무한반복
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    // food포지션에 랜덤하게 생성한 좌표값을 넣어라
    // food포지션이 snake가 지나가는 포지션과 일치하면
    // 일치하지 않을때까지 새롭게 포지션을 생성
    newFoodPosition = randomGridPosition();
  }
  // 생성한 food포지션을 리턴
  return newFoodPosition;
}
