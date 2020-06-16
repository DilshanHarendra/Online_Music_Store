import React, {Component} from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Components/Header";

import Home from "./Views/Home/Home";
import {Route, Switch,BrowserRouter as Router} from "react-router-dom";
import {createStore} from "redux";
import Reducer from "./ReduxStore/Reducer";
import {Provider} from "react-redux";
import Register from "./Views/Register/Register";
import Login from "./Views/Login/Login";
import Playlist from "./Views/PlayList/Playlist";
import MusicPlayer from "./Components/MusicPlayer";
import AddNewSong from "./Views/AddNewSongs/AddNewSong";


class App extends Component{

    constructor(props) {
        super(props);
        this.state={
            store:createStore(Reducer)
        }

    }
    render() {
        return (
            <Router>
                <div className="App">
                    <Provider store={this.state.store}>
                        <Header/>
                        <Switch>
                            <Route path="/" exact component={Home}/>
                            <Route path="/regitser" exact component={Register}/>
                            <Route path="/login" exact component={Login}/>
                            <Route path="/playlist" exact component={Playlist}/>
                            <Route path="/addnewSong" exact component={AddNewSong}/>
                        </Switch>
                        <MusicPlayer/>
                    </Provider>
                </div>
            </Router>

        );
    }
}

export default App;
