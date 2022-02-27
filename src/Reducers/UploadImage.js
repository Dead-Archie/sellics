
const uploadImage = (state = {}, action) => {
    const { payload } = action;
    switch(action.type){
        case 'IMAGELIST' : return  false;
        case 'UPLODAIMAGE' : return {
            ...state,
            ...payload
        }
        default: return state;
    }
    
}

export default uploadImage;