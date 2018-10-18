import Pace from '../js/pace.js';

window.paceOptions = { elements: {
        selectors: ['iframe']
    } } 


Pace.start();

Pace.on('done', function() {   

	const element = document.getElementById("cover");

    if (element) {

		const event = function(e) {
            element.removeEventListener("transitionend", event);
            document.body.removeAttribute('style');
            document.getElementById('cover').remove();
        }

        element.addEventListener("transitionend", event, false);
        document.getElementsByClassName('pace')[0].remove();

        // Add videos to prevet loading lag

        let video = document.getElementsByClassName('js-video');

        for (let i = 0; i < video.length; i ++) {

            let iframe = document.createElement('iframe'),
                src = video[i].getAttribute('data-video');

            iframe.width = '500';
            iframe.height = '281';
            iframe.src = src;
            iframe.frameborder = '0';
            iframe.allow="autoplay; encrypted-media";
            iframe.allowfullscreen;

            video[i].appendChild(iframe);
        }
        
        
        // Add form to prevent loading lag
        
        let form = document.getElementsByClassName('js-freelesson')[0];
        let script = document.createElement('script'),
            src = form.getAttribute('data-src');
        
        script.async;
        script.setAttribute('data-uid', 'fff9955f29');
        script.src = src;

        form.appendChild(script);
        
        
    }
});

