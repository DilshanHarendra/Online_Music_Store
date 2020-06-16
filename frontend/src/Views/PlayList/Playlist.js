import React, {Component} from "react";

class Playlist extends Component{

    render() {
        return <>
            <div className="container">

                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex">
                                <h5>Sinhala Punjabi Medley at Y Unplugged Studio   News.mp3</h5>
                                <button>Play</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex">
                                <h5>Kadappuli.mp3</h5>
                                <button>Play</button>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex">
                                <h5>Akon - I Wanna Love You ft. Snoop Dogg.mp3</h5>
                                <button>Play</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>;
    }
}export default Playlist;