import React from "react";
import { Switch, Route } from "react-router-dom";

import Main from "../components/Main";
import Blog from "../components/Blog";
import About from "../components/About";
import Contact from "../components/Contact";
import PostBlog from "../components/PostBlog";
import NotFoundPage from "../components/NotFoundPage";
import Login from "../components/Login";
import PrivateRoute from "./PrivateRoute";

const isAuthenticated = true;

export default () => (
    <div>
        <Switch>
            <Route path="/" exact render={() => <Main />} />
            <Route path="/blog" render={() => <Blog />} />
            <Route path="/about" render={() => <About />} />
            <Route path="/contact" render={props => <Contact {...props} />} />
            {isAuthenticated && (
                <PrivateRoute path="/posts" isAuthenticated={isAuthenticated}>
                    <PostBlog />
                </PrivateRoute>
            )}
            <Route path="/login" render={() => <Login />} />
            <Route render={() => <NotFoundPage />} />
        </Switch>
    </div>
);
