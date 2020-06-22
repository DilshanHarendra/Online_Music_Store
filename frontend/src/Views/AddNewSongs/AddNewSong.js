import React, {Component} from "react";
import {Alert, Button, Card, Form} from "react-bootstrap";
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { FilePond,  registerPlugin } from 'react-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size';
import axios from 'axios';
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import Checkbox from '@material-ui/core/Checkbox';
import '../../Asserts/css/AddNewSongs.css';
import DateFnsUtils from '@date-io/date-fns';
import Dropzone from "react-dropzone";
import ChangeName from "./ChangeName";
var HashMap = require('hashmap');




registerPlugin( FilePondPluginImagePreview,FilePondPluginFileValidateType,FilePondPluginImageValidateSize)



class AddNewSong extends Component{

    constructor(props) {
        super(props);
        this.state={
            album:'',
            artist:'',
            category:'',
            description:'',
            coverImage:[],
            year:new Date(),
            files: new HashMap(),
            isValidate:false,
            showReleseDate:false,
            error:''

        }
    }

    changeReleseDate=e=>  {

        if (this.state.showReleseDate){
            this.setState({
                showReleseDate:false
            });
        }else {
            this.setState({
                showReleseDate:true
            });
        }



        }
    onChange=e=>{

        this.setState({
            [e.target.name]:e.target.value
        })
    }

    deleteSong=key=>{
        var map=this.state.files;
        map.delete(key);
        this.setState({
            files:map,
        },()=>console.log(this.state.files.values()))
    }

    setName=(key,obj)=>{

        var map=this.state.files;
       map.set(key,obj)
    }

    addFile=file=>{
        var map=this.state.files;
        if (file.length!==0){

            file.forEach(song=>{
                if (song.type==="audio/mpeg"){
                    map.set(song.name,{name:song.name,file:song})
                }

            });

            this.setState({
                files:map,
            })

        }

    }

    showReleseDate=()=>{
        if (this.state.showReleseDate){
            return <>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="year"
                        label="Release Year (Optional)"
                        value={this.state.year}
                        onChange={this.setDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>  <br/>
            </>
        }
    }



    onSubmit=(e)=>{
        e.preventDefault();
       if (this.state.album===''|| this.state.artist===''||this.state.files===''||this.state.coverImage==="" ){
           this.setState({
               isValidate:true
           })
       }else{
           this.setState({
               isValidate:false
           });
           const songs = new FormData();
           songs.append('coverImage',this.state.coverImage[0]);
           let SongsDetails=[];
           var id=Date.now();
           let album= {
               coverImage:this.state.album+"_"+this.state.coverImage[0].name,
           }
           this.state.files.forEach((v,k)=>{
               songs.append('songs',v.file);
               let song = {
                   songName: v.name,
                   albumDetails: id,
                   addDate: new Date(),
                   albumName: this.state.album,
                   artistName: this.state.artist,
                   albumCategory: this.state.category,
                   year: this.state.year,
                   otherDetails: this.state.description,
                   coverImage:this.state.album+"_"+this.state.coverImage[0].name,

               }
               SongsDetails=[...SongsDetails,song]
           });

           let data=[album,SongsDetails];
           const json = JSON.stringify(data);
           songs.append('data',json);
           axios.post(global.backend+'/songs/addsongs',songs,{headers:{ 'Content-Type': 'multipart/form-data'}})
                .then(res=>{
                    window.location.replace("/songs");
                })
                .catch(err=>{
                    this.setState({
                        error:err
                    })
                    console.log(err)
                })

       }
    }


    setDate=date=>{
        this.setState({
            year:date
        })
    }


    render() {

        return <>
            <div className="container">

                    <Card border="primary" >
                        <Card.Header>
                                <h4>Add New Songs</h4>


                            </Card.Header>
                            <Card.Body>
                                {this.state.error!==""?(
                                    <Alert variant={"danger"}>{this.state.error}</Alert>
                                ):(
                                    <></>
                                )}
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
                                        </div><br/>




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
                                        </div><br/>


                                                <h6 style={{color:'gray',textAlign:'left'}}>CoverImage <span className="text-danger">*</span></h6>
                                                <FilePond
                                                    required={true}
                                                    ref={ref => this.pond = ref}
                                                    files={this.state.coverImage}
                                                    allowMultiple={false}
                                                    maxFiles={1}
                                                    id="coverimg"
                                                    labelIdle='Drag & Drop your Product Images or <span class="filepond--label-action"> Browse </span>'
                                                    acceptedFileTypes={['image/*']}
                                                    labelFileTypeNotAllowed={"Invalid file"}
                                                    imagePreviewMaxHeight={400}
                                                    imageValidateSizeMinHeight={200}
                                                    imageValidateSizeMinWidth={200}
                                                    onupdatefiles={(fileItems) => {

                                                        this.setState({
                                                            coverImage: fileItems.map(fileItem => fileItem.file)

                                                        });
                                                    }}


                                                >

                                                </FilePond>
                                                {this.state.isValidate&&this.state.coverImage.length===0?(
                                                    <p className="text-danger">Enter CoverImage</p>
                                                ):(
                                                    <p></p>
                                                )}
                                            <br/>



                                        <div className="input-field">
                                            <label htmlFor="category">Category (Optional)</label>
                                            <Form.Control
                                                as="Select"
                                                className="validate"
                                                aria-describedby="inputGroupPrepend"
                                                name="category"
                                                id="category"
                                                value={this.state.category}
                                                onChange={this.onChange}

                                            >
                                                <option value=""></option>
                                                <option value="Live Show">Live Show</option>
                                                <option value="Rock">Rock</option>
                                                <option value="Pop">Pop</option>
                                                <option value="Hiphop">Hiphop</option>
                                                <option value="Classic">Classic</option>
                                                <option value="Raggay">Raggay</option>
                                                <option value="Electro">Electro</option>
                                                
                                            </Form.Control>


                                        </div><br/>



                                        <p style={{textAlign:'left',color:'gray'}}>Set Release Date (Optional)
                                            <Checkbox
                                                checked={this.state.showReleseDate}
                                                onClick={this.changeReleseDate}

                                                inputProps={{ 'aria-label': 'checkbox with default color' }}
                                            /></p>
                                            {this.showReleseDate()}

                                            <div className="input-field">
                                                <label htmlFor="description">Discription (Optional)</label>
                                                <Form.Control
                                                    type="text"
                                                    className="validate"
                                                    aria-describedby="inputGroupPrepend"
                                                    name="description"
                                                    id="description"
                                                    value={this.state.description}
                                                    onChange={this.onChange}
                                                />


                                            </div><br/>


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
                                                        <p className="dropArea" >Drag 'n' drop some files here, or click to select files
                                                            <br/>
                                                            "allows only .mp3"
                                                            </p>
                                                    </div>
                                                )}
                                            </Dropzone>
                                            {this.state.isValidate&&this.state.files.values().length===0?(
                                                <p className="text-danger">Enter Songs</p>
                                            ):(
                                                <p></p>
                                            )}
                                            {this.state.files.values().map(song=>(
                                                <ChangeName data={song} key={song.name} allSongs={this.state.files} setName={this.setName}  deleteSong={this.deleteSong} />
                                            ))}



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