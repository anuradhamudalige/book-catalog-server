import requiredParam from "../helpers/required-param";

/**
 * Use this function to retrieve only the data which matters to the summary view.
 * Abstract info for the selected book
 * @param bookInfo
 * @returns {Readonly<{date, posterUrl, id, shortDescription, title, authors}>}
 */
export function documentToSimpleBook(bookInfo = requiredParam('bookInfo')){
    const book = getMandatoryValues(bookInfo);
    return Object.freeze(book);
}

/**
 * Use this function to retrieve all the data which matters to the detail view.
 * @param bookInfo
 * @returns {Readonly<{date, posterUrl, id, shortDescription, title, authors, pageCount, status, longDescription, categories}}
 */
export function documentToBook(bookInfo = requiredParam('bookInfo')){
    const book = getExtendedValues(bookInfo);
    return Object.freeze(book);

}

function getMandatoryValues({isbn, title, thumbnailUrl, authors, shortDescription, publishedDate}) {
    return {
        id: isbn,
        title: title,
        posterUrl: thumbnailUrl,
        authors: authors,
        shortDescription: shortDescription,
        date: publishedDate?.$date
    }
}

function getExtendedValues ({isbn, thumbnailUrl, publishedDate, ...otherValues}) {
    return {
        id: isbn,
        posterUrl: thumbnailUrl,
        date: publishedDate?.$date,
        ...otherValues
    }
}
