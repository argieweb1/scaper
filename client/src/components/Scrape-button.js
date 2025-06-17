import { Link } from 'react-router-dom';

function ScrapeButton(props) {
    return (
        <div>
            <Link to='/'>
                <button
                    className='btn btn-success'
                    onClick={props.handleClick} // Use props.handleClick instead of this.handleClick
                >
                    Scrape Articles
                </button>
            </Link>
        </div>
    );
}

export default ScrapeButton;