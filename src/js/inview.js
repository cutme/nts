import InView from 'inview';

//document.addEventListener('DOMContentLoaded',function() {
    
    let el = document.getElementsByClassName('aaa')[0];
    
   
   
var inview = InView(el, function(isInView, data) {
  if (isInView) {
    if (data.elementOffsetTopInViewHeight < data.inViewHeight/2) {
      console.log(data.elementOffsetTopInViewHeight);
    } else {
      console.log('in view (bottom half)');
    }
  } else {
    if (data.windowScrollTop - (data.elementOffsetTop - data.inViewHeight) > data.inViewHeight) {
      console.log('not in view (scroll up)');
    } else {
      console.log('not in view (scroll down)');
    }
  }
});
    
    


//}, false);
