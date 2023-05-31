import { cheDepNew, cheDepOld } from "./chemical";
import { ceDeptNew, ceDeptOld } from "./civil";
import { eeDeptNew, eeDeptOld } from "./electrical";
import { eceDepNew, eceDepOld } from "./electronics";
import { meDepNew, meDepOld } from "./mechanical";
import { pkgeDepNew, pkgeDepOld } from "./packaging";
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
  Chemical: {
    1: cheDepOld,
    2: cheDepNew,
  },
  Packaging: {
    1: pkgeDepOld,
    2: pkgeDepNew,
  },
  Electrical: {
    1: eeDeptOld,
    2: eeDeptNew,
  },
};
