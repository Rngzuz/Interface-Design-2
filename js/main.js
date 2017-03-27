(function () {
    var toggle = document.querySelector('#toggle');

    toggle.addEventListener('click', function () {
        this.classList.toggle('active');
    });
})();