const clientReducer = (state = {first_name: '', last_name:'', email: '', phone: '', street: '', 
city: '', zip: '', notes: '', vet_name: '', vet_phone: '', route_id: ''}, action) => {
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
        case 'ADD_STREET':
            return {...state, street: action.payload};
        case 'ADD_CITY':
            return {...state, city: action.payload};
        case 'ADD_ZIPCODE':
            return {...state, zip: action.payload};
        case 'ADD_NOTES':
            return {...state, notes: action.payload};
        case 'ADD_VET_NAME':
            return {...state, vet_name: action.payload};
        case 'ADD_VET_PHONE':
            return {...state, vet_phone: action.payload};
        case 'ADD_ROUTE':
            return {...state, route_id: action.payload};
        case 'CHANGE_ROUTE':
            return {...state, route_name: action.payload};
        case 'ADD_DOGS':
            return {...state, dogs: action.payload};
        case 'ADD_ONE_DOG':
            return{...state, newDog: action.payload}
        case 'ADD_SCHEDULE':
            return {...state, schedule: action.payload}
        case 'CLEAR_CLIENT':
            return state;
        default:
            return state;
    }
}

export default clientReducer;