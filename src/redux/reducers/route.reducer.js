const routeReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_ROUTE':
            return action.payload;
        case 'CLEAR_ROUTE':
            return [];
        case 'SET_DOG_ORDER':
            const dogID = Number(action.payload.draggableId);
            const oldRouteName = action.payload.source.droppableId;
            const newRouteName = action.payload.destination.droppableId;
            const oldRouteArray = state;
            const newRouteArray = state;
            const oldIndex = action.payload.source.index;
            const newIndex = action.payload.destination.index;

            console.log(action.payload);
            console.log(oldRouteName, oldRouteArray,  oldIndex, newIndex);

            //movement in the same route
            if (oldRouteName === newRouteName) {
                console.log('old route same as new');

                const reorderedRoute = Array.from(oldRouteArray); //creates shallow copy of array
                const [dogToReorder] = reorderedRoute.splice(oldIndex, 1); //removes dog from original index
                reorderedRoute.splice(newIndex, 0, dogToReorder); //adds dog to new index
                reorderedRoute.forEach((dog, i) => dog.index = i);
                reorderedRoute.sort((a,b)=>a.index - b.index);
                console.log('reordered', reorderedRoute);
                
                return reorderedRoute ;
            }
        default:
            return state;
    }
}
        
export default routeReducer;