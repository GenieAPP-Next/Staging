export const getInitials = (name: string) => {
  const words = name.split(" ");
  const initials =
    words.length > 1 ? words[0].charAt(0) + words[1].charAt(0) : name.charAt(0);
  return initials.toUpperCase();
};
