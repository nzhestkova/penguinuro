import { createAction } from "@ngrx/store";

const ACTIVATE_WAIT = "[Waiting] activate";
const DEACTIVATE_WAIT = "[Waiting] deactivate";

export const activateWait = createAction(ACTIVATE_WAIT);
export const deactivateWait = createAction(DEACTIVATE_WAIT);
