const clientReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_CLIENT': // switch to client to add later?
            return action.payload;
        case 'ADD_FIRST_NAME':
            return {...state, first_name: action.payload};
        case 'ADD_LAST_NAME':
            return {...state, last_name: action.payload};
        case 'ADD_EMAIL':
            return {...state, email: action.payload};
        case 'ADD_PHONE':
            return {...state, phone: action.payload};
        case 'ADD_ADDRESS':
            return {...state, address: action.payload};
        case 'ADD_NOTES':
            return {...state, notes: action.payload};
        case 'ADD_VET_NAME':
            return {...state, vet_name: action.payload};
        case 'ADD_VET_PHONE':
            return {...state, vet_phone: action.payload};
        case 'ADD_ROUTE':
            return {...state, route: action.payload};
        // case 'ADD_DOGS':
        //     return {...state, dogs: [...state.dogs, action.payload]};
        case 'ADD_DOGS':
            return {...state, dogs: action.payload};
        case 'ADD_SCHEDULE':
            return {...state, schedule:[action.payload]}
        case 'CLEAR_CLIENT':
            return {};
        default:
            return state;
    }
}

export default clientReducer;