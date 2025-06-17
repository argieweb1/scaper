import React from 'react';
require('./Article.css');

function Article(props) {
    if (!props.title || !props.link) {
        return (
            <div className="row" id="article">
                <div className="col">
                    <h4>Article not found</h4>
                </div>
            </div>
        );
    }

    return (
        <div className="row" id="article">
            <div className="col">
                <a href={props.link} target="_blank" rel="noopener noreferrer">
                    <h4>{props.title}</h4>
                </a>
                <p>{props.text}</p>
                <button className='btn btn-success' id={props.id} onClick={props.saveNew}>
                    Save Article
                </button>
            </div>
        </div>
    );
}

export default Article;