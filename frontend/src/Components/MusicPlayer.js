import React, {Component, useState} from "react";
import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";
import '../Asserts/css/MusicPlayer.css';
import {connect} from "react-redux";


class MusicPlayer extends Component{
    constructor(props) {
        super(props);
        this.state={
            volume:parseFloat(localStorage.getItem("Volume"))||0.5,
            playList:this.props.playList,
            instance:[]
        }
    }




   saveLastSong(data) {

        let song={
            key:data._id,
            name: data.name,
            singer: data.singer,
            cover: data.cover,
            musicSrc:data.musicSrc,
        }
        localStorage.setItem("lastSong",JSON.stringify(song))

    }

    getInstance(x) {

        this.state.instance=x;
    }


componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            playList:nextProps.playList
        },()=>{
            if (nextProps.playNow){
                var newInstance= this.state.instance;
                setTimeout(()=>{
                    newInstance.play()
                },50)
            }
        })
}




    render() {


    return <>
        <div className="container">
            <div className="row">
                <div>
                    <hr/>
                    <ReactJkMusicPlayer
                        getAudioInstance={instance => this.getInstance(instance)}
                        audioLists={this.state.playList}
                        defaultVolume={this.state.volume}



                        theme={"light"}
                        autoPlay={false}
                        clearPriorAudioLists={true}
                        onAudioVolumeChange={(v) => {
                            localStorage.setItem("Volume", v)
                        }}
                        onAudioPause={(data) => this.saveLastSong(data)}
                        defaultPosition={{bottom: 10, left: 10}}
                    />
                </div>
            </div>

        </div>

    </>;

}
}
const mapStateToProps=state=>{


    return{
        playList:state.playList,
        playNow:state.playNow
    }




};
export default connect(mapStateToProps)(MusicPlayer);