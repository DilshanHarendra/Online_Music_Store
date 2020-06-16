import React, {Component} from "react";
import {connect} from "react-redux";

class Home extends Component{

    render() {
        return <>
        Home
            <h1>{this.props.count}</h1>
        </>;
    }
}const mapStateToProps=state=>({
    count:state.count
});
export default connect(mapStateToProps)(Home);