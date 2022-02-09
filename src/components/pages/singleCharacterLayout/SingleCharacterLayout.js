import { Helmet } from 'react-helmet';

import './singleCharacterLayout.scss';

const singleCharacterLayout = ({data}) => {

   const {name, descr, thumbnail} = data;

   return (
       <div className='single-character'>
           <Helmet>
                <meta
                name="description"
                content={`${name} character page`}
                />
                <title>{name}</title>
            </Helmet>

           <img src={thumbnail} alt={name} className="single-character__img"/>
           <div className="single-character__info">
               <h2 className="single-character__name">{name}</h2>
               <p className="single-character__descr">{descr}</p>
           </div>
       </div>
   )
}

export default singleCharacterLayout;