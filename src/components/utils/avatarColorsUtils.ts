// Predefined avatar colors
export const avatarColors = [
  "#124076",
  "#7F9F80",
  "#8E7AB5",
  "#F6995C",
  "#9B4444",
];

// Function to get a color index based on a string
export const getColorIndex = (str: string, arrayLength: number): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash + str.charCodeAt(i)) % arrayLength;
  }
  return hash;
};
