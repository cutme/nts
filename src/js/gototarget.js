import ScrollToPlugin from 'gsap/ScrollToPlugin';

document.addEventListener('DOMContentLoaded', function() {

	const speed_calculate = function (target) {
    	let base_speed  = 35,
    		page_offset = window.pageYOffset || document.documentElement.scrollTop,
        	offset_diff = Math.abs(target - page_offset),
        	speed = ((offset_diff * base_speed) / 1000)/100;

    	return speed;
	};
	
	const moveTo = function(src, offset) {
	
	    let window_pos = window.pageYOffset || window.scrollY || document.documentElement.scrollTop, target = 0;

        if (src != null) {

    	    const obj = document.getElementById(src);
            target = window_pos + obj.getBoundingClientRect().top;	        
	    }

	    TweenLite.to(window, speed_calculate(target), {
    		scrollTo: {
    			y: target - Number(offset),
    			autoKill: false
    		},
    		ease: Power1.easeOut
    	});
	}
	
	const getParams = function(src) {
    	
    	let hash = src.substring(src.indexOf('#')+1),
	        offset = document.getElementById(hash).getAttribute('data-offset');
	        
    	moveTo(hash, offset);
	}

	const clickAction = function(e) {
        getParams(e.currentTarget.getAttribute('href'));   
	    e.preventDefault() ? e.preventDefault() : e.preventDefault = false;
	};


	const btn = document.getElementsByClassName('js-goto');


    if (btn.length>0) {
    	for (let i = 0; i < btn.length; i++) {
            btn[i].addEventListener('click', clickAction);
        }
    }
    
    if (window.location.hash) {
        window.onload = function() {
            getParams(window.location.hash);
        }
    }


}, false);