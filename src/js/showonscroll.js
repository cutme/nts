// showOnScroll

document.addEventListener('DOMContentLoaded',function() {

    const el = document.getElementsByClassName('anim');
    
    const isInView = function(el) {
		let bottomOfWindow = (window.pageYOffset || window.scrollY) + window.innerHeight  ;
		
		if ( el.getBoundingClientRect().top + (window.pageYOffset || window.scrollY) < bottomOfWindow ) {
			return true;
		}
	};
	
	let lastScrollTop = 0;
	
	for (let i = 0; i < el.length; i++) {
	    
		if (isInView(el[i])) {
			el[i].className += ' anim--visible';
		}
	}
   

	function init() {
	    // Check direction of scroll
	    let st = window.pageYOffset || document.documentElement.scrollTop;

        lastScrollTop = st;

        // Show or remove from viewport
        for (let j = 0; j < el.length; j++) {
            let bottomOfObject = el[j].getBoundingClientRect().top + st,
                bottomOfWindow = st + window.innerHeight;

            if (bottomOfWindow > bottomOfObject + 200) {
                el[j].classList.add('anim--visible');
            } 
		}
	}

	window.addEventListener('scroll', init);
	
}, false);