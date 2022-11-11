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
            return action.payload
        default:
            return state;
    }
}

const empSchedules = (state=[], action)=> {
    switch (action.type){
        case 'SET_EMP_SCHEDULE':
            return action.payload;
        default:
            return state;
    }
}

const employeesReducer = combineReducers({
    employees,
    selectedEmployee,
    empSchedules,
})

export default employeesReducer;