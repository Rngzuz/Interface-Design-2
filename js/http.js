var Http = function () { };

Http.prototype.send = function (options) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolve(xhr);
            } else {
                reject(xhr);
            }
        };

        /*xhr.onerror = function () {
            reject(xhr);
        };*/

        xhr.open(options.method, options.url);
        xhr.send();
    });
};

Http.prototype.get = function (url) {
    return this.send({
        url: url,
        method: 'GET'
    });
};