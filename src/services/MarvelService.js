class MarvelService {

   _apiBase = 'https://gateway.marvel.com:443/v1/public/characters';
   _apiKey = 'apikey=1a1e050ba5da983bcd89302906561d04';
   _charOffset = 210;

   getResource = async (url) => {
      const res = await fetch(url);
   
      if (!res.ok) {
         throw new Error(`Could not fetch: ${url}, status is: ${res.status}`);
      }
   
      return await res.json();
   };

   getAllCharacters = async (offset = this._charOffset) => {
      const res = await this.getResource(`${this._apiBase}?orderBy=name&limit=9&offset=${offset}&${this._apiKey}`);
      return res.data.results.map(this._tranformCharacter);
   }

   getCharacter = async (id) => {
      const res = await this.getResource(`${this._apiBase}/${id}?${this._apiKey}`);
      return this._tranformCharacter(res.data.results[0]);
   }

   _tranformCharacter = (res) => {
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

}

export default MarvelService;