export function convertToInitial(username: string) {
  if (!username) {
    return "";
  }
  return username
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}
