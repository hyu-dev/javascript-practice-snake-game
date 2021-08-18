## javascript snake 게임
- 연습삼아 따라친 javascript snake 게임
- 각 코드별 의미하는 동작구조 주석으로 작성하면서 전반적인 동작 이해  
[참고영상](https://www.youtube.com/watch?v=QTcIXok9wNY)

## 실행방법
1. 터미널을 켠다
2. npx http-server -p 8080 실행
3. 로컬주소:8080으로 접속하여 game.html 클릭
4. 방향키를 눌러 게임 시작

## 게임설명
- 방향키를 눌러 snake를 이동시킨다
- snake가 food와 닿을 경우 snake의 길이가 길어지며 새로운 food 생성
- snake가 이동하다가 자기자신과 충돌할 경우 게임 끝
- snake가 이동하다가 게임보드를 넘어갈 경우 게임 끝
- snake는 이동하려는 방향의 반대편으로 이동할 수 없으며, 반드시 45도 각도에 해당하는 위치로만 이동가능
  (예: 우측방향키 누르면 좌측으로 이동불가하며 위, 아래로만 이동 가능)

## 구조설명
> game.html
- 브라우저 화면
- grid형태로 이루어져 있음 (21 * 21)
> game.mjs
- 게임이 실행되는 메인 모듈
- main함수가 실행되면서 게임진행
> snake.mjs
- 게임보드 위 snake가 동작하는 함수 모듈
- game.mjs의 main함수 동작과정에서 호출될 경우 실행됨 (gameover시 종료)
> food.mjs
- 게임보드 위 food가 동작하는 함수 모듈
- game.mjs의 main함수 동작과정에서 호출될 경우 실행됨 (gameover시 종료)
> input.mjs
- 게임보드 위에서 사용자가 누른 방향키에 따라 이동할 위치를 계산하는 함수 모듈
- snake.mjs의 update함수 동작과정에서 실행됨
> grid.mjs
- food가 랜덤으로 표시되도록 계산하는 함수, 게임보드 밖으로 벗어났는지 체크하는 함수 모듈
- food.mjs의 update함수 동작과정에서 실행됨
- game.mjs의 checkDeath함수 동작과정에서 실행됨

## 기능추가
> time.mjs
- 사용자가 방향키를 누름과 동시에 종료될 때까지 시간체크
- game.mjs의 main함수 동작과정에서 계속 체크
- 게임종료시 체크 종료

## 작업 기타사항
> mjs를 사용한 이유
html에서 script로 불러오는 일반적인 js형태로는 import/export를 사용할 수 없어서
type="module"을 속성으로 추가해줘야함
```
<script type='module' src='game.mjs'></script>
```
모듈 자바스크립트를 이용해야 import/export사용 가능함
> http-server를 이용하는 이유
모듈 자바스크립트를 사용할 경우 cors이슈 발생
cors를 맞춰야 오류없이 사용가능
