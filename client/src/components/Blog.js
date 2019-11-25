import React, { Component } from "react";

const BlogContent = props => {
  return (
    <div className="blog-content">
      <h2 className="title">This is title {props.index}.</h2>
      <p className="upload-date">20-11-2019</p>
      <p className="content">
        This is blog content. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Quos iure excepturi animi numquam a, nihil aliquam nobis, labore
        veritatis minima provident, deserunt perferendis id sit ullam tempore
        sapiente dolor? Repellat.
      </p>
    </div>
  );
};

class Blog extends Component {
  constructor(props){
    super(props);
    this.state = {
      blogContent: [
        <BlogContent index="1" />,
        <BlogContent index="2" />,
        <BlogContent index="3" />
      ]
    }
  }
  render() {
    const {blogContent} = this.state;
    return <div className="Blog">
        {blogContent && blogContent.map(content => content)}
    </div>;
  }
}

export default Blog;