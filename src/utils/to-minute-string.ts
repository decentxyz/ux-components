export const toMinuteString = (timeInSecond: any) => {
  const minutes = Math.floor(timeInSecond / 60)
  const seconds = timeInSecond - minutes * 60
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`
}