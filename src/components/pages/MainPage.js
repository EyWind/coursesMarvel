import { useState } from "react";

import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import RandomChar from "../randomChar/RandomChar";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';


const MainPage = () => {

   const [charId, setCharId] = useState(null)

   const getCharId = (id) => {
       setCharId(id)
   } 

   return (
      <>
         <ErrorBoundary>
            <RandomChar/>
         </ErrorBoundary>

         <div className="char__content">

            <ErrorBoundary>
               <CharList getCharId={getCharId}/>
            </ErrorBoundary>

            <ErrorBoundary>
               <CharInfo charId={charId}/>
            </ErrorBoundary>
               
         </div>
         <img className="bg-decoration" src={decoration} alt="vision"/>
      </>
   )
}

export default MainPage;