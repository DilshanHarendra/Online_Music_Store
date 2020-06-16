const intialState={
    count:42,
    username:localStorage.getItem("username"),
    userType:localStorage.getItem("type"),
    playlits:[]

}



function Reducer(state=intialState,action) {

    switch (action.type) {
        case 'Increment': return {count:state.count+1 };
        case 'ChangePlayList':return {playlits:action.playList}
        default :return state;
    }


}export default Reducer;