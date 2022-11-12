import { combineReducers } from 'redux';


const employees = (state=[], action)=> {
    switch (action.type){
        case 'SET_EMPLOYEES':
            return action.payload;
        default:
            return state;
    }
}
const selectedEmployee = (state={}, action)=> {
    switch (action.type){
        case 'SET_EMPLOYEE':
            return action.payload;
        // case 'UPDATE_EMP_FIRST_NAME':
        //     return {...state, first_name: action.payload};
        // case 'UPDATE_EMP_LAST_NAME':
        //     return {...state, last_name: action.payload};
        // case 'UPDATE_EMP_STREET':
        //     return {...state, street: action.payload};
        // case 'UPDATE_EMP_CITY':
        //     return {...state, city: action.payload};
        // case 'UPDATE_EMP_ZIP':
        //     return {...state, zip: action.payload};
        // case 'UPDATE_EMP_EMAIL':
        //     return {...state, email: action.payload};
        // case 'UPDATE_EMP_PHONE':
        //     return {...state, phone: action.payload};
        default:
            return state;
    }
}

const oddEmpSchedules = (state=[], action)=> {
    switch (action.type){
        case 'SET_EMP_SCHEDULE_ODD':
            return action.payload;
        default:
            return state;
    }
}

const evenEmpSchedules = (state=[], action)=> {
    switch (action.type){
        case 'SET_EMP_SCHEDULE_EVEN':
            return action.payload;
        default:
            return state;
    }
}

const selectedEmpSchedule = (state=[], action)=>{
    switch (action.type){
        case 'SET_EMPLOYEE_SCHEDULE':
            return action.payload;
        case 'UPDATE_EMP_FIRST_NAME':
            return {...state, first_name: action.payload};
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

const employeesReducer = combineReducers({
    employees,
    selectedEmployee,
    oddEmpSchedules,
    evenEmpSchedules,
    selectedEmpSchedule,
    editEmpDetails,
    editEmpSchedule1,
    
})

export default employeesReducer;