const hashMap = require("hashmap");

var getLastSong=localStorage.getItem("lastSong");
var storedData=[];
if (getLastSong!==null){
   storedData=[JSON.parse(getLastSong)];
}



const intialState={
    songs:new hashMap(),
    playList:storedData,
    metaData:{SongsCount:-1},
    playNow:false


}




function Reducer(state=intialState,action) {


    switch (action.type) {

        case 'ADD_SONGS':{
        var newList=state.songs;
        action.newSongs.forEach(song=>{
           newList.set(song.songName,song)
        });
        return {...state,songs :newList}
        }


        case 'ADD_TO_PLAYLIST':{
            let song={
                key:action.newSong._id,
                name: action.newSong.songName,
                singer: action.newSong.artistName,
                cover: global.publicCoverImage+action.newSong.coverImage,
                musicSrc:global.publicSongs+action.newSong.songName,
            }
            return {...state,playList :[...state.playList,song],playNow:false}
        }
        case 'FORCE_TO_PLAY':{
            let song={
                key:action.newSong._id,
                name: action.newSong.songName,
                singer: action.newSong.artistName,
                cover: global.publicCoverImage+action.newSong.coverImage,
                musicSrc:global.publicSongs+action.newSong.songName,
            }
            return {...state,playList :[song],playNow:true}
        }

        case 'UPDATE_METADATA':{
            return {...state,metaData :action.metaData}
        }


        default:return state
    }



}export default Reducer;