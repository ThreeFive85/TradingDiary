// eslint-disable-next-line import/no-anonymous-default-export
export default (current = [], action) => {
    switch (action.type) {
        case "FETCH_ALL_POI":
            return action.payload;
        
        default:
            return current;
    }
}