import { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';
import AppBanner from "../appBanner/AppBanner";

const SinglePage = ({Component, dataType}) => {


    const { id } = useParams();
    const [data, setData] = useState(null)
    const {loading, error, cleartError, getComic, getCharacter} = useMarvelService();
    
    useEffect(() => {
        updateData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const updateData = () => {
        cleartError();

        if (dataType === 'comic') {
            getComic(id).then(onDataLoaded);
        } else if (dataType === 'character') {
            getCharacter(id).then(onDataLoaded);
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !data) ? <Component data={data}/> : null;

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )   
}

export default SinglePage;