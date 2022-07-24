// Let N be the length of `dictionary`,  K be the maximum length of a string in `dictionary`,
// M be the length of `query`,  and J be the maximum length of a string in `query`.
//
// Time: O(N * K * log(K) + M * J * log(J)).
//
// Space: O(max(N, M)) or O(max(N, log(M))), depending on the implementation of the sorting
// algorithm.
function stringAnagram(dictionary, query) {
  const hashTable = new Map();

  for (const word of dictionary) {
    const sortedWord = word.split('').sort().join('');
    hashTable.set(sortedWord, (hashTable.get(sortedWord) ?? 0) + 1);
  }

  const ans = [];

  for (let i = 0; i < query.length; i++) {
    const sortedWord = query[i].split('').sort().join('');
    ans[i] = hashTable.get(sortedWord) ?? 0;
  }

  return ans;
}

export default stringAnagram;
