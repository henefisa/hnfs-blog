import React from "react";
import { Switch, Route } from "react-router-dom";

import Main from "../components/pages/Main";
import Blog from "../components/pages/Blog";
import About from "../components/pages/About";
import Contact from "../components/form/Contact";
import PostBlog from "../components/form/PostBlog";
import NotFoundPage from "../components/pages/NotFoundPage";
import PrivateRoute from "./PrivateRoute";
import AccountManagement from "../components/pages/AccountManagement";

export default () => (
    <div>
        <Switch>
            <Route path="/" exact render={() => <Main />} />
            <Route path="/blog" render={() => <Blog />} />
            <Route path="/about" render={() => <About />} />
            <Route path="/contact" render={props => <Contact {...props} />} />
            <PrivateRoute path="/posts/:postId" component={PostBlog} />
            <PrivateRoute path="/posts" component={PostBlog} />
            <PrivateRoute path="/account" component={AccountManagement} />
            <Route render={() => <NotFoundPage />} />
        </Switch>
    </div>
);
