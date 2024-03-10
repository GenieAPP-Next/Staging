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


export function capitalizeFirstLetter(string: string) {
  return string.replace(/\b(\w)/g, s => s.toUpperCase());
}