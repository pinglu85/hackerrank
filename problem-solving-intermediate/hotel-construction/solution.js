function numberOfWays(roads) {
  const adjacencyList = buildAdjacencyList(roads);

  let ans = 0;

  for (const [from, destinations] of adjacencyList.entries()) {
    const seen = new Set();
    seen.add(from);
    let currLevel = destinations.map((dest) => [dest]);

    while (currLevel.length >= 3) {
      ans += calcWays(currLevel);

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

function calcWays(level) {
  let prevPairCounts =
    level[level.length - 3].length * level[level.length - 2].length +
    level[level.length - 3].length * level[level.length - 1].length +
    level[level.length - 2].length * level[level.length - 1].length;

  let prevLengthSum =
    level[level.length - 3].length +
    level[level.length - 2].length +
    level[level.length - 1].length;

  let tripletsCount =
    level[level.length - 3].length *
    level[level.length - 2].length *
    level[level.length - 1].length;

  for (let i = level.length - 4; i >= 0; i--) {
    const ithCombinationCount = level[i].length * prevPairCounts;
    tripletsCount += ithCombinationCount;
    prevPairCounts += level[i].length * prevLengthSum;
    prevLengthSum += level[i].length;
  }

  return tripletsCount;
}

export default numberOfWays;
