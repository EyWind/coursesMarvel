
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const CharList = (props) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [charOffset, setCharOffset] = useState(210);
    const [loadingMore, setLoadingMore] = useState(false);
    const [endList, setEndList] = useState(false);

    useEffect(() => {
        onUpdateList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const marvelService = new MarvelService();

    const onUpdateList = (offset) => {

        onLoadingMore();

        marvelService.getAllCharacters(offset)
        .then(onCharListLoaded)
        .catch(onError)
    }

    const onCharListLoaded = (charData) => {
        const end = charData.length >= 9 ? false : true;

        setData(data => [...data ,...charData]);
        setLoading(false);
        setCharOffset(charOffset => charOffset + 9);
        setLoadingMore(false);
        setEndList(end);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const onLoadingMore = () => {
        setLoadingMore(true);
    }

    const myRef = useRef([]);

    const setElRef = (el, i) => {
        myRef.current[i] = el
    }

    const onClickFocus = (i) => {
        if (myRef.current.length > 0) {

            myRef.current.forEach(el => el.classList.remove('char__item_selected'))
            myRef.current[i].classList.add('char__item_selected');
            myRef.current[i].focus();
        }
    }


    const renderItems = (data) => {
        const items = data.map(({id, name, thumbnail}, i) => {
    
            const check = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
                         || thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif';
    
            const imgStyle = check ? {objectFit: 'contain'} : null;
            
            return (
                <li 
                    className='char__item'
                    key={id}
                    tabIndex={0}
                    ref={e => setElRef(e,i)}
                    onClick={() => {
                        props.getCharId(id);
                        onClickFocus(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                            e.preventDefault();
                            props.getCharId(id);
                            onClickFocus(i);
                        }
                    }}>
                        <img style={imgStyle} src={thumbnail} alt={name}/>
                        <div className="char__name">{name}</div>
                </li>
            )
        })

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }
    

    const items = renderItems(data);

    const errorMsg = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null;
    const content = !(error || spinner) ? items : null;


    return (
        <div className="char__list">
            
            {errorMsg}
            {spinner}
            {content}
            
            <button className="button button__main button__long"
                    onClick={() => onUpdateList(charOffset)}
                    disabled={loadingMore}
                    style={{display : endList ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    getCharId: PropTypes.func.isRequired
}

export default CharList;

