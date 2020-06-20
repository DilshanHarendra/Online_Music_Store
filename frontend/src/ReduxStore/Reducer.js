var HashMap = require('hashmap');

var getLastSong=localStorage.getItem("lastSong");
var pList= new HashMap();
var storedData=JSON.parse(getLastSong);
if (getLastSong!==null){
    pList.set(storedData.name,storedData);
}

const intialState={
    songs:[],
    playList:pList

}




function Reducer(state=intialState,action) {


    switch (action.type) {

        case 'ADD_SONGS':{
        var newList=[...action.newSongs, ...state.songs]
           return {...state,songs :newList}
        }
        case 'ADD_TO_PLAYLIST':{
            let song={
                id:action.newSong._id,
                name: action.newSong.songName,
                singer: action.newSong.artistName,
                cover: global.publicCoverImage+action.newSong.coverImage,
                musicSrc:global.publicSongs+action.newSong.songName,
            }
            var newList=state.playList;
            newList.set(action.newSong.songName,song);

            return {...state,playList :newList}
        }

        default:return state
    }



}export default Reducer;