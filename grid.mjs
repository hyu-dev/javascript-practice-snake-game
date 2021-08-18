// 게임이 진행되는 grid의 좌, 우 사이즈
// 21 * 21 = 441
const GRID_SIZE = 21;

// 랜덤하게 포지션을 생성
export function randomGridPosition() {
  return {
    x: Math.floor(Math.random() * GRID_SIZE) + 1,
    y: Math.floor(Math.random() * GRID_SIZE) + 1,
  };
}

// 포지션이 그리드 밖으로 나갔는지 체크 (true / false 리턴)
export function outsideGrid(position) {
  return (
    position.x < 1 ||
    position.x > GRID_SIZE ||
    position.y < 1 ||
    position.y > GRID_SIZE
  );
}
