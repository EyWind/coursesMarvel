import { Component } from 'react/cjs/react.production.min';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

class CharList extends Component {

    state = {
        data: [],
        loading: true,
        error: false,
        charOffset: 210,
        loadingMore: false,
        endList: false
    }

    componentDidMount() {
        this.onUpdateList();
    }

    marvelService = new MarvelService();

    onUpdateList = (offset) => {

        this.onLoadingMore();

        this.marvelService.getAllCharacters(offset)
        .then(this.onCharListLoaded)
        .catch(this.onError)
    }

    onCharListLoaded = (charData) => {
        const end = charData.length >= 9 ? false : true;
        
        this.setState(({data, charOffset}) => ({          
            data: [...data ,...charData],
            loading: false,
            charOffset: charOffset + 9,
            loadingMore: false,
            endList: end
        }))
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    onLoadingMore = () => {
        this.setState({
            loadingMore: true
        })
    }

    myRef = [];

    setElRef = elem => {
        this.myRef.push(elem);
    }

    onClickFocus = (i) => {
        if (this.myRef) {

            this.myRef.forEach(el => el.classList.remove('char__item_selected'))
            this.myRef[i].classList.add('char__item_selected');
            this.myRef[i].focus();

        }
    }


    renderItems = (data) => {
        const items = data.map(({id, name, thumbnail}, i) => {
    
            const check = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
                         || thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708.gif';
    
            const imgStyle = check ? {objectFit: 'contain'} : null;
            
            return (
                <li 
                    className='char__item'
                    key={id}
                    tabIndex={0}
                    ref={this.setElRef}
                    onClick={() => {
                        this.props.getCharId(id);
                        this.onClickFocus(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                            e.preventDefault();
                            this.props.getCharId(id);
                            this.onClickFocus(i);
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
    
    render() {

        const {data, loading, error, charOffset, loadingMore, endList} = this.state;

        const items = this.renderItems(data);

        const errorMsg = error ? <ErrorMessage/> : null
        const spinner = loading ? <Spinner/> : null;
        const content = !(error || spinner) ? items : null;


        return (
            <div className="char__list">
                
                {errorMsg}
                {spinner}
                {content}
                
                <button className="button button__main button__long"
                        onClick={() => this.onUpdateList(charOffset)}
                        disabled={loadingMore}
                        style={{display : endList ? 'none' : 'block'}}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    getCharId: PropTypes.func.isRequired
}

export default CharList;

