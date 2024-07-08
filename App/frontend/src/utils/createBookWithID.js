
import {v4 as uuid} from 'uuid';
const createBookWithID = (book, source) => {
    return {
        ...book,
        source,
        isFavorite: false,
        id: uuid()
    }
}
export default createBookWithID;