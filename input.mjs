import { setStartTime, timecheck } from "./time.mjs";

// 사용자가 방향키를 눌렀을 때 움직이려는 위치의 초기값 (x와 y모두 0으로 초기화)
let inputDirection = { x: 0, y: 0 };
// 사용자가 다른 방향키를 누르기전까지 계속 이동하고자 하는 위치 값
let lastInputDirection = { x: 0, y: 0 };
// 방향키를 누르면 최초1회 시작시간 체크
let isTimeCheck = true;

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      // 이동하고자하는 위치값 중 y값이 0이 아닌 1, -1 이라면
      // 즉, 위나 아래방향키를 이미 누른 상태라면 다음을 진행하지 않고 break를 걸어 switch 문을 빠져나온다
      // 위로 이동하고있는 상태에서 위를 누를 경우 의미 없는 모션, 아래를 누를 경우 반대로 이동할 수 없으므로
      // 나머지도 동일한 의미
      if (lastInputDirection.y !== 0) break;
      inputDirection = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (lastInputDirection.y !== 0) break;
      inputDirection = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (lastInputDirection.x !== 0) break;
      inputDirection = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (lastInputDirection.x !== 0) break;
      inputDirection = { x: 1, y: 0 };
      break;
    default:
      return alert("방향키를 눌러 시작하세요");
  }
  // 방향키 눌렀을 때 시간 측정 시작
  if (isTimeCheck) {
    // 최초 1회만 시전
    setStartTime(timecheck());
    isTimeCheck = false;
  }
});

// inputDirection을 리턴하는 함수
export function getInputDirection() {
  lastInputDirection = inputDirection;
  return inputDirection;
}
