import React from "react";
import { Link } from "react-router-dom";

const AuthorInfomation = props => {
    return (
        <div className="Author-Infomation">
            <h3 className="Author-Name">Trần Văn Nghĩa</h3>
            <p className="details">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Accusantium quam, eligendi nam repellendus libero quaerat earum
                blanditiis maiores debitis recusandae numquam eum hic delectus
                labore sed culpa deserunt deleniti aliquam?
            </p>
        </div>
    );
};

const About = props => {
    return (
        <div className="About">
            <AuthorInfomation />
            <Link to="/Contact">Contact Me</Link>
        </div>
    );
};

export default About;
