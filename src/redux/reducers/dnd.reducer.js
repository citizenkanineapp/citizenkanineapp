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

            console.log(oldIndex, newIndex);

            const dogToMove = oldRouteArray.find(dog => dog.id === dogID); //dog that moves
            
            console.log(oldRouteArray, newRouteArray, dogToMove);
        
            // const oldRouteMinusDog = newState[oldRoute].filter(dog => dog.id !== dogID); //old route without moveddog
            // console.log(newRoute);
            // console.log(dogToMove);
            //movement in the same route

            if (oldRouteName === newRouteName){

                const reorderedRoute = Array.from(oldRouteArray);
                const [dogToReorder] = reorderedRoute.splice(oldIndex, 1);
                reorderedRoute.splice(newIndex, 0, dogToReorder);

                return {...state, [oldRouteName]: reorderedRoute};
            }
            //movement from one route to another
            // if (oldRoute !== newRoute){
            // const dogWithNewRoute = {...dogToMove, route: newRoute} //changes dog's route property to the new route
            // const newRouteWithAddedDog = newState[newRoute].splice(newIndex, 0, dogWithNewRoute);

            // console.log(newState[newRoute]);
            // const newnewState = {...newState, [oldRoute]: oldRouteMinusDog, [newRoute]: newRouteWithAddedDog};
            // return newState;
            //}
        
        default:
            return state;
    }
}

const dndReducer = combineReducers({
    routes,
});
 
export default dndReducer;
  