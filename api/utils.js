const checkType = (obj, _class) => {
    const err = new TypeError(`the input object is not ${_class}`)
    if (obj == null) { return }
    else if((obj.constructor.name !== _class && Object.getPrototypeOf(obj.constructor).name !== _class)) {
        throw err;
    }
}

module.exports = {
    checkType
}
