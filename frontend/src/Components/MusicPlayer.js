import React from "react";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import '../Asserts/css/MusicPlayer.css';
import {connect} from "react-redux";
function MusicPlayer(props){

    const audioList1 = [
        {
            name: 'inhala Punjabi Medley at Y Unplugged Studio   News.mp3',
            singer: 'Sarith surith',
            cover: '//cdn.lijinke.cn/nande.jpg',
            musicSrc: 'http://localhost:3000/Music/Sinhala Punjabi Medley at Y Unplugged Studio   News.mp3',

        },
        {
            name: 'Despacito',
            singer: 'Luis Fonsi',
            cover: 'http://res.cloudinary.com/alick/image/upload/v1502689731/Despacito_uvolhp.jpg',
            musicSrc:'http://res.cloudinary.com/alick/video/upload/v150268968/Luis_Fonsi_-_Despacito_ft._Daddy_Yankee_uyvqw.mp3',


        },
    ]

    return <>
        <div className="container" >
            <div className="row" >
                <div>
                    <hr/>
                    <ReactJkMusicPlayer
                        audioLists={props.playList}
                        defaultVolume={0.1}
                    theme={"light"}
                        autoPlay={false}

                    defaultPosition={{bottom:10,left:10}}
                    />
                </div>
            </div>

        </div>

    </>;

}
const mapStateToProps=state=>({
    playList:state.playlits
});
export default connect(mapStateToProps)(MusicPlayer);