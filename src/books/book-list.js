import {documentToBook, documentToSimpleBook} from "./book";

/**
 * This class will filter, retrieve the requested data from the client. This class is act as the DAO layer.
 * @param bookCollection is the actual data from the storage (This can be shaped to act as database as well)
 * @returns {Readonly<{getItems: (function({from?: *, to?: *}): *), findById: ((function({bookId: *}): Promise<unknown[]|null>)|*)}>}
 */
export default function makeBookList ({ bookCollection }) {
    return Object.freeze({
        getItems,
        findById
    });

    async function getItems({from = 0, to = 50}) {
        const books = bookCollection;
        return books.filter(item => item.isbn).slice(from, to).map(documentToSimpleBook);
    }

    async function findById ({ bookId }) {
        const books = bookCollection;
        const found = books.find(book => book.isbn === bookId);
        if (found) {
            return documentToBook(found);
        }
        return null;
    }

}
