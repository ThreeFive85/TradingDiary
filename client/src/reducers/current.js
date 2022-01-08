// eslint-disable-next-line import/no-anonymous-default-export
export default (current = [], action) => {
    switch (action.type) {
        // case DELETE:
        //     return posts.filter((post) => post._id !== action.payload);
        // case "UPDATE_CUR":
        //     return current.map((post) => post);
        case "FETCH_ALL_CUR":
            return action.payload;
        // case "CREATE_CUR":
        //     return [...current, action.payload];
        default:
            return current;
    }
}