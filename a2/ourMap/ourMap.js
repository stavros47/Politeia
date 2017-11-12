function ourMap(array) {
    // What do we have to hold/track???
    var original = array;
    var current = original;
    return (function mapWithCallback(fn, callback) {
        // If fn is not a function return current Array
        if (!(fn instanceof Function)) {
            return current; }
        // map fn to array and save result to current array
        current = current.map(fn);
        // If callback is a function, execute callback
        if (callback instanceof Function) {
            callback.call(current, original); }
        return mapWithCallback; // We have to return something!
    })
}