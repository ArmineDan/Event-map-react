const get_events = (state = [], action) => {
    if(action.type === 'GET_EVETS_LISTS'){
        state = [...action.payload];
        return state;
    }
    if(action.type === 'RESET_EVETS_LISTS'){
        state = [];
        return state;
    }
    return state;

};

export {get_events}
