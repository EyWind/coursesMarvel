import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charSearchForm.scss';

const setContent = (process, Component, char) => {

   switch (process) {

       case 'waiting':
           return null;

       case 'loading':
           return null;

       case 'confirmed':
           return char.length > 0 ? 
                     <Component char={char}/> : 
                     <p className='char__search-error'>
                        The character was not found. Check the name and try again'
                     </p>;

       case 'error':
           return <div className='char__search-critical-error'><ErrorMessage /></div>;

       default:
           throw new Error('Unexpected process ocured');
   }
}

const CharSearchForm = () => {

   const [char, setChar] = useState(null);
   const {process, setProcess, getCharacterByName, cleartError} = useMarvelService();   
   const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: {find: ''}});

   const onSubmit = data => {
      reset();
      cleartError()

      getCharacterByName(data.charName)
         .then(onCharLoaded)
         .then(() => setProcess('confirmed'));
   }

   const onCharLoaded = (char) => {
      setChar(char);
   }
   
   return(
      <div className='char__search-form'>
         <form onSubmit={handleSubmit(onSubmit)}>
            <label className='char__search-label' htmlFor='charName'>Or find a character by name:</label>
            <div className='char__search-wrapper'>
               <input             
                  type='text'
                  placeholder='Enter Name'
                  id='charName'
                  {...register("charName", { 
                     required: 'This field is required'})}
               />
               <button 
                     className="button button__main" 
                     type='submit' 
                     disabled={process === 'loading'}>
                     <div className="inner">Find</div>
               </button>
            </div>
            <p className='char__search-error'>{errors.charName ? errors.charName.message : null}</p>
         </form>
            {setContent(process, View, char)}
      </div>
   )
}

const View = ({char}) => {
   
   return (
      <div className='char__search-wrapper'>
         <p className='char__search-success'>There is! Visit {char[0].name} page?</p>
         <Link to={`/characters/${char[0].id}`} className="button button__secondary">
           <div className="inner">To Page</div>
         </Link> 
      </div>
   )
}

export default CharSearchForm;
