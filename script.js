function possibleMoves(x, y) {
  const allowedMovement = [
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [-1, 2],
  ];

  let legalMovement = [];

  allowedMovement.forEach((movement) => {
    if (
      x + movement[0] >= 0 &&
      x + movement[0] < 8 &&
      y + movement[1] >= 0 &&
      y + movement[1] < 8
    )
      legalMovement.push(movement);
  });

  let legalSquares = [];

  legalMovement.forEach((move) => {
    legalSquares.push([x + move[0], y + move[1]]);
  });
  return legalSquares;
}

console.log("moves from 0,0");
console.log(possibleMoves(0, 0));

console.log("moves from 4,4");
console.log(possibleMoves(4, 4));

console.log("moves from 7,7");
console.log(possibleMoves(7, 7));

console.log("moves from 2,1");
console.log(possibleMoves(2, 1));
