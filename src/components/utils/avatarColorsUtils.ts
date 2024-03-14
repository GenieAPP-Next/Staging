// Predefined avatar colors
export const avatarColors = [
  "#124076",
  "#7F9F80",
  "#8E7AB5",
  "#F6995C",
  "#9B4444",
];

export const getColorIndex = (str: string, arrayLength: number): number => {
  if (!str || typeof str !== "string" || str.length === 0) {
    return 0;
  }

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash + str.charCodeAt(i)) % arrayLength;
  }
  return hash;
};
