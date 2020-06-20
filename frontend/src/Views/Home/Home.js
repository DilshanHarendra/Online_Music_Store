import React, {Component} from "react";
import {connect} from "react-redux";

class Home extends Component{



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
    allSongs:state.songs,
});
export default connect(mapStateToProps)(Home);