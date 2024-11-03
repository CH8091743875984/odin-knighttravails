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
    if (legalSquare(x + movement[0], y + movement[1]))
      legalMovement.push(movement);
  });

  let legalSquares = [];

  legalMovement.forEach((move) => {
    //would prefer to do [x,y] as lists but converting back and forth is a pain
    legalSquares.push([x + move[0], y + move[1]].toString());
  });
  return legalSquares;
}

function legalSquare(x, y) {
  //given x & y coords, is the square in the bounds of an 8x8 board (zero indexed)
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}

function boardAdjacencyList() {
  //for every square on the board, generate an adjacency list for a Knight and all possible moves per board square
  //keys are strings, not lists
  let obj = {};

  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      //array key gets coerced to string, doing a map would probably be worse
      obj[[x, y]] = possibleMoves(x, y);
    }
  }

  return obj;
}

function knightMoves(start, end) {
  //given start and end coordinates, calculate least number of moves and provide the path to get between the coordinates
  //start and end are entered as strings, as in "x,y"
  //uses BFS across a graph
  const graph = boardAdjacencyList();
  // console.log(graph);
  let bfsInfo = [];

  let squares = Object.keys(graph);

  squares.forEach((square) => {
    bfsInfo[square] = { distance: null, predecessor: null };
  });

  // console.log("BFS info:");
  // console.log(bfsInfo);

  bfsInfo[start].distance = 0;

  let queue = [];
  queue.push(start);

  while (queue.length > 0) {
    // console.log("queue start:");
    // console.log(queue);
    // console.log("**here is U**");
    let u = queue.shift();
    // console.log(u);
    for (let i = 0; i < graph[u].length; i++) {
      let v = graph[u][i];
      // console.log("here is v");
      // console.log(v);

      if (bfsInfo[v].distance === null) {
        bfsInfo[v].predecessor = u;
        bfsInfo[v].distance = bfsInfo[u].distance + 1;
        if (v === end) {
          //once the end coord is found, go backwards along the predecessors
          //and log the squares, stopping when we get to the start

          let pred = v;
          let path = "";

          while (pred !== null) {
            path = "[" + pred + "] " + path;
            pred = bfsInfo[pred].predecessor;
            // console.log(path);
          }

          // console.log("found it!");
          // console.log(bfsInfo);
          // console.log(path);
          let moves = bfsInfo[v].distance;

          return (
            "You made it in " +
            moves +
            " moves from [" +
            start +
            "] to [" +
            end +
            "]! Your path was: " +
            path
          );
        } else {
          queue.push(v);
        }
      }
    }
  }
}

console.log(knightMoves("0,0", "5,5"));
