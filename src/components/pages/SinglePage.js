import { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';

import setContent from '../../utils/setContent';
import useMarvelService from '../../services/MarvelService';
import AppBanner from "../appBanner/AppBanner";

const SinglePage = ({Component, dataType}) => {

    const { id } = useParams();
    const [data, setData] = useState(null)
    const {process, setProcess, cleartError, getComic, getCharacter} = useMarvelService();
    
    useEffect(() => {
        updateData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    const updateData = () => {
        cleartError();

        if (dataType === 'comic') {
            getComic(id).then(onDataLoaded).then(() => setProcess('confirmed'));;
        } else if (dataType === 'character') {
            getCharacter(id).then(onDataLoaded).then(() => setProcess('confirmed'));;
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    return (
        <>
            <AppBanner/>
            {setContent(process, Component, data)}
        </>
    )   
}

export default SinglePage;