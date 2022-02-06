import './searchForm.scss';

const SearchForm = () => {

   return(
      <form className='form'>
         <h2>Or find a character by name:</h2>
         <div className='form__wrapper'>
            <input 
               type='text' 
               name="name" 
               id="name" 
               className='form__input'
               placeholder='Enter Name'
            />
            <button className="button button__main" type='submit'>
                    <div className="inner">
                        Find
                    </div>
            </button>
         </div>
      </form>
   )
}

export default SearchForm;