const validator = require('../helpers/validate');

const validateBook = (req, res, next) => {
    const rule = {
        name: 'required|string',
        author: 'required|string',
        isbn: 'required|string',
        language: 'required|string',
        date: 'required|string',
        funfact:'string'
    }

    validator(req.body, rule, {}, (err, status) =>{
        if(!status){
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                date: err
        });
        } else {
            next();
        }
    });
};

module.exports = {
    validateBook
}