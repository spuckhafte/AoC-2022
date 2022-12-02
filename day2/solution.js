import raw_input from './input.js';

/* 
a,x- rock 
b,y- paper 
c,z- scis
*/

let rpsInput = cook(raw_input);

console.log(partOne(rpsInput));
console.log(partTwo(rpsInput));

function partOne(rpsData) {
  let score = 0;
  for (let chunk of rpsData) {
      
      // chunk = [ opponent's move (a|b|c) , my move (x|y|z) ]
    
      let status;
      if (chunk[0] == 'a' && chunk[1] == 'x' || chunk[0] == 'b' && chunk[1] == 'y' || chunk[0] == 'c' && chunk[1] == 'z') {
          status = 't';
      }  
      else if(chunk[1] == 'x' && chunk[0] == 'c' || chunk[1] == 'z' && chunk[0] == 'b' || chunk[1] == 'y' && chunk[0] == 'a') {
          status = 'w'
      } else {
        status = 'l'
      }

      let myResponse = chunk[1]
      score += (getScore(myResponse) + getScore(status))
  }
  return score;
}

function partTwo(rpsData) {
  let score = 0;
  for (let chunk of rpsData) {
      
      // chunk = [ opponent's move (a|b|c) , my move (x|y|z) ]
    
      let status;
      let myMoveBasedOnStatus;

      if (chunk[1] == 'x') status = 'l';
      if (chunk[1] == 'y') status = 't';
      if (chunk[1] == 'z') status = 'w';

      if (chunk[1] == 'y') myMoveBasedOnStatus = chunk[0];
      if (chunk[1] == 'x') {
          if (chunk[0] == 'a') myMoveBasedOnStatus = 'c';
          if (chunk[0] == 'b') myMoveBasedOnStatus = 'a';
          if (chunk[0] == 'c') myMoveBasedOnStatus = 'b';
      };
      if (chunk[1] == 'z') {
          if (chunk[0] == 'a') myMoveBasedOnStatus = 'b';
          if (chunk[0] == 'b') myMoveBasedOnStatus = 'c';
          if (chunk[0] == 'c') myMoveBasedOnStatus = 'a';
      };

      score += (getScore(status) + getScore(myMoveBasedOnStatus));
  }
  return score;
}

function getScore(query) {
  let scoreIndex = {
        'a': 1, 'b': 2, 'c': 3,
        'x': 1, 'y': 2, 'z': 3,
        't': 3, 'w': 6, 'l': 0
   };
  return scoreIndex[query];
};

function cook(raw) {
  return raw.split('\n').map(halfRaw => halfRaw.toLowerCase().split(' '))
}
