import { of } from "rxjs";
import { map } from "rxjs/operators";
// import * as _ from 'loadsh';
import forOwn from "loadsh";

export interface GenericData {
  id: string | number;
  options?: GenericData[];
}

const levels = ["number", "satir", "floor", "gate"];
const data = [
  { number: "n1", stair: "s1", floor: "f1", gate: "ga" },
  { number: "n1", stair: "s1", floor: "f1", gate: "gb" },
  { number: "n1", stair: "s1", floor: "f2", gate: "ga" },
  { number: "n1", stair: "s1", floor: "f2", gate: "gb" },

  { number: "n2", stair: "s1", floor: "f1", gate: "ga" },
  { number: "n2", stair: "s1", floor: "f1", gate: "gb" },
  { number: "n2", stair: "s1", floor: "f2", gate: "ga" },
  { number: "n2", stair: "s1", floor: "f2", gate: "gb" }
];

const toGenericData = (data: any[]): GenericData[] => {
  return forOwn.toPairs(data).map(value => {
    return { id: value[0], options: value[1] };
  });
};

// console.log( toGenericData(
//   forOwn.groupBy(data, "number")
// ));

const recursiveStuff = (data: GenericData[], i = 0) => {
  console.log("iterando: ", i, levels[i], data);
  if (levels.length < i) return;
  i++;

  return data.map( d => {
    return {
      ...d,
      options: recursiveStuff(toGenericData(d.options), i)
    };
  })
 
};

let ii = 0;
const group = forOwn.groupBy(data, levels[ii]);
const r = toGenericData(group);
console.log( 
  recursiveStuff(r, ii++)
);
