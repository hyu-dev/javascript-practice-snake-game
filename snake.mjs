import { getInputDirection } from "./input.mjs";

// snake의 스피드를 지정 (1초기준으로 나누기를 하며, 1초에 몇번 움직일 것인지 기준작성)
export const SNAKE_SPEED = 3; // 1초동안 3번 움직임
// 1개의 몸체를 가진 snake 생성
const snakeBody = [{ x: 11, y: 11 }];
// snakeBody에 추가할 좌표개수
let newSegments = 0;

// snake의 update 함수
export function update() {
  addSegments();
  // 사용자가 방향키를 누르면 해당 위치로 이동
  const inputDirection = getInputDirection();

  // snake 몸체 뒷부분에 바로 앞 몸체의 위치 값을 적용
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    // 맨 뒤 꼬리부분부터 적용해서 head부분 직전까지 적용
    snakeBody[i + 1] = { ...snakeBody[i] };
  }

  // 사용자가 키를 누른 좌표로 이동 (snake의 head)
  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}

// snake를 다시그림
export function draw(gameBoard) {
  // snake 배열을 돌면서 좌표값을 얻어온다
  snakeBody.forEach((segment) => {
    // snake로 사용할 element를 생성한다
    const snakeElement = document.createElement("div");
    // 해당 element의 grid 행(row => y축) 값에 불러온 y축좌표를 넣는다
    snakeElement.style.gridRowStart = segment.y;
    // 해당 element의 grid 열(column => x축) 값에 불러온 x축좌표를 넣는다
    snakeElement.style.gridColumnStart = segment.x;
    // 생성한 snake element 에 classname을 추가한다
    snakeElement.classList.add("snake");
    // game.mjs로 부터 인자로 받아온 gameboard안에 자식노드로 생성한 snake element를 넣는다
    gameBoard.appendChild(snakeElement);
  });
}

// snake의 몸통을 늘리는 함수
// 인자로 받은 amount만큼 생성할 segment를 늘려줌
export function expandSnake(amount) {
  newSegments += amount;
}

export function onSnake(position, { ignoreHead = false } = {}) {
  // snake 좌표 값 중 어느하나라도 일치하는지 확인
  return snakeBody.some((segment, index) => {
    // ignoreHead가 true이고 index가 0인 경우 각 segment를 false로 내보낸다
    if (ignoreHead && index === 0) return false;
    // ignoreHead가 false이거나 index가 0이 아닌 경우 equalPositions함수를 실행한다.
    // 실행시 받아온 snake의 좌표값과 인자로 받은 좌표값을 인자로 넣는다
    return equalPositions(segment, position);
  });
}

// snake의 head의 좌표값을 리턴하는 함수
export function getSnakeHead() {
  return snakeBody[0];
}

export function snakeIntersection() {
  // snake의 head 좌표값과 ignoreHead에 true가 담긴 onSnake함수 리턴 onSnake는 boolean으로 true / false를 리턴
  // head좌표와 다른 몸통 좌표의 충돌이 발생했는지 여부 확인
  return onSnake(snakeBody[0], { ignoreHead: true });
}

function equalPositions(pos1, pos2) {
  // 몸통좌표와 head좌표의 각 x, y축을 비교하여 둘다 일치하면 true 리턴
  return pos1.x === pos2.x && pos1.y == pos2.y;
}

// snake의 몸통을 늘리는 함수
function addSegments() {
  // expandSnake 함수로 인해 newSegments의 값이 변경되면 update시 가장먼저 실행되며
  // 늘어난 newSegments 값 만큼 for문이 동작하며 snakeBody에 좌표추가
  // 좌표는 모두 같은 위치에 생성되며, 게임이 시작된 경우 좌표는 반복해서 동작하므로 길어지는 효과를 나타낼 수 있다
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }
  // 한 번 늘어난 후 더 이상 늘어나지 못하도록 segment를 0으로 초기화 해준다
  newSegments = 0;
}
