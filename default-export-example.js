export const consequentAlternate = () => {
  const a = 41;
  if (a < 42) {
    return true;
  } else {
    return false;
  }
};
export const consequent = () => {
  const a = 41;
  if (a < 42) {
    return true;
  } else if (a < 21) {
    return true;
  }
  return false;
};
