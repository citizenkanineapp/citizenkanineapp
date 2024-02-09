const scheduledDogs = (state = {}, action) => {
  switch (action.type) {
    case 'DOGS_SCHEDULE_COUNT':
      return action.payload;
    case 'CLEAR_DOG_SCHEDULE_COUNT':
      console.log('clearing')
      return '';
    default:
      return state;
    }
}

export default scheduledDogs;