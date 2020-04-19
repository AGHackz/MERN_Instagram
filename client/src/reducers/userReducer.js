export const userInitialState = null;
export const userReducer = (state = userInitialState, action) => {
    switch (action.type) {
        case 'USER':
            return action.payload;
        case 'LOGOUT':
            return null;
        default:
            return state
    }
};