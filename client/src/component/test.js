var permArr = [],
  usedChars = [];

function permute(input) {
  var i, ch;
  for (i = 0; i < input.length; i++) {
    ch = input.splice(i, 1)[0];
    usedChars.push(ch);
    if (input.length == 0) {
      permArr.push(usedChars.slice());
    }
    permute(input);
    input.splice(i, 0, ch);
    usedChars.pop();
  }
  return permArr
};
const users = permute(['A','B','C','D','E','F'])

permArr = []; usedChars = [];
const base = permute([50,10,-20,-40]); 
const plus = [
    [5,5,-5,-5],
    [5,-5,5,-5],
    [5,-5,-5,5],
    [-5,5,5,-5],
    [-5,5,-5,5],
    [-5,-5,5,5]
];

const result = [];
for(let i=0; i<100; i++){
    let order = Math.round(Math.random()*720);
    if(order > 1) order--;
    const selected = users[order];
    let baseOrder = Math.round(Math.random()*24);
    if(baseOrder > 0) baseOrder--;
    let plusOrder = Math.round(Math.random()*6);
    if(plusOrder > 0) plusOrder--;
    
    result.push(
        {
            n1 : selected[0], 
            n2 : selected[1], 
            n3 : selected[2], 
            n4 : selected[3],
            s1 : base[baseOrder][0]+plus[plusOrder][0],
            s2 : base[baseOrder][1]+plus[plusOrder][1],
            s3 : base[baseOrder][2]+plus[plusOrder][2],
            s4 : base[baseOrder][3]+plus[plusOrder][3]
        }
    );
}

result.map((segment,idx) => {
    console.log(idx,segment.n1,segment.n2,segment.n3,segment.n4,"\n",segment.s1,segment.s2,segment.s3,segment.s4);
})

