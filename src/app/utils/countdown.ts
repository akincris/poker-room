export const countDown = (startedAt: number) => {
  const totalDuration = 3 * 60 * 1000;
  const now = Date.now();

  let remainedTime = totalDuration - (now - startedAt);
  remainedTime = Math.max(remainedTime, 0);

  const minutes = Math.floor(remainedTime / (1000 * 60))
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((remainedTime % (1000 * 60)) / 1000)
    .toString()
    .padStart(2, "0");

  return {
    minutes,
    seconds,
    remainedTime,
  };
};
