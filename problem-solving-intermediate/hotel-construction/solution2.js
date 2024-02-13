/**
 *  j ---> 2
 *         |
 *  i ---> 1 - 4
 *         |
 *  k ---> 3
 */
function numberOfWays(roads) {
  const n = roads.length + 2;
  const adjacencyList = buildAdjacencyList(roads);
  const distances = Array.from({ length: n }, () => new Array(n).fill(0));

  for (let i = 1; i < n; i++) {
    bfs(adjacencyList, distances, i);
  }

  let ans = 0;

  for (let i = 1; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = j + 1; k < n; k++) {
        if (
          distances[i][j] === distances[i][k] &&
          distances[i][j] === distances[j][k]
        ) {
          ans++;
        }
      }
    }
  }

  return ans;
}

function bfs(adjacencyList, distances, start) {
  let queue = [start];
  const visited = new Array(adjacencyList.length).fill(false);
  visited[start] = true;

  let distance = 0;

  while (queue.length > 0) {
    distance++;

    const newQueue = [];

    for (const from of queue) {
      for (const to of adjacencyList[from]) {
        if (!visited[to]) {
          distances[start][to] = distance;
          distances[to][start] = distance;
          visited[to] = true;
          newQueue.push(to);
        }
      }
    }

    queue = newQueue;
  }
}

function buildAdjacencyList(roads) {
  const n = roads.length + 2;
  const adjacencyList = Array.from({ length: n }, () => []);

  for (const [from, to] of roads) {
    adjacencyList[from].push(to);
    adjacencyList[to].push(from);
  }

  return adjacencyList;
}

export default numberOfWays;
