function load(element, url, success, error) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            success(xhr);
        } else {
            error(xhr);
        }
    };

    xhr.open('GET', url);
    xhr.send();
}

(function () {
    document.addEventListener('click', function (event) {
        var cssClass = event.target.getAttribute('data-toggle-class') || null;

        if (cssClass !== null) {
            event.target.classList.toggle(cssClass);
        }
    });

    var header = document.querySelector('#header');
    var wrap = document.querySelector('#wrap');
    var loader = document.querySelector('#loader');

    var MyRouter = new Router();
    var MyHttp = new Http();

    MyRouter.register({
        title: 'Search',
        path: '/',
        callback: function (state) {
            MyHttp.get('/search.html').then(success => console.log(success), error => console.error(error));
        }
    });

    MyRouter.register({
        title: 'Locations',
        path: '/locations',
        callback: function (state) {
            document.title = state.title;
            loader.classList.add('active');

            load(wrap, '/locations.html',
                function (xhr) {
                    setTimeout(function () {
                        header.classList.remove('red', 'teal');
                        header.classList.add('green');
                        wrap.innerHTML = xhr.responseText;
                        loader.classList.remove('active');
                    }, 400);
                },
                function (xhr) {
                    setTimeout(function () {
                        loader.classList.remove('active');
                    }, 400);
                });
        }
    });

    MyRouter.init();
})();