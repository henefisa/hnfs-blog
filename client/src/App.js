import React, { Component } from "react";
import { BrowserRouter} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Body from './components/Body';
import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <Header />
                    <Body />
                    <Footer />
                </BrowserRouter>
            </div>
        );
    }
}
export default App;
