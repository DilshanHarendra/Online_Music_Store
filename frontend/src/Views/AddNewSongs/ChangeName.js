import React, {useEffect, useState} from "react";
import { Form} from "react-bootstrap";


function ChangeName(props) {

   const Song=props.data;
   const [SongName,setSongName]=useState(props.data.name.split('.mp3')[0])
    const [error,seterror]=useState(false);
    const [empty,setempty]=useState(true);
    useEffect(()=>{
      // setSong();



    });

   const deleteSong=()=>{
       props.deleteSong(Song.name)
   }
    const changeName=(e)=> {
        setSongName(e.target.value);
       if (e.target.value===""){
           setempty(true);
           let newobj={name:Song.name,file:Song.file};
           let key=Song.name;
           props.setName(key,newobj);
       }else {
           setempty(false);
           props.allSongs.forEach((v,k)=>{
               if (v.file.name===e.target.value+".mp3"){
                   seterror(true);
               }else{
                   seterror(false);
                   setSongName(e.target.value);
                   let newobj={name:e.target.value+".mp3",file:Song.file};
                   let key=Song.name;
                   props.setName(key,newobj);
               }
           })
       }

   }





        return <>

                <div className="card" >
                    <div className="d-flex" >
                        <div className="songName">
                            <Form noValidate validated={empty}   >
                            <Form.Control
                                type="text"
                                className="songNameFiled"
                                aria-describedby="inputGroupPrepend"
                                required
                                placeholder="Song Name"
                                name="sname"
                                id="sname"
                                value={SongName}
                                onChange={changeName}


                            />

                            <Form.Control.Feedback type="invalid">
                                Please Enter Category.
                            </Form.Control.Feedback>
                            </Form>
                        </div>

                        <div className="closeDiv" onClick={()=>deleteSong()}>
                            <i className="fa fa-times close" aria-hidden="true"></i>
                        </div>
                    </div>
                    {error?(
                        <p className="text-danger">Name is Already Exist</p>
                    ):(
                        <></>
                    )}
                </div>


        </>;

}export default ChangeName;