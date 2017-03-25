var page = 'partials/search.html';
var main = document.querySelector('#main');
var footer = document.querySelector('#footer');

function go(url) {
    if (url && url !== page) {
        w3Http(url, function () {
            if (this.readyState == 4 && this.status == 200) {
                main.innerHTML = this.responseText;
                page = url;
            }
        }, null);
    }
}

w3IncludeHTML();