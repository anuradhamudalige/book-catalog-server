import makeHttpError from "../helpers/http-error";

/**
 * All the endpoints will be described in here. This class is act as the service layer.
 * @param bookList is the DOA layer.
 * @returns {(function(*=): Promise<{headers: {"Content-Type": string}, data: string, statusCode: number}|{headers: {"Content-Type": string}, data: string, statusCode: *}>)|*}
 */
export default function makeBooksEndpointHandler({ bookList }) {
    return async function handle(httpRequest) {
        switch (httpRequest.method) {
            case 'POST':
                // return postBook(httpRequest) // implementation is not needed

            case 'GET':
                return getBooks(httpRequest);

            default:
                return makeHttpError({
                    statusCode: 405,
                    errorMessage: `${httpRequest.method} method not allowed.`
                })
        }
    }

    async function getBooks (httpRequest) {
        const { id } = httpRequest.pathParams || {}
        const { from, to } = httpRequest.queryParams || {}

        const result = id
            ? await bookList.findById({ bookId: id })
            : await bookList.getItems({from, to});

        return {
            headers: {
                'Content-Type': 'application/json'
            },
            statusCode: 200,
            data: JSON.stringify(result)
        }
    }
}
