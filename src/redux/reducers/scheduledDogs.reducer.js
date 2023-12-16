const scheduledDogs = (state = {}, action) => {
  switch (action.type) {
    case 'DOGS_SCHEDULE_COUNT':
      console.log('in reducer', action.payload)
      return action.payload;
      default:
        return state;
    }
}

export default scheduledDogs;