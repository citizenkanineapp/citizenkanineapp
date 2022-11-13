import { combineReducers } from 'redux';


const employees = (state=[], action)=> {
    switch (action.type){
        case 'SET_EMPLOYEES':
            return action.payload;
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





const allEmployeesReducer = combineReducers({
    employees,
    oddEmpSchedules,
    evenEmpSchedules,
})

export default allEmployeesReducer;