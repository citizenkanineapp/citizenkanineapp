import { combineReducers } from 'redux';

const selectedEmployee = (state={}, action)=> {
    switch (action.type){
        case 'SET_EMPLOYEE':
            return action.payload;
        default:
            return state;
    }
}

const selectedEmpSchedule = (state=[], action)=>{
    switch (action.type){
        case 'SET_EMPLOYEE_SCHEDULE':
            return action.payload;
        default: 
            return state;
    }
}

const editEmpDetails=(state={}, action)=>{
    switch (action.type){
        case 'SET_EDIT_EMP_DETAILS':
            return action.payload;
        case 'UPDATE_EMP_FIRST_NAME':
            return {...state, first_name: action.payload};
        case 'UPDATE_EMP_LAST_NAME':
            return {...state, last_name: action.payload};
        case 'UPDATE_EMP_STREET':
            return {...state, street: action.payload};
        case 'UPDATE_EMP_CITY':
            return {...state, city: action.payload};
        case 'UPDATE_EMP_ZIP':
            return {...state, zip: action.payload};
        case 'UPDATE_EMP_EMAIL':
            return {...state, email: action.payload};
        case 'UPDATE_EMP_PHONE':
            return {...state, phone: action.payload};
        default:
            return state;
    }
}

const editEmpSchedule1 = (state={}, action)=>{
    switch (action.type){
        case 'SET_EDIT_EMP_SCHEDULE1':
            return action.payload;
        case 'UPDATE_EMP_SCHEDULE1':
            const day = action.payload.day;
            const change = action.payload.change;
            return {...state, [day]: change}
        default:
            return state;
    }
}

const editEmpSchedule2 = (state={}, action)=>{
    switch (action.type){
        case 'SET_EDIT_EMP_SCHEDULE2':
            return action.payload;
        case 'UPDATE_EMP_SCHEDULE2':
            const day = action.payload.day;
            const change = action.payload.change;
            return {...state, [day]: change}
        default:
            return state;
    }
}

const selectedEmployeeReducer = combineReducers({
    selectedEmployee,
    selectedEmpSchedule,
    editEmpDetails,
    editEmpSchedule1,
    editEmpSchedule2,
})

export default selectedEmployeeReducer;