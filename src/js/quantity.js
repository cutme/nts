document.addEventListener('DOMContentLoaded', function() {

    let quantity = document.getElementsByClassName('js-quantity');
    
    for (let i = 0; i < quantity.length; i ++) {
    
        let spinner = quantity[i],
            input = spinner.getElementsByTagName('input')[0],
            btnUp = spinner.getElementsByClassName('button--up')[0],
            btnDown = spinner.getElementsByClassName('button--down')[0],
            min = input.getAttribute('min'),
            max = input.getAttribute('max'),
            newVal;

        btnUp.addEventListener('click', function() {
            let oldValue = parseFloat(input.value),
                event = new Event('change');
         
            if (oldValue >= max) {
                newVal = oldValue;
            } else {
                newVal = oldValue + 1;
            }

            input.value = newVal;            
            input.dispatchEvent(new Event('change', { 'bubbles': true })) 
        });

        btnDown.addEventListener('click', function() {
            let oldValue = parseFloat(input.value);
            
            if (oldValue <= min) {
                newVal = oldValue;
            } else {
                newVal = oldValue - 1;
            }
        
            input.value = newVal;            
            input.dispatchEvent(new Event('change', { 'bubbles': true })) 
        });
    }

}, false);