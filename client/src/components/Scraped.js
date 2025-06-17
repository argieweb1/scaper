import Article from './Article';

function Scraped(props) {
    const articles = Array.isArray(props.state) ? props.state : [];

    return (
        <div className="container-fluid">
            {articles.length === 0 ? (
                <div className='row' id='error'><h2>No Articles Have Been Scraped</h2></div>
            ) : (
                articles.map((x, idx) => (
                    <Article
                        link={x.link}
                        title={x.title}
                        text={x.text}
                        id={idx}
                        key={idx}
                    />
                ))
            )}
        </div>
    );
}

export default Scraped;