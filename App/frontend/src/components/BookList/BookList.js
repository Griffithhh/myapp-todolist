import {useDispatch, useSelector} from "react-redux";
import {BsBookmarkStarFill, BsBookmarkStar} from "react-icons/bs";
import '../BookList/BookList.css'
import {removeBook, toggleFavorite, selectBook} from '../../redux/slices/booksSlice'
import {
    selectTitleFilter,
    setOnlyFavoriteFilter,
    selectAuthorFilter,
    selectOnlyFavoriteFilter
} from '../../redux/slices/filterSlice'

const BookList = () => {
    const books     = useSelector(selectBook);
    const titleFilter = useSelector(selectTitleFilter)
    const authorFilter = useSelector(selectAuthorFilter)
    const dispatch = useDispatch()
    const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter)

const handleToggleFavorite = (id) => {
        dispatch(toggleFavorite(id));
}
const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title.toLowerCase().includes(titleFilter.toLowerCase())
    const matchesAuthor = book.author.toLowerCase().includes(authorFilter.toLowerCase())
    const matchesFavorite = onlyFavoriteFilter ? book.isFavorite : true
    if( matchesAuthor && matchesTitle && matchesFavorite){
        return true
    }
})
   const highlightMatch = (text, filter) => {
        if(!filter) return text

       const regex = new RegExp(`(${filter})`,  'gi')
       return text.split(regex).map((part, i)=>{
           if (part.toLowerCase() === filter.toLowerCase()){
               return <span key={i} className="highlight" >{part}</span>
           }
           return part
       })
   }

  return (
    <div className="app-block book-list">
     <h2>Book List</h2>
        {books.length === 0 ? ( <p>No books available</p>) : (
            <ul>{filteredBooks.map((book, i)=>
            <li key={book.id}>
                <div className="book-info"> {++i}. {highlightMatch(book.title, titleFilter)} {book.title} by <strong>{highlightMatch(book.author, authorFilter)}</strong>
                      ({book.source})
                </div>
                <div className="book-actions">
                    <span onClick={()=> handleToggleFavorite(book.id) } > {book.isFavorite ? (
                        <BsBookmarkStarFill className="star-icon" />
                    ) : ( <BsBookmarkStar  className="star-icon" />)}  </span>

                    <button onClick={()=>{dispatch(removeBook(book.id))}}> Delete</button></div>

        </li>
        )}
        </ul>
        )}
    </div>
  );
};

export default BookList;