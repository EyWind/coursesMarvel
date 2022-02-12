import useHttp from '../hooks/http.hook';

const useMarvelService = () => {
   const {loading, error, process, setProcess, request, cleartError} = useHttp();
   const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
   const _apiKey = 'apikey=1a1e050ba5da983bcd89302906561d04'; // jayn acc
   // const _apiKey = 'apikey=88be05a169eddb49d1108fa96b45fae6'; // jack miller acc, pass - jackmiller.test
   const _charOffset = 210;

   const getAllCharacters = async (offset = _charOffset) => {
      const res = await request(`${_apiBase}characters?orderBy=name&limit=9&offset=${offset}&${_apiKey}`);
      return res.data.results.map(_transformCharacter);
   }

   const getCharacter = async (id) => {
      const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
      return _transformCharacter(res.data.results[0]);
   }
   
   const getAllComics = async (offset = 0) => {
      const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
      return res.data.results.map(_transformComics);
   }
   
   const getComic = async (id) => {
      const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
      return _transformComics(res.data.results[0])
   }
   
   const getCharacterByName = async (name) => {
      const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
      return res.data.results.map(_transformCharacter);
   }

   const _transformCharacter = (res) => {
      return {
         id: res.id,
         name: res.name,
         thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
         descr: res.description ? `${res.description.slice(0, 210)}...` : 'There is no description for this character',
         homepage: res.urls[0].url,
         wiki: res.urls[1].url,
         comics: res.comics.items
      }
   }

   const _transformComics = (res) => {
      return {
         id: res.id,
         title: res.title,
         description: res.description || 'There is no description',
         pageCount: res.pageCount ? `${res.pageCount} p.` : 'No information about the number of pages',         
         price: res.prices[0].price ? `${res.prices[0].price}$` : "NOT AVAILABLE",
         language: res.textObjects.language || 'en-us',
         thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension
      }
   }

   return {loading, error, process, setProcess, cleartError, getAllCharacters, getCharacter, getAllComics, getComic, getCharacterByName};

}

export default useMarvelService;