import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';

import './singleComicPage.scss';

const SingleComicPage = () => {

    const { comicId } = useParams();
    const [comic, setComic] = useState(null)
    const {loading, error, cleartError, getComic} = useMarvelService();
    
    useEffect(() => {
        updateComic()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comicId])

    const updateComic = () => {
        cleartError();

        getComic(comicId)
        .then(onComicLoaded);
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null;


    return (
        <div className="single-comic">
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({comic}) => {

    const {title, description, pageCount, price, language, thumbnail} = comic;

    return (
        <>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">{language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </>
    )
}

export default SingleComicPage;