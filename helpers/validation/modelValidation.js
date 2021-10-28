const stringValidation = (minStringLength, maxStringLength) => {
    //Minimum length will always be 2
    //String must start and end with [a-zA-Z0-9_]
    //FIXME: Does not include special characters
    return new RegExp(
        `^[\\w][\\w\n\.\+\(\)\*\? ,!-?]{${
            minStringLength - 2 > 0 ? minStringLength - 2 : 0
        },${maxStringLength - 2}}[\\w]$`
    );
};

module.exports = { stringValidation };
