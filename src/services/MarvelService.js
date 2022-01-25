import useHttp from '../hooks/http.hook';

const useMarvelService = () => {
   const {loading, error, request, cleartError} = useHttp();

   const _apiBase = 'https://gateway.marvel.com:443/v1/public/characters';
   const _apiKey = 'apikey=1a1e050ba5da983bcd89302906561d04';
   const _charOffset = 210;


   const getAllCharacters = async (offset = _charOffset) => {
      const res = await request(`${_apiBase}?orderBy=name&limit=9&offset=${offset}&${_apiKey}`);
      return res.data.results.map(_tranformCharacter);
   }

   const getCharacter = async (id) => {
      const res = await request(`${_apiBase}/${id}?${_apiKey}`);
      return _tranformCharacter(res.data.results[0]);
   }

   const _tranformCharacter = (res) => {
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

   return {loading, error, cleartError, getAllCharacters, getCharacter};

}

export default useMarvelService;