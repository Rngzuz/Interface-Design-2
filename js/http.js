var Http = function () { };

Http.prototype.send = function (options) {
    options.withCredentials = options.withCredentials || false;
    options.async = options.async || false;
    options.timeout = options.timeout || 5000;
    options.headers = options.header || [];
    options.method = options.method || 'GET';
    options.body = options.body || null;
    options.user = options.user || null;
    options.password = options.password || null;

    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();

        xhr.open(options.method, options.url, options.async, options.user, options.password);
        xhr.timeout = options.timeout;

        for (var i = 0; i < options.headers.length; i++) {
            xhr.setRequestHeader(
                options.headers[i][0],
                options.headers[i][1]
            );
        }

        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statuxText: xhr.statusText
                });
            }
        };

        xhr.onerror = function () {
            reject({
                status: this.status,
                statuxText: xhr.statusText
            });
        };

        xhr.send(options.body);
    });
};

Http.prototype.get = function (options) {
    options.method = 'GET';
    return this.send(options);
};