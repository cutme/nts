// Navmenu

document.addEventListener('DOMContentLoaded', function() {
    
    const el = document.getElementsByClassName('js-open-navmenu');
    
    if (el.length>0) {
    
        const apla = document.getElementsByClassName('js-apla')[0],
              navmenu = document.getElementsByClassName('js-navmenu')[0],
              close = document.getElementsByClassName('js-close-navmenu')[0];
              
        const checkClass = function(e) {
            if( !e.target.parentNode.classList.contains('js-navmenu"') ) {
                closeMenu();
            } 
        }
    
        const closeMenu = function() {
            apla.classList.remove('is-visible');
            navmenu.classList.remove('is-visible');            
            document.removeEventListener('click', checkClass);
        }
        
        const openMenu = function() {
            apla.classList.add('is-visible');
            navmenu.classList.add('is-visible');
            
            setTimeout(function() {
                document.addEventListener('click', checkClass);
            }, 1000); 
            
        }
    
        close.addEventListener('click', closeMenu);

        for (let i =0; i<el.length; i++){
            el[i].addEventListener('click', openMenu);
            
        }
        
        document.addEventListener('keydown', function(evt) {
           // evt = evt || window.event;
            var isEscape = false;
            if ("key" in evt) {
                isEscape = (evt.key == "Escape" || evt.key == "Esc");
            } else {
                isEscape = (evt.keyCode == 27);
            }
            if (isEscape) {
                closeMenu();
            }
        });
    }
    
}, false);