export const getAvatarName = (word: string | undefined | null) => {
  if (word === undefined || !word) return;
  const bits = word.trim().split(" ");
  return bits
    .map((bit) => bit.charAt(0))
    .join("")
    .toUpperCase();
};
