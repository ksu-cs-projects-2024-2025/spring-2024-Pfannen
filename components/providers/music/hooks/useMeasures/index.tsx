import { useState } from "react";
import { Measure } from "../../types";
import { MeasureFetcher, MeasureModifier } from "./utils";

const useMeasures = (initialMeasures?: Measure[]) => {
  const [measures, setMeasures] = useState<Measure[]>(initialMeasures || []);

  const invokeMeasureModifier = (del: ReturnType<MeasureModifier<any>>) => {
    setMeasures((prevState) => {
      const copyState = [...prevState];
      const getMeasures: MeasureFetcher = (index, count) => {
        if (index === undefined || !count) {
          return copyState;
        }
        const copiedMeasures = [];
        for (let i = 0; i < count; i++) {
          const copyMeasure = {
            notes: [...copyState[i + index].notes],
          };
          copyState[i + index] = copyMeasure;
          copiedMeasures.push(copyMeasure);
        }
        return copiedMeasures;
      };

      del(getMeasures);
      return copyState;
    });
  };

  const getMeasures = (index: number, count: number) => {
    return measures.slice(index, index + count);
  };
  return { measures, invokeMeasureModifier, getMeasures };
};

useMeasures.initialState = {
  measures: [],
  invokeMeasureModifier: () => {},
  getMeasures: () => [],
};

export default useMeasures;
