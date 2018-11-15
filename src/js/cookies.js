import Cookies from 'js-cookie';

document.addEventListener('DOMContentLoaded', function() {

    const el = document.getElementById('cookies');
    
    const init = function() {
    
        const accept = el.getElementsByClassName('js-accept')[0];

        if (Cookies.get('klosinskints-cookies') != 1) {

            el.classList.remove('move-out');
        }
        
        accept.addEventListener('click', function() {
            Cookies.set("klosinskints-cookies", 1, { expires: 356, path: '/' });
            console.log(Cookies.get('klosinskints-cookies'));
            el.classList.add('move-out');
        });
    }

    el ? init() : false;

}, false);