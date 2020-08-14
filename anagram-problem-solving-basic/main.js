function anagram(dictionary, query) {
  // Initiate a hash table to store sorted strings for lookup
  const hashTable = {};
  // Initiate an empty array to store sorted strings for final result
  const sortedQuery = [];
  // Loop through query
  // O (n * m)
  for (let i = 0; i < query.length; i++) {
    // Sort string
    const sortedQ = query[i]
      .split('')
      .sort((a, b) => {
        return a < b ? -1 : a > b ? 1 : 0;
      })
      .join('');
    // Add the sorted string as key and 0 as value to the hash table
    hashTable[sortedQ] = 0;
    // Add the sorted string to the array
    sortedQuery.push(sortedQ);
  }

  // Loop through dictionary
  // O (n * m)
  for (let i = 0; i < dictionary.length; i++) {
    // Sort string
    const sortedD = dictionary[i]
      .split('')
      .sort((a, b) => {
        return a < b ? -1 : a > b ? 1 : 0;
      })
      .join('');
    // Look up the sorted string in the hash table, if find, its value plus 1
    if (hashTable[sortedD] !== undefined) {
      hashTable[sortedD]++;
    }
  }

  // Loop through the sortedQuery array.
  // Map the value from the hash table to the array.
  return sortedQuery.map((sorted) => hashTable[sorted]);
}

module.exports = anagram;
