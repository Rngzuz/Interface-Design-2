function load(element, url) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            wrap.innerHTML = xhr.responseText;
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

    var MyRouter = new Router();

    MyRouter.register({
        title: 'Search',
        path: '/',
        callback: function (state) {
            document.title = state.title;
            header.classList.remove('red', 'green');
            header.classList.add('teal');

            load(wrap, '/search.html');
        }
    });

    MyRouter.register({
        title: 'Locations',
        path: '/locations',
        callback: function (state) {
            document.title = state.title;
            header.classList.remove('red', 'teal');
            header.classList.add('green');

            load(wrap, '/locations.html');
        }
    });

    MyRouter.init();
})();