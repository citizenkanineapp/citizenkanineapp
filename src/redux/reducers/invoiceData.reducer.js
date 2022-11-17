const invoiceReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_INVOICE_DATA':
            return action.payload;
        default:
            return state;
    }
}

export default invoiceReducer;