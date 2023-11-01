export function switchCase() {
  const a = false
  switch (a) {
    case true:
      return 'yes';
    case false:
    default:
      return 'no'
  }
}

// 3