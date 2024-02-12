const accumulate = ([_, ...array]) => array.filter(v => !v.every(Number.isInteger)).flatMap(({ 1: p, 2: c, 0: a }) => [a ** p,c]).reduce((a, b) => a + b);

const result = accumulate([
    [100, 0.5, 0],
    [169, 0.5, -2],
    [100, 0, 9],
    [9, 2, 9],

]);

console.log(result);