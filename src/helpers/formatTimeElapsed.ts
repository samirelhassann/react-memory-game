export const formatTimeElapsed = (seconds: number): string => {
  let minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;

  return `${pad(minutes, 2)}:${pad(seconds, 2)}`;
};

function pad(num: number, size: number): string {
  let numString = num.toString();
  while (numString.length < size) numString = "0" + numString;
  return numString;
}
