import React,{useEffect, useeffect,useState} from 'react';


import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=> {
const[articles,setArtciles]=useState([])
const [sunloading,setloading]=useState(true)
const [page,setPage]=useState(1)
const [totalResults,setTotalResults]=useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    const updateNews=async()=> {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setloading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setArtciles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setloading(false)
        props.setProgress(100);
            }

        useEffect(()=>{
            
        document.title = `${capitalizeFirstLetter(props.category)} - Newzify`;
            updateNews();
            // eslint-disable-next-line
            },[])

    const handleNextClick = async () => {
        setPage(page+1)
        updateNews();
    }

    const handlePrevClick = async () => {
        setPage(page-1)
        updateNews();
    }

    const fetchMoreData = async () => {
        
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1)
        let data = await fetch(url);
        let parsedData = await data.json();
        setArtciles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
       
    };

        return (
            <>
                <h1 className='text-center' style={{ margin: '35px 0px' , marginTop:'90px'}}>
                    Newzify - Top {capitalizeFirstLetter(props.category)} Headlines
                </h1>
                 {sunloading &&<Spinner/>}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                >
                    <div className='container'>
                        <div className='row'>
                            {articles.map((element, index) => {
                                return (
                                    <div className="col-md-4" key={`${element.url}-${index}`}>
                                        <NewsItem
                                            title={element.title ? element.title : ""}
                                            description={element.description ? element.description : ""}
                                            imageUrl={element.urlToImage}
                                            newsUrl={element.url}
                                            author={element.author}
                                            date={element.publishedAt}
                                            source={element.source.name}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        );
    }

News.defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}
export default News;
