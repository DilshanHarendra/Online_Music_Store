import React, {Component} from "react";
import '../../Asserts/css/ShowSongs.css';
import {Card, Form} from "react-bootstrap";
import axios from 'axios';
import {connect} from "react-redux";
import Pagination from '@material-ui/lab/Pagination';


class ShowSongs extends Component{

    constructor(props) {
        super(props);
        this.state={
            data:[],
            rows:10,
            cpg:1,
            c:1,
            showPagination:'block'
        }

    }

    componentDidMount() {
    this.getDate();
    }

    getDate=()=>{
        axios.get(global.backend+'/songs/addsongs')
            .then(res=>{
                this.setState({
                    data:res.data
                })
                this.props.addSongs(res.data);
            })
            .catch(err=>console.log(err));
    }

    addToPlayList=song=>{
        this.props.addPlayList(song);
    }

    handleChangeRowsPerPages=(x,y)=>{

        this.setState({
            cpg:y
        })
    }

    changeHandler=e=>{
        this.setState({
            cpg:1,
            rows:e.target.value
        })
    }
    render() {

        return <>

                <div className="container-fluid">
                    <div className="card mb-4">
                <Card.Header>
                    <h5 className="myTopic">
                        <li className="breadcrumb-item">{this.state.category} Donars</li>
                    </h5>
                </Card.Header>
                    </div>
                </div>
                <Card.Body>
                    <div className="container">
                        <div className="row">
                            <div className="d-flex justify-content-around">
                                <div className="d-flex myheder">
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
                                        <th>Name</th>
                                        <th>Album</th>
                                        <th>Artist</th>
                                        <th>Category</th>
                                        <th>Year</th>
                                        <th>Play</th>
                                        <th>Add To PlayList</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.data.map(song=>(
                                        <tr>
                                            <td>{song.songName}</td>
                                            <td>{song.albumName}</td>
                                            <td>{song.artistName}</td>
                                            <td>{song.albumCategory}</td>
                                            <td>{new Date(song.year).getFullYear()}</td>
                                            <td><button className="btn btn-info">Play</button></td>
                                            <td><button onClick={()=>this.addToPlayList(song)} className="btn btn-warning">Add To PlayList</button></td>
                                        </tr>
                                    ))}
                                </tbody>



                                </table>


                                <div className="row">

                                    <div className="col-md-6">
                                        <p style={{'margin-top':'5px'}} >Showing {this.state.cpg} to {Math.ceil(this.state.data.length/this.state.rows) } of {this.state.data.length} entries</p>
                                    </div>
                                    <div className="col-md-6">
                                        <div style={{display:this.state.showPagination}}>
                                            <Pagination count={Math.ceil(this.state.data.length/this.state.rows)} page={this.state.cpg} onChange={this.handleChangeRowsPerPages} />
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
const mapStateToProps=state=>({

});

const mapDispatchToProps =(dispatch)=>{
    return{
        addSongs:(songs)=>{dispatch({type:'ADD_SONGS',newSongs:songs})},
        addPlayList:(song)=>{dispatch({type:'ADD_TO_PLAYLIST',newSong:song})}

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ShowSongs);