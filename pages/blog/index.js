import React, { Component } from "react";
import Link from 'next/link';
import {
  blueGrey50,
  lightGreen50,
  grey800,
  grey600
} from "material-ui/styles/colors";
import { getArticle } from '../../services/blog'

import format from '../../utils/format'
import Blog from '../../components/blog'

class List extends Component {
  static async getInitialProps({ req }) {
    let res = await getArticle();
    if (res) {
      return { data: res.data.data }
    }
  }

  render() {
    const { data } = this.props;
    return (
      <Blog>
        <div className="list-container">
          {
            data.map(art => (
              <Link as={`/blog/${art._id}`} href='/blog/article' key={art.title} className="blog-list">
                <a>
                  <h3>{art.title}</h3>
                  <p className='article-time'>{format(art.createTime)}</p>
                  <p className='article-desc'>{art.desc}</p>
                  {/* <div dangerouslySetInnerHTML={{ __html: art.body }}></div> */}
                </a>
              </Link>
            ))
          }
          <style jsx>{`
        a {
          display: block;
        }
        .list-container{
          width: 800px;
        }
        h3 {
          color: ${grey800}
        }
        .article-desc{
          font-size: 14px;
          line-height: 20px;
        }        
        .article-time{
          margin: 15px 0;          
          font-size: 14px;
          color: ${grey600}
        }
        .blog-list{
          margin-bottom: 20px;
          padding: 20px;
          box-sizing: border-box;
          border: 1px solid ${lightGreen50};
          background-color: ${blueGrey50};
          border-radius: 4px;
        }
        `}</style>
        </div>
      </Blog>
    )
  }
}

export default List;
