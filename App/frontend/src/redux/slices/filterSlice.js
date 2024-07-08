import {createSlice} from "@reduxjs/toolkit";



const initialState = {
    title: '',
    author: '',
    onlyFavorite: false

}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setTitleFilter: (state, action) => {
            // return {...state, title: action.payload}
            state.title = action.payload

        },
        setAuthorFilter: (state, action) => {
            // return {...state, title: action.payload}
            state.author = action.payload

        },
        setOnlyFavoriteFilter: (state) => {
            state.onlyFavorite = !state.onlyFavorite
        },

        resetFilters: () => {
            return {...initialState}
        }
    }
})
export const {setTitleFilter, setOnlyFavoriteFilter, setAuthorFilter, resetFilters} = filterSlice.actions
 export const selectTitleFilter = (state)=> state.filter.title
export const selectOnlyFavoriteFilter = (state)=> state.filter.onlyFavorite
export const selectAuthorFilter = (state)=> state.filter.author
console.log(filterSlice.actions.setOnlyFavoriteFilter())
console.log(filterSlice.actions)
export default  filterSlice.reducer