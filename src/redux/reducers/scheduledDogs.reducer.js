const scheduledDogs = (state = {}, action) => {
  switch (action.type) {
    case 'DOGS_SCHEDULE_COUNT':
      return action.payload;
      default:
        return state;
    }
}

export default scheduledDogs;