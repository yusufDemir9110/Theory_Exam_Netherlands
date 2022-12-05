export default (state, action) => {
  switch (action.type) {
    case "CHANGE_LANGUAGE":
      return {
        ...state,
        language: action.payload,
      };
    default:
      return { ...state };
  }
};
