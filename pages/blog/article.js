import Blog from "../../components/blog";
import Anchors from "../../components/blog/anchors";
import React, { Component } from "react";
import { getOne } from "../../services/blog";
import NextHead from "next/head";
import marked from "marked";
import moment from "moment";
// import "../../assets/css/github-markdonw.css";
class Article extends Component {
  static async getInitialProps({ req, query }) {
    const { _id } = req ? req.params : query;
    if (_id) {
      let res = await getOne({ _id });
      let data = res.data.data
      data.body = marked(data.body)
      return { data };
    }
  }
  render() {
    const { data } = this.props;
    console.log(data)
    return (
      <Blog>
        <div className="article-right">
          <Anchors data={data.anchors} />
        </div>
        <div className="chunk-border article-main">
          <h3>{data.title}</h3>
          <p className="article-time">{moment(data.createTime).format('YYYY-MM-DD hh:mm:ss')}</p>
          <hr />
          <div
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: data.body }}
          />
          <div style={{ height: 500 }}>
          </div>
        </div>
        <style jsx>{`
          .article-main {
            width: 800px;
          }
          .article-right {
            width: 260px;
            float: right;
          }
          .article-time {
            font-size: 14px;
            margin: 10px 20px;
          }
        `}</style>
      </Blog >
    );
  }
}

export default Article;
