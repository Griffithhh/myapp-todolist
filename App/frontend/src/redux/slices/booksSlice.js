import {createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import {v4 as uuid} from "uuid";
import createBookWithID from "../../utils/createBookWithID";
import axios from "axios"
import {setError} from "./errorSlice";
import error from "../../components/Error/Error";




const initialState = {
    books: [],
    isLoadingViaAPI: false
}

export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async  (url, thunkAPI) =>{
        try {
  const res = await axios.get(url)
        return res.data
        } catch (error){
            if (error.response &&  error.response.status === 503) {
              throw  thunkAPI.dispatch(setError('Server is too busy. Try again later.'))
            }else{

                   thunkAPI.dispatch(setError(error.message))
            throw thunkAPI.rejectWithValue(error)

                }
}

    }

)


const booksReducer = createSlice({
    name: "books",
    initialState,
    reducers: {
        addBook: (state, action) =>{
            state.books.push(action.payload)
        },
        removeBook: (state, action) =>{
            return {...state, books: state.books.filter((book) => book.id !== action.payload)}
        },
        toggleFavorite: (state, action) => {

            state.books.forEach((book)=>{
                if(book.id === action.payload){
                    book.isFavorite = !book.isFavorite
                }
            })
            // return state.map((book) =>
            // book.id === action.payload
            //     ? {...book, isFavorite: !book.isFavorite}
            //     : book
            //
            //
            // )
        }

    },

    //Option 1
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.isLoadingViaAPI = true;
            })

            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.isLoadingViaAPI = false;
                if (action.payload.title && action.payload.author) {
                    state.books.push(createBookWithID(action.payload, 'API'));
                }

            })
            .addCase(fetchBooks.rejected, (state) => {
                state.isLoadingViaAPI = false;
            })



//Option 2
//     extraReducers: (builder) => {
//         builder.addCase(fetchBooks.fulfilled, (state, action) => {
//           if(action.payload.title && action.payload.title && action.payload.author){
//                state.books.push(createBookWithID(action.payload, 'API'))
//             }
//
//
//         })
//     }
    }
})






export const {addBook, removeBook, toggleFavorite} = booksReducer.actions

     export const selectBook = (state)=> state.books.books
    export const selectIsLoadingViaAPI = (state)=> state.books.isLoadingViaAPI
export default  booksReducer.reducer