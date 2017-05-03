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
            loader.classList.add('active');

            MyHttp
                .get({
                    url: '/search.html',
                    async: true,
                    timeout: 10000
                })
                .then(
                function (response) {
                    window.setTimeout(function () {
                        wrap.innerHTML = response;
                        header.classList.remove('red', 'green');
                        header.classList.add('teal');
                        loader.classList.remove('active');
                    }, 500);
                },
                function (error) {
                    console.error(error);
                });
        }
    });

    MyRouter.register({
        title: 'Locations',
        path: '/locations',
        callback: function (state) {
            loader.classList.add('active');

            MyHttp
                .get({
                    url: '/locations.html',
                    async: true,
                    timeout: 10000
                })
                .then(
                function (response) {
                    window.setTimeout(function () {
                        wrap.innerHTML = response;
                        header.classList.remove('red', 'teal');
                        header.classList.add('green');
                        loader.classList.remove('active');
                    }, 500);
                },
                function (error) {
                    console.error(error);
                });
        }
    });

    MyRouter.init();
})();