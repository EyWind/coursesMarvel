import { Component } from 'react/cjs/react.production.min';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import MarvelService from '../../services/MarvelService';

import './charInfo.scss';

class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false
    }

    componentDidMount() {
        this.getChar();
    }

    componentDidUpdate(prevProp) {
        if (prevProp !== this.props) {
            this.getChar()
        }
    }

    marvelService = new MarvelService();

    getChar = () => {

        const {charId} = this.props;

        if (!charId) {
            return;
        }

        this.onCharLoading();

        this.marvelService.getCharacter(charId)
        .then(this.onCharLoaded)
        .catch(this.onError);
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    onCharLoading = () => {
        this.setState({
            loading: true,
            error: false
        })
    }

    render () {

        const {char, loading, error} = this.state;

        const skeleton = !(char || loading || error) ? <Skeleton/> : null; 
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null;
        
        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const View = ({char}) => {

    const {name, descr, thumbnail, wiki, homepage, comics} = char;

    
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
                        return (
                            <li className="char__comics-item" key={i}>
                                {el.name}
                            </li>
                        )
                    })
                }

            </ul>
        </>
    )
}

export default CharInfo;