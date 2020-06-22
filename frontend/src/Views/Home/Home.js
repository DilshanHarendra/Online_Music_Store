import React, {Component} from "react";
import {connect} from "react-redux";
import axios from 'axios';
class Home extends Component{


    componentDidMount() {



    }

    render() {
        console.log(this.props.allSongs)
        return <>
        Home
            <h1></h1>
            <button>Click</button>
            {this.props.allSongs.map(song=>(
                <tr>
                    <td>{song.songName}</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td><button className="btn btn-info">Play</button></td>
                </tr>
            ))}
        </>;


    }
}const mapStateToProps=state=>({
    allSongs:state.songs.values(),
    metaData: state.metaData
});



export default connect(mapStateToProps)(Home);