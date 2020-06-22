import React, { Component, useState } from "react";
import { useHistory } from "react-router-dom";
const BlogContent = props => {
    const [isMenuOpen, setMenuIsOpen] = useState(false);
    const createMarkup = htmlString => ({ __html: htmlString });
    const history = useHistory();
    return (
        <div className="blog-content">
            <div className="menu-bar">
                <p className="upload-date">{props.postDate}</p>
                <span className="menu">
                    <i
                        className="fas fa-ellipsis-h"
                        onClick={() => setMenuIsOpen(prevState => !prevState)}
                    ></i>
                    {isMenuOpen && (
                        <ul>
                            <li
                                onClick={() => {
                                    history.push("/posts/" + props.id);
                                }}
                            >
                                Edit
                            </li>
                            <li>Delete</li>
                        </ul>
                    )}
                </span>
            </div>
            <h2 className="title">{props.title}.</h2>
            <p className="description">{props.description}</p>
            <p
                className="content"
                dangerouslySetInnerHTML={createMarkup(props.content)}
            ></p>
        </div>
    );
};

class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        const fetchPosts = async () => {
            const result = await (
                await fetch("/authentication/posts", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            ).json();
            this.setState(() => ({
                posts: result
            }));
        };
        fetchPosts();
    }

    render() {
        const { posts } = this.state;
        return (
            <div className="Blog">
                {posts &&
                    posts.map(item => {
                        return (
                            <BlogContent
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                postDate={item.postDate}
                                description={item.description}
                                content={item.content}
                            />
                        );
                    })}
            </div>
        );
    }
}

export default Blog;
