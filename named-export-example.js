export const consequent = () => {
  try {
    console.log("test");
  } catch (e) {
    return false;
  }

  // a logical structure with two || has 8 possible paths
  // a || b || c
  // -----------
  // 0 || 0 || 0 F
  // 1 || 0 || 0 P
  // 0 || 1 || 0 P
  // 0 || 0 || 1 P
  // 1 || 1 || 0 P
  // 1 || 0 || 1 P
  // 0 || 1 || 1 P
  // 1 || 1 || 1 P
  const first = 2 + 2 == 4;
  const second = 1 + 1 == 2;
  const third = 1 + 2 == 3;
  if (first || second || third) {
    return true;
  }

  // a && b
  // ------
  // 1 && 1 P
  // 0 && 1 F
  // 1 && 0 F
  // 0 && 0 F
  if (first && second) {
  }
  let i = 0;
  do {
    console.log("hi");
    i++;
  } while (i < 2);
  return false;
};
