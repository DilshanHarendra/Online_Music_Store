import React, {Component} from "react";
import {Button, Card, Form} from "react-bootstrap";
import axios from 'axios';


import '../../Asserts/css/AddNewSongs.css';
import UploadDopZone from "./UploadDopZone";
import Dropzone from "react-dropzone";
class AddNewSong extends Component{

    constructor(props) {
        super(props);
        this.state={
            album:'',
            artist:'',
            category:'',
            files:[],
            fileCount:0,
            isValidate:false
        }
    }

    onChange=e=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    addFile=file=>{
        this.setState({
            files:[...file,...this.state.files],
            fileCount:file.length
        },()=>console.log(this.state.files))
    }
    onSubmit=(e)=>{
        e.preventDefault();
       if (this.state.album===''|| this.state.artist===''||this.state.category===''||this.state.files===''){
           this.setState({
               isValidate:true
           })
       }else{
           this.setState({
               isValidate:false
           });
           const songs = new FormData;
           songs.append('songs',this.state.files)
            axios.post(global.backend+'/songs/uploadsongs',songs)
                .then(res=>console.log(res))
                .catch(err=>console.log(err))


       }
    }


    render() {
        return <>
            <div className="container">

                    <Card border="primary" >
                        <Card.Header>
                                <h1>Add New Songs</h1>
                            </Card.Header>
                            <Card.Body>
                                <Form noValidate validated={this.state.isValidate} onSubmit={this.onSubmit}  >
                                    <div className="row" >
                                    <div className="col-md-5 text-center " >
                                        <div className="box1">



                                        <div className="input-field">
                                            <label htmlFor="album">Album<span className="text-danger">*</span></label>
                                            <Form.Control
                                                type="text"
                                                className="validate"
                                                aria-describedby="inputGroupPrepend"
                                                required
                                                name="album"
                                                id="album"
                                                value={this.state.album}
                                                onChange={this.onChange}
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                Please Enter Album.
                                            </Form.Control.Feedback>
                                        </div>




                                        <div className="input-field">
                                            <label htmlFor="artist">Artist <span className="text-danger">*</span></label>
                                            <Form.Control
                                                type="text"
                                                className="validate"
                                                aria-describedby="inputGroupPrepend"
                                                required
                                                name="artist"
                                                id="artist"
                                                value={this.state.artist}
                                                onChange={this.onChange}
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                Please Enter Artist.
                                            </Form.Control.Feedback>
                                        </div>



                                        <div className="input-field">
                                            <label htmlFor="category">Category <span className="text-danger">*</span></label>
                                            <Form.Control
                                                type="text"
                                                className="validate"
                                                aria-describedby="inputGroupPrepend"
                                                required
                                                name="category"
                                                id="category"
                                                value={this.state.category}
                                                onChange={this.onChange}
                                            />

                                            <Form.Control.Feedback type="invalid">
                                                Please Enter Category.
                                            </Form.Control.Feedback>
                                        </div>

                                        </div>
                                    </div>
                                        <div className="col-md-7">

                                            <Dropzone
                                                onDrop={this.addFile}
                                                className="dropArea"
                                            >
                                                {({getRootProps, getInputProps}) => (
                                                    <div {...getRootProps()}>
                                                        <input {...getInputProps()}
                                                        name="songs"

                                                        />
                                                        <p className="dropArea" >"Drag 'n' drop some files here, or click to select files"</p>
                                                    </div>
                                                )}
                                            </Dropzone>
                                            {this.state.isValidate&&this.state.files.length===0?(
                                                <p className="text-danger">Enter Songs</p>
                                            ):(
                                                <p></p>
                                            )}

                                            <UploadDopZone data={this.state.files} />

                                    </div>

                                    <Button type="submit"  className="submit" >Submit</Button>
                                    </div>
                                </Form>

                            </Card.Body>

                    </Card>

            </div>
        </>;
    }
}export default AddNewSong;