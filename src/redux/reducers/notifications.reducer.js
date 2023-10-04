const notificationsReducer = (state = '', action) => {
  switch (action.type) {
      case 'SET_USER_NOTIFICATION_STATUS':
          return action.payload;
      default:
          return state;
  }
}

export default notificationsReducer