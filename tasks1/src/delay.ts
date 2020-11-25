const delay = async (milliseconds: number) =>
  await new Promise((res, rej) => setTimeout(() => res(), milliseconds));

export default delay;
