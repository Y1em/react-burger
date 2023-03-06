import { ACTIVE } from "../actions/app-header";

const InitialState = {
  active: "",
};

const headerReducer = (state = InitialState, action) => {
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

export { headerReducer };
