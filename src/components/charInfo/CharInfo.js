import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    
    const {process, setProcess, cleartError, getCharacter} = useMarvelService();

    useEffect(() => {
        getChar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.charId])


    const getChar = () => {

        const {charId} = props;

        if (!charId) {
            return;
        }

        cleartError();

        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }
    
    return (
        <div className="char__info">
            {setContent(process, View, char)}

        </div>
    )
}

const View = ({data}) => {

    const {name, descr, thumbnail, wiki, homepage, comics} = data;

    
    const check = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg';

    const clazz = check ? {objectFit: 'contain'} : null;
    
    return (
        <>
            <div className="char__basics">
                <img style={clazz} src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {descr}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">

                {comics.length === 0 ? 'No comics with this character available at the moment' : null}

                {
                    comics.filter((e, i) => i < 10)
                    .map((el, i) => {
                        const id = el.resourceURI.match(/\d{2,10}/);
                        return (
                            <li className="char__comics-item" key={i}>
                                <Link to={`/comics/${id}`}>{el.name}</Link>
                            </li>
                        )
                    })
                }

            </ul>
        </>

    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;