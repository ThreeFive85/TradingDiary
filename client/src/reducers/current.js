// eslint-disable-next-line import/no-anonymous-default-export
export default (current = [], action) => {
    switch (action.type) {
        case "DELETE":
            return current.filter((post) => post.NAME !== action.payload);
        case "UPDATE_CUR":
            // console.log('current : ', current)
            return current.map((post) => post.NAME === action.payload.NAME ? action.payload : post);
        case "FETCH_ALL_CUR":
            return action.payload;
        case "CREATE_CUR":
            return [...current, action.payload];
        default:
            return current;
    }
}