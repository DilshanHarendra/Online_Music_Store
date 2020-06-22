import React, {Component} from "react";
import '../../Asserts/css/ShowSongs.css';
import {Card, Form} from "react-bootstrap";
import axios from 'axios';
import {connect} from "react-redux";
import Pagination from '@material-ui/lab/Pagination';
import { Spinner } from 'reactstrap';


class ShowSongs extends Component{

    constructor(props) {
        super(props);
        this.state={
            data:[],
            rows:10,
            currentpg:1,
            showPagination:'block',
            loading:'block'
        }

    }


    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.data!==nextProps.data){
         
            this.setState({
                data:nextProps.data
            })
        }
    }

    componentDidMount() {
        if (this.props.SoungCount===-1){
            this.getSongCount();
        }

        if (this.props.data.length===0){
            this.getDate();
        }else{
            this.checkNeed();
        }
    }

    checkNeed=()=>{
        var need=this.state.rows*this.state.currentpg;
        if (need>this.props.data.length){
                this.getDate();
        }else{
            this.setState({
                loading:'none'

            });
        }
    }


    getSongCount=()=>{
        axios.get(global.backend+'/songs/metadata')
            .then(res=>{
                this.props.addMetaData({...this.props.metaData,SongsCount:res.data.count});
                this.getDate();
            }).catch(err=>console.log(err))
    }

    getDate=()=>{

        var limit=this.state.rows;
        var skip=this.state.rows*(this.state.currentpg-1);

        if (this.props.data.length<this.props.SoungCount){
            axios({method:'GET', url:global.backend+'/songs/addsongs',params:{limit:limit,skip:skip}})
                .then(res=>{
                    this.setState({
                        loading:'none'
                    });
                    this.props.addSongs(res.data);
                })
                .catch(err=>console.log(err));
        }

    }

    addToPlayList=song=>{
        this.props.addPlayList(song);
    }

    playNow=song=>{
        this.props.forceToPlay(song);
    }

    handleChangeRowsPerPages=(x,y)=>{

        this.setState({
            currentpg:y
        },()=> this.checkNeed());
    }
    changeHandlerSearch=e=>{

    }
    changeHandler=e=>{
        this.setState({
            currentpg:1,
            rows:e.target.value
        },()=>  this.checkNeed())
    }
    render() {
        this.state.c=this.state.rows*(this.state.currentpg-1)+1;
        return <>

                <div className="container-fluid">
                    <div className="card mb-4">
                <Card.Header>
                    <h5 className="myTopic">
                        <li className="breadcrumb-item">{this.state.category} Songs</li>
                    </h5>
                </Card.Header>
                    </div>
                </div>
                <Card.Body>
                    <div className="container">
                        <div className="row">
                            <div className="d-flex justify-content-around">
                                <div className="d-flex">
                                    <p className="tableHeadP">Show&nbsp;&nbsp;</p>
                                    <Form.Control as="select" value={this.state.rows} onChange={this.changeHandler}  custom>
                                        <option value={10} >10</option>
                                        <option value={15}>15</option>
                                        <option value={20}>20</option>
                                        <option value={30}>30</option>
                                        <option value={40}>40</option>
                                        <option value={50}>50</option>
                                    </Form.Control>
                                    &nbsp;&nbsp;<p className="tableHeadP">Entries</p>
                                </div>

                                <div className="d-flex">
                                    <p className="tableHeadP">Search</p>&nbsp;&nbsp;
                                    <Form.Control type="text" value={this.state.key} onChange={this.changeHandlerSearch} placeholder="Search..." />

                                </div>
                            </div>

                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th style={{width:'350px'}} >Name</th>
                                        <th>Album</th>
                                        <th>Artist</th>
                                        <th>Category</th>
                                        <th style={{width:'75px'}}>Year</th>

                                        <th style={{width:'90px'}}>Add To PlayList</th>
                                    </tr>
                                </thead>
                                <tbody>

                                {this.state.data.slice(this.state.rows*(this.state.currentpg-1),this.state.rows*this.state.currentpg).map(song=>(
                                        <tr key={song._id} className="songRow">
                                            <td >{this.state.c++}</td>
                                            <td className="name" onClick={()=>this.playNow(song)}>{song.songName}</td>
                                            <td>{song.albumName}</td>
                                            <td>{song.artistName}</td>
                                            <td>{song.albumCategory}</td>
                                            <td>{new Date(song.year).getFullYear()}</td>

                                            <td><button onClick={()=>this.addToPlayList(song)} className="btn btn-warning">Add</button></td>
                                        </tr>
                                    ))}
                                </tbody>



                                </table>


                                <div className="row">

                                    <div className="col-md-6">
                                        <p style={{'margin-top':'5px'}} >Showing {this.state.currentpg} to {Math.ceil(this.props.SoungCount/this.state.rows) } of {this.props.SoungCount} entries</p>
                                    </div>
                                    <div className="col-md-6">
                                        <div style={{display:this.state.showPagination}}>
                                            <Pagination count={Math.ceil(this.props.SoungCount/this.state.rows)} page={this.state.currentpg} onChange={this.handleChangeRowsPerPages} />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card.Body>



        </>;
    }
}
const mapStateToProps=state=> {
    var Songs = state.songs.values();

    return {
        data: Songs,
        SoungCount:state.metaData.SongsCount
    }
};

const mapDispatchToProps =(dispatch)=>{
    return{
        addSongs:(songs)=>{dispatch({type:'ADD_SONGS',newSongs:songs})},
        addPlayList:(song)=>{dispatch({type:'ADD_TO_PLAYLIST',newSong:song})},
        forceToPlay:(song)=>{dispatch({type:'FORCE_TO_PLAY',newSong:song})},
        addMetaData:(metadata)=>{dispatch({type:'UPDATE_METADATA',metaData:metadata})}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ShowSongs);