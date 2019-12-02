import React, { Component } from "react";
import axios from "axios";

const BlogContent = props => {
  return (
    <div className="blog-content">
      <div className="menu-bar">
        <p className="upload-date">{props.postDate}</p>
        <span className="menu">
          <i className="fas fa-ellipsis-h"></i>
        </span>
      </div>
      <h2 className="title">{props.title}.</h2>
      <p className="description">{props.description}</p>
      <p className="content">{props.content}</p>
    </div>
  );
};

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogContent: []
    };
  }

  componentDidMount() {
    axios.get("/api/posts").then(res => {
      this.setState({
        blogContent: res.data
      });
    });
  }

  render() {
    const { blogContent } = this.state;
    return (
      <div className="Blog">
        {blogContent &&
          blogContent.map(item => {
            return (
              <BlogContent
                key={item.id}
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
