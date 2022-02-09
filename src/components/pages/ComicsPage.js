import { Helmet } from "react-helmet";

import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const ComicsPage = () => {
   return (
      <>
         <Helmet>
            <meta
               name="description"
               content="Page list of Marvel comics"
            />
            <title>Comics page</title>
         </Helmet>
         
         <ErrorBoundary >
            <AppBanner />
            <ComicsList />
         </ErrorBoundary>
      </>
   )
}

export default ComicsPage;