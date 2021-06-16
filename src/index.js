import express from 'express'
import bodyParser from 'body-parser'
import handleBooksRequest from './books'
import adaptRequest from './helpers/adapt-request'

const app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.all('/books', booksController);
app.get('/books/:id', booksController);

/**
 * This controller will control all the requests and response for this API
 * @param req
 * @param res
 */
function booksController (req, res) {
    const httpRequest = adaptRequest(req);
    handleBooksRequest(httpRequest)
        .then(({ headers, statusCode, data }) =>
            res
                .set(headers)
                .status(statusCode)
                .send(data)
        )
        .catch(e => res.status(500).end());
}

const PORT = process.env.PORT || 9090;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
