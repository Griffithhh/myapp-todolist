import {selectTitleFilter, setOnlyFavoriteFilter, selectOnlyFavoriteFilter, selectAuthorFilter, resetFilters, setTitleFilter, setAuthorFilter} from "../../redux/slices/filterSlice";
import {useDispatch, useSelector} from "react-redux";
import './Filter.css'

const Filter = () => {

    const dispatch = useDispatch()
   const titleFilter =  useSelector(selectTitleFilter)
     const authorFilter =  useSelector(selectAuthorFilter)
    const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter)

    const handleTitleFilterChange = (e) => {
  dispatch(setTitleFilter(e.target.value))
    }
    const handleResetFilters = () => {
        dispatch(resetFilters())
    }
    const handleOnlyFavoriteFilterChange = () => {
        dispatch(setOnlyFavoriteFilter())
    }
      const handleAuthorFilterChange = (e) => {
  dispatch(setAuthorFilter(e.target.value))
    }

  return (
    <div className="app-block filter">
        <div className="filter-row">
            <div className="filter-group">
                <input type="text" value={titleFilter} onChange={handleTitleFilterChange}
                       placeholder="Filter by title..."/>
            </div>
            <div className="filter-group">
                <label> <input type="checkbox" checked={onlyFavoriteFilter} onChange={handleOnlyFavoriteFilterChange} />  Only Favorite </label>
            </div>

            <button type="button" onClick={handleResetFilters}>Reset filters</button>

            <div className="filter-group">
                <input type="text" value={authorFilter} onChange={handleAuthorFilterChange}
                       placeholder="Filter by author..."/>
            </div>
        </div>
    </div>
  );
};

export default Filter;