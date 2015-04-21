
var _ = require('underscore');
var assert = require('assert');

function printMatrix(m) {
  // Print the matrix to the console 
  _.each(m,function (x) {
    var result = '';
    _.each(x,function(y) {
      result += ''+y;
    });
    console.log(result);
  });
  console.log('');
}

function emptyMatrix(s) {
  // Return an empty matrix of the same dimensions
  return _.map(s,function(e) {
    return _.map(e,function(f) {
      return 0;
    });
  });
}

function largestSquare(m) {
  var x, y, ranks = emptyMatrix(m);
  var result = { largest: 0, x:null, y: null};

  // Iterate the source matrix in reverse order 
  // finding largest square for each element
  for(y = m.length - 1; y >= 0; y--) {
    for(x = m[y].length - 1; x >= 0; x--) {
      rankElement(m,ranks,x,y);
      if(ranks[y][x] > 0 && ranks[y][x] >= result.largest) {
        result.largest = ranks[y][x];
        result.x = x;
        result.y = y;
      }
    }
  }

  //printMatrix(m);
  //printMatrix(ranks);

  return result;
}

function rankElement(matSrc,matRank,x,y) {
  var elem = function(m1,x1,y1) {
    // Get an element value or return zero if the
    // coordinates are outside of the matrix range
    return ((m1[y1]||[])[x1]||0);
  }

  // Find element values to the right, below 
  // and diagonal to the specified element
  var vRight = elem(matRank,x+1,y);
  var vBelow = elem(matRank,x,y+1);
  var vDiag = elem(matRank,x+1,y+1);

  // Default to the source matrix value
  matRank[y][x] = matSrc[y][x];

  // If the source matrix value is set, check the 
  // surrounding values make a square 
  if(matSrc[y][x] && vRight >= vDiag && vBelow >= vDiag) {
    matRank[y][x] = vDiag + 1;
  }
}

var t0 = [
  [0,0],
  [0,0],
];

var t1 = [
  [0,1],
  [0,0],
];

var t2 = [
  [1,1],
  [1,1],
];

var t3 = [
  [0,1,1],
  [0,1,1],
  [0,1,0],
];

var t4 = [
  [0,1,1,0],
  [0,1,1,1],
  [0,1,1,1],
  [0,1,1,1],
];

var t5 = [
  [0,0,1,0,0],
  [0,1,1,1,1],
  [0,1,1,1,1],
  [0,1,1,1,0],
  [0,1,1,1,1],
];

var t6 = [
  [1,1,1,1,1],
  [1,1,1,1,1],
  [1,1,1,1,1],
  [1,1,1,1,1],
  [1,1,1,1,1],
];

var t7 = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,1,1,0,0,0,0],
  [0,0,0,0,1,1,0,0,0,0],
  [0,0,0,1,1,0,0,0,0,0],
  [0,0,0,1,1,1,1,0,0,0],
  [0,0,0,0,0,1,1,1,0,0],
  [0,0,0,0,0,1,1,1,0,0],
  [0,0,0,0,1,1,1,1,0,0],
  [0,0,0,0,0,0,1,0,0,0],
  [0,0,0,0,0,0,1,0,0,0],
];

assert.deepEqual(largestSquare(t0),{ largest: 0, x: null, y: null });
assert.deepEqual(largestSquare(t1),{ largest: 1, x: 1, y: 0 });
assert.deepEqual(largestSquare(t2),{ largest: 2, x: 0, y: 0 });
assert.deepEqual(largestSquare(t3),{ largest: 2, x: 1, y: 0 });
assert.deepEqual(largestSquare(t4),{ largest: 3, x: 1, y: 1 });
assert.deepEqual(largestSquare(t5),{ largest: 3, x: 1, y: 1 });
assert.deepEqual(largestSquare(t6),{ largest: 5, x: 0, y: 0 });
assert.deepEqual(largestSquare(t7),{ largest: 3, x: 5, y: 5 });

