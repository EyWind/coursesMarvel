import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const ComicsList = () => {

    const [comics, setComics] = useState([]);
    const [comicsOffset, setComicsOffset] = useState(36874);
    const [loadingMore, setLoadingMore] = useState(false);
    const [endList, setEndList] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onUpdateList(comicsOffset, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const onUpdateList = (offset, init) => {
        init ? setLoadingMore(false): setLoadingMore(true);

        getAllComics(offset)
        .then(onComicsLoaded)
    }

    const onComicsLoaded = (comicsData) => {
        const end = comicsData.length >= 8 ? false : true;

        setComics(data => [...data,...comicsData]);
        setComicsOffset(comicsOffset => comicsOffset + 8)
        setLoadingMore(false);
        setEndList(end);

    }

    const renderItems = (data) => {
        const items = data.map(({id, title, price, thumbnail}, i) => {

            return (
                <li className="comics__item" key={i}>
                    <Link to={`${id}`}>
                        <img src={thumbnail} alt={title} className="comics__item-img"/>
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">{price}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(comics)

    const errorMsg = error ? <ErrorMessage /> : null;
    const spinner = loading && !loadingMore ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {items}
            {spinner}
            {errorMsg}
            <button 
                    className="button button__main button__long"
                    onClick={() => onUpdateList(comicsOffset)}
                    disabled={loadingMore}
                    style={{display: endList ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;