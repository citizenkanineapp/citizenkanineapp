const oAuth2Reducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_AUTH_URL':
            return action.payload;
        default:
            return state;
    }
}

export default oAuth2Reducer;