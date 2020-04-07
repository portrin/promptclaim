const checkType = (_object, _class) => {
    if (!_object instanceof _class) {
        throw TypeError;
    }
}

module.exports = {
    checkType
}
