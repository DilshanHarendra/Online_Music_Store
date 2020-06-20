import React from "react";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import '../Asserts/css/MusicPlayer.css';
import {connect} from "react-redux";
function MusicPlayer(props){
    var volume=parseFloat(localStorage.getItem("Volume"))||0.1;

function saveLastSong(data) {

    localStorage.setItem("lastSong",JSON.stringify(data))

}



    return <>
        <div className="container" >
            <div className="row" >
                <div>
                    <hr/>
                    <ReactJkMusicPlayer
                        audioLists={props.playList}
                        defaultVolume={volume}
                        theme={"light"}
                        autoPlay={false}

                        onAudioVolumeChange={(v)=>{localStorage.setItem("Volume",v)}}
                        onAudioPause={(data)=>saveLastSong(data)}
                    defaultPosition={{bottom:10,left:10}}
                    />
                </div>
            </div>

        </div>

    </>;

}
const mapStateToProps=state=>({
    playList:state.playList.values()
});
export default connect(mapStateToProps)(MusicPlayer);