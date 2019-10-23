import { of } from "rxjs";
import { map } from "rxjs/operators";
// import * as _ from 'loadsh';
import forOwn from "loadsh";

export interface GenericData {
  id: string | number;
  options?: GenericData[];
}

const levels = ["number", "stair", "floor", "gate"];
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

const recursiveStuff = (data: GenericData[], i = 0) => {
  if (levels.length < i) return;
  console.log("iterando: ", i, levels[i], data);
  i++;

  if (levels.length === i) {
    return data;
  }

  const exit = data.map(d => {
    // console.log(d.options);
    const _group = forOwn.groupBy(d.options, levels[i]);
    const r = toGenericData(_group);
    return {
      id: d.id,
      options: recursiveStuff(r, i)
    };
  });

  return exit;
};


const group = forOwn.groupBy(data, levels[0]);
const r = toGenericData(group);
console.log(recursiveStuff(r, 0));
