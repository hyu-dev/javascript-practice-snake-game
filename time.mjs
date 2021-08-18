export let startTime;
export let endTime;

export function timecheck() {
  const start = new Date();
  return start;
}

export function setStartTime(time) {
  startTime = time ?? null;
}

export function setEndTime(time) {
  endTime = time;
}
