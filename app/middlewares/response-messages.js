//Function for error message
module.exports.errorMessage = (res, error, message = 'error', errCode = 500, next) => {
    let msg = 'An error occured: ';
    if (error.message) {
        msg = message + error.message;
    }
    const data = {
        message: msg,
        error: error
    };
    if (next !== undefined) {
        next(data);
    } else {
        res.status(errCode).send(data);
    }
};

//Function for success message
module.exports.successMessage = (res, data, message = 'Success!', next) => {
    if (data.stack) {
        errorMessage(res, data, 'Server Error: ');
    } else {
        if (next !== undefined) {
            next(data);
        } else {
            res.status(200).send(data);
        }
    }
};
