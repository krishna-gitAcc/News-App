import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'



export default class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize:"8",
        category:"general",
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize : PropTypes.number,
        category : PropTypes.string,
    }

    constructor() {

        super();
        console.log("Hello I'm constructor form newsComponents");
        this.state = {
            article: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
    }

    async componentDidMount() {
        this.setState({
            loading: true,

        });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=93d63f63dff442e2a78f08410b46cd2c&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json();
        console.log(parseData);
        this.setState({
            article: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false
        });
    }

    handlePreviousClick = async () => {
        console.log("previous click");
        this.setState({
            loading: true,
        })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=93d63f63dff442e2a78f08410b46cd2c&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`//"https://newsapi.org/v2/top-headlines?country=in&apiKey=93d63f63dff442e2a78f08410b46cd2c";
        let data = await fetch(url);
        let parseData = await data.json();
        // console.log(parseData);
        this.setState({
            article: parseData.articles,
            page: this.state.page - 1,
            loading:false,
        });
    }
    handleNextClick = async () => {
        console.log("next");
        console.log("Next click");
        this.setState({
            loading: true,
        });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=93d63f63dff442e2a78f08410b46cd2c&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`//"https://newsapi.org/v2/top-headlines?country=in&apiKey=93d63f63dff442e2a78f08410b46cd2c";
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            article: parseData.articles,
            page: this.state.page + 1,
            loading:false

        }
        )
        // if(this.state.page=== Math.ceil(this.state.totalResults/18)){

        // }
    }

    render() {
        return (
            <div className='container my-4 text-center'>
                <h1 className='my-8'>NewsMonkey - Top Headlines</h1>
                {this.state.loading && <Spinner />}
                <div className="row my-4">
                    {!this.state.loading && this.state.article.map((element) => {
                        // console.log(element);
                        return (<div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title} description={element.description} imgUrl={element.urlToImage} newsUrl={element.url} />
                        </div>)
                    })}

                </div>
                {!this.state.loading && <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type='button' className='btn btn-dark btn-sm' onClick={this.handlePreviousClick}>&laquo; Previous</button>
                    <button disabled={this.state.page === Math.ceil(this.state.totalResults / (this.props.pageSize))} type='button' className='btn btn-dark btn-sm' onClick={this.handleNextClick}>Next &raquo;</button>
                </div>}

            </div>
        )
    }
}
