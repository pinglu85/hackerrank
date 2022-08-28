function numberOfWays(roads) {
  const adjacencyList = buildAdjacencyList(roads);

  let ans = 0;

  // Loop through all the nodes in the graph. For each node that has more
  // than three child nodes, start a level by level traversal.
  // At each level, calculate the number of combinations of triplets that
  // the current level can form. To handle the case where a child node have
  // more than one child node, group the child nodes sharing the same parent.
  // In other words, use a 2D array `currLevel` to hold the current level to
  // explore, where each subarray contains the nodes that have the same parent.
  // The traversal stops when the length of the `currLevel` is less than `3`.
  // The `demonstration.png` illustrates the above process.
  for (const [from, destinations] of adjacencyList.entries()) {
    const seen = new Set();
    seen.add(from);
    let currLevel = destinations.map((dest) => [dest]);

    while (currLevel.length >= 3) {
      ans += calcTripletCount(currLevel);

      let nextLevel = [];
      for (const nodes of currLevel) {
        const children = [];

        for (const node of nodes) {
          const dest = adjacencyList.get(node);

          for (const d of dest) {
            if (!seen.has(d)) children.push(d);
          }

          seen.add(node);
        }

        if (children.length > 0) nextLevel.push(children);
      }

      currLevel = nextLevel;
    }
  }

  return ans;
}

function buildAdjacencyList(roads) {
  const adjacencyList = new Map();

  for (const [from, to] of roads) {
    addEdge(adjacencyList, from, to);
    addEdge(adjacencyList, to, from);
  }

  return adjacencyList;
}

function addEdge(adjacencyList, from, to) {
  if (!adjacencyList.has(from)) {
    adjacencyList.set(from, []);
  }

  adjacencyList.get(from).push(to);
}

function calcTripletCount(level) {
  let prevPairCounts =
    level[level.length - 3].length * level[level.length - 2].length +
    level[level.length - 3].length * level[level.length - 1].length +
    level[level.length - 2].length * level[level.length - 1].length;

  let prevLengthSum =
    level[level.length - 3].length +
    level[level.length - 2].length +
    level[level.length - 1].length;

  let tripletCount =
    level[level.length - 3].length *
    level[level.length - 2].length *
    level[level.length - 1].length;

  for (let i = level.length - 4; i >= 0; i--) {
    const ithCombinationCount = level[i].length * prevPairCounts;
    tripletCount += ithCombinationCount;
    prevPairCounts += level[i].length * prevLengthSum;
    prevLengthSum += level[i].length;
  }

  return tripletCount;
}

export default numberOfWays;
