import React from "react";
import { Switch, Route } from "react-router-dom";

import Main from "./Main";
import Blog from "./Blog";
import About from "./About";
import Contact from "./Contact";
import PostBlog from "./PostBlog";
import NotFoundPage from "./NotFoundPage";
import Login from "./Login";

export default () => (
    <div>
        <Switch>
            <Route path="/" exact render={() => <Main />} />
            <Route path="/blog" render={() => <Blog />} />
            <Route path="/about" render={() => <About />} />
            <Route path="/contact" render={() => <Contact />} />
            <Route path="/posts" render={() => <PostBlog />} />
            <Route path="/login" render={() => <Login />} />
            <Route render={() => <NotFoundPage />} />
        </Switch>
    </div>
);
