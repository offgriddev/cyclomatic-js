export function lambdaConditional() {
  [1, 2, 4].filter(x => {
    if (x > 1)
      return true

    return false
  })
}