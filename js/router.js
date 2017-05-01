var Router = function () {
    var _this = this;
    this.paths = new Map();
    this.current = window.location.pathname;

    window.addEventListener('popstate', function (event) {
        var state = _this.paths.get(event.state) || null;

        if (state !== null) {
            document.title = state.title;
            state.callback(state);
        }
    });

    document.addEventListener('click', function (event) {
        var target = event.target.getAttribute('data-navigate') || null;

        if (target !== null) {
            event.preventDefault();
            _this.navigate(target);
        }
    });
};

Router.prototype.register = function (state) {
    this.paths.set(state.path, state);
};

Router.prototype.navigate = function (path) {
    var state = this.paths.get(path);

    if (state && path !== this.current) {
        document.title = state.title;
        this.current = path;
        window.history.pushState(state.path, state.title, state.path);
        state.callback(state);
    } else if (path !== this.current) {
        console.log('404');
    }
};

Router.prototype.init = function () {
    var state = this.paths.get(window.location.pathname);

    if (state) {
        state.callback(state);
    } else {
        console.log('404');
    }
};