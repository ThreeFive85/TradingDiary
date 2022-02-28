// eslint-disable-next-line import/no-anonymous-default-export
export default (points = [], action) => {
    switch (action.type) {
        case "FETCH_ALL_POI":
            return action.payload;
        case "UPDATE_POINT":
            return points.map((post) => post.day === action.payload.day ? action.payload : post);
        default:
            return points;
    }
}