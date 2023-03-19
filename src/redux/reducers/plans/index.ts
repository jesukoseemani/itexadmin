const initialPlanState = {
  plan: {},
};

export const planReducer = (state = initialPlanState, action:any) => {
  switch (action.type) {
    case "SAVE_PLAN": {
      return {
        ...state,
        plan: { ...action.planDetail },
      };
    }
    default: {
      return state;
    }
  }
};

export default planReducer;
