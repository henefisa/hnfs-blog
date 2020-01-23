import React from "react";
import { Switch, Route } from "react-router-dom";

import Main from "../components/Main";
import Blog from "../components/Blog";
import About from "../components/About";
import Contact from "../components/form/Contact";
import PostBlog from "../components/form/PostBlog";
import NotFoundPage from "../components/NotFoundPage";
import PrivateRoute from "./PrivateRoute";

export default () => (
    <div>
        <Switch>
            <Route path="/" exact render={() => <Main />} />
            <Route path="/blog" render={() => <Blog />} />
            <Route path="/about" render={() => <About />} />
            <Route path="/contact" render={props => <Contact {...props} />} />
            <PrivateRoute path="/posts" >
                <PostBlog />
            </PrivateRoute>
            <Route render={() => <NotFoundPage />} />
        </Switch>
    </div>
);
