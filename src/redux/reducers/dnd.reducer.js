import { combineReducers } from 'redux';


const routes = (state = {}, action) => {

    switch(action.type){
        case 'SET_DAILY_ROUTES':
            return action.payload;
            
        case 'MOVE_DOG':
            const dogID = Number(action.payload.draggableId);
            const oldRouteName = action.payload.source.droppableId;
            const newRouteName = action.payload.destination.droppableId;
            const oldRouteArray = state[action.payload.source.droppableId];
            const newRouteArray = state[action.payload.destination.droppableId];
            const oldIndex = action.payload.source.index;
            const newIndex = action.payload.destination.index;
    
            //movement in the same route
            if (oldRouteName === newRouteName){

                const reorderedRoute = Array.from(oldRouteArray); //creates shallow copy of array
                const [dogToReorder] = reorderedRoute.splice(oldIndex, 1); //removes dog from original index
                reorderedRoute.splice(newIndex, 0, dogToReorder); //adds dog to new index

                return {...state, [oldRouteName]: reorderedRoute};
            }


            //movement from one route to another
            if (oldRouteName !== newRouteName){

                const sourceRoute = Array.from(oldRouteArray); //creates shallow copy of array
                const [dogToMove] = sourceRoute.splice(oldIndex, 1); //removes dog from original array

                const destinationRoute = Array.from(newRouteArray); //creates shallow copy of array
                const ammendedDog = {...dogToMove, route: newRouteName} //changes dog's route property to the new route location
                destinationRoute.splice(newIndex, 0, ammendedDog); //adds dog to new array

                return {...state, [oldRouteName]: sourceRoute, [newRouteName]: destinationRoute};
            }
        
        default:
            return state;
    }
}

const dndReducer = combineReducers({
    routes,
});
 
export default dndReducer;
  