import { useState } from "react";
import { Helmet } from "react-helmet"

import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import RandomChar from "../randomChar/RandomChar";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import CharSearchForm from '../charSearchForm/CharSearchForm';

import decoration from '../../resources/img/vision.png';


const MainPage = () => {

   const [charId, setCharId] = useState(null)

   const getCharId = (id) => {
       setCharId(id)
   } 

   return (
      <>
         <Helmet>
            <meta
               name="description"
               content="Marvel information portal"
            />
            <title>Marvel information portal</title>
         </Helmet>
         
         <ErrorBoundary>
            <RandomChar/>
         </ErrorBoundary>

         <div className="char__content">

            <ErrorBoundary>
               <CharList getCharId={getCharId}/>
            </ErrorBoundary>

            <div>
               <ErrorBoundary>
                  <CharInfo charId={charId}/>
               </ErrorBoundary>

               <ErrorBoundary>
                  <CharSearchForm/>
               </ErrorBoundary>
            </div>
               
         </div>
         <img className="bg-decoration" src={decoration} alt="vision"/>
      </>
   )
}

export default MainPage;