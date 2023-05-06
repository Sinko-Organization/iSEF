import { ceDeptNew, ceDeptOld } from "./civil";
import { eceDepNew, eceDepOld } from "./electronics";
import { meDepNew, meDepOld } from "./mechanical";
import { seDepNew, seDeptOld } from "./software";
import type { Dependencies } from "./types";

export const engineeringDependencies: Dependencies = {
  Civil: {
    1: ceDeptOld,
    2: ceDeptNew,
  },
  Electronics: {
    1: eceDepOld,
    2: eceDepNew,
  },
  Mechanical: {
    1: meDepOld,
    2: meDepNew,
  },
  Software: {
    1: seDeptOld,
    2: seDepNew,
  },
};
