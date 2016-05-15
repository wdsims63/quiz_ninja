Object.defineProperty(Object.prototype, 'mixin', {
    enumerable: false,
    writable: false,
    configurable: false,
    value: function () {
        var i, max, object, property, description;
        for (i = 0, max = arguments.length; i < max; i++) {
            if (typeof arguments[i] === "object") {
                object = arguments[i];
                for (property in object) {
                    if (object.hasOwnProperty(property)) {
                        if (typeof object[property] === "object") {
                            this[property] = (object[property].constructor === Array) ? [] : {};
                            this[property].mixin(object[property]);
                        } else {
                            description = Object.getOwnPropertyDescriptor(object, property);
                            Object.defineProperty(this, property, description);
                        }
                    }
                }
            }
        }
        return this;
    }
});

Object.defineProperty(Object.prototype, 'copy', {
    enumerable: false,
    writable: false,
    configurable: false,
    value: function () {
        var object = Object.create(Object.getPrototypeOf(this));
        object.mixin(this);
        return object;
    }
});