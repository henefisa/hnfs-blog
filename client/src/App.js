import React, {Component} from 'react';
import { Switch, Route} from "react-router-dom";

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Blog from './components/Blog';
import About from './components/About';
import Contact from './components/Contact';
import PostBlog from './components/PostBlog';
import './App.css';

class App extends Component{
  render(){
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
          <Route path="/blog">
            <Blog />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/posts">
            <PostBlog /> 
          </Route>
        </Switch>
        <Footer />
      </div>
    );
  }
}
export default App;
