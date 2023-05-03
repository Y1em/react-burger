import { ACTIVE } from "../actions/app-header";
import { TAppHeaderActions } from "../actions/app-header";

type TAppHeaderState = {
  active: string;
};

export const InitialState: TAppHeaderState = {
  active: "",
};

export const headerReducer = (
  state: TAppHeaderState = InitialState,
  action: TAppHeaderActions
): TAppHeaderState => {
  switch (action.type) {
    case ACTIVE: {
      return {
        ...state,
        active: action.active,
      };
    }
    default: {
      return state;
    }
  }
};
