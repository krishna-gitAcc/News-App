import React, { Component } from 'react'

export default class NewsItem extends Component {



    render() {
        let { title, description,imgUrl, newsUrl } = this.props;
        return (
            <div>
                <div className="card" style={{ width: "18rem" }}>
                    <img src={imgUrl ? imgUrl :"https://thumbs.dreamstime.com/z/global-news-icon-world-logo-black-white-background-simple-vector-143330978.jpg"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <a href={newsUrl} target="_blank" rel='noreferrer' className="btn btn-dark btn-sm">Details</a>
                    </div>
                </div>
            </div>
        )
    }
}
