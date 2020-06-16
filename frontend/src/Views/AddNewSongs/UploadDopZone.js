import React, {Component} from "react";
import {Form} from "react-bootstrap";


class UploadDopZone extends Component{

    constructor(props) {
        super(props);
        this.state={
            sname:[],
            files:[],
            count:0
        }

    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log(nextProps.data);

        this.state={
            files:nextProps.data,
        }
    }

    render() {

        return <>
            {this.state.files.map(song=>(

                <div className="card">
                    <div className="d-flex" >

                        <div className="songName">

                            <Form.Control
                                type="text"
                                className=""
                                aria-describedby="inputGroupPrepend"
                                required
                                placeholder="Song Name"
                                name="sname"
                                id="sname"
                                value={song.name}
                            />

                            <Form.Control.Feedback type="invalid">
                                Please Enter Category.
                            </Form.Control.Feedback>
                        </div>

                        <div className="closeDiv">
                            <i className="close">X</i>
                        </div>



                    </div>

                </div>
            ))}








        </>;
    }
}export default UploadDopZone;