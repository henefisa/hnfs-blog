import React, { Component } from "react";
import { BrowserRouter} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Routes from './route/Routes';
import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Header />
                    <Routes />
                    <Footer />
                </BrowserRouter>
            </div>
        );
    }
}
export default App;
