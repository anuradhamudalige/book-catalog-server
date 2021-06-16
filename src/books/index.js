import makeBookList from "./book-list";
import makeData from "../data-source";
import makeBooksEndpointHandler from "./books-endpoint";

const bookCollection = makeData(); // This should be our database
const bookList = makeBookList({bookCollection});
const booksEndpointHandler = makeBooksEndpointHandler({bookList});

export default booksEndpointHandler;
