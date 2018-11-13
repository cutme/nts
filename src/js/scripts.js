import InView from 'inview';

(function(){

  $(function () {
    var nowActive=0;
    var prevActive=0;
    
    var isMacLike = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i)?true:false;
    var isIOS = navigator.platform.match(/(iPhone|iPod|iPad)/i)?true:false;
    if(isMacLike||isIOS) {
      $('body').addClass('isOS');
    }
    
    $('.menu-link button').click(function(ev){
      $('#all').toggleClass('show-menu');
      ev.preventDefault();
      ev.stopPropagation();
    });
    $('.full-list').click(function(ev){
      ev.stopPropagation();
    });
    $('#all').click(function(){
      $('#all').removeClass('show-menu');
    });
    
    
    var initFinishPopup = function(){
      $('.finish .rate').hover(function(){
        var buttons=$('.finish .rate');
        for(var i=0;i<buttons.length;i++){
          buttons.eq(i).addClass('active');
          if(i==$(this).index()-1) { break; }
        }
      }, function(){
        $('.finish .rate.active').removeClass('active');
      });
      $('.finish .rate').click(function(){
        $('#rate').val($(this).index());
        $('.finish .rate.active1').removeClass('active1');
        var buttons=$('.finish .rate');
        for(var i=0;i<buttons.length;i++){
          buttons.eq(i).addClass('active1');
          if(i==$(this).index()-1) { break; }
        }
      });
      
      $('.finish .form').submit(function(ev){
        ev.preventDefault();
        $.ajax({
          type: $(this).attr('method'),
          url: $(this).attr('action'),
          data: $(this).serialize(),
          success: function(data)
          {
            var html=$('<div>');
            html.html(data);
            if(html.find('.finish .form fieldset').length) {
              $('.finish .form fieldset').html(html.find('.finish .form fieldset').html());
            }
            else {
              $('#layer').fadeOut(function(){
                $('#layer').remove();
              });
            }
          }
        });
      });
    }
    
    var initPopup = function(){
      $('#popup .btn-close button').click(function(ev){
        $('#layer').fadeOut(function(){
          $('#layer').remove();
        });
      });
      $('.profile-link').click(function(ev){
        ev.preventDefault();
        $('.layer-popup').addClass('show');
        $('#password-popup').addClass('show');
        $('#password-popup').css({top: Math.max($('html').scrollTop(), $('body').scrollTop())+50});
      });
      initFinishPopup();
    }
    initPopup();
    
    
    
    if($('nav').length)
    {
      $(window).scroll(function(){
        var pos=Math.max($('body').scrollTop(), $('html').scrollTop());
        if(pos>$('nav').offset().top) {
          $('#all').addClass('is-fixed');
        }
        else { 
          $('#all').removeClass('is-fixed');
        }
      });
    }
    
    $('.open-submenu').click(function(ev){
      ev.preventDefault();
      $(this).parent().toggleClass('open-visible');
    })
    
    
    var doneLesson = function(){
      $('.link-done').click(function(ev){
        ev.preventDefault();
        $.ajax({
          type: 'get',
          url: $(this).attr('href'),
          cache: false,
          success: function(data)
          {
            try {
              var data=JSON.parse(data);
              if(data.link) { location.href=data.link; }
            } catch(e) {
              var obj=$('<div>');
              obj.html(data);
              var layer=$('#layer', obj);
              if(layer.length)
              {
                $('body').append('<div id="layer" style="display: none;">'+layer.html()+'</div>');
                $('#layer').fadeIn();
                initPopup();
              }
              else {
                location.href='/wycena-pracy/'; 
              }
            }
          }
        });
      });
    }
    doneLesson();
    
    var saveNotice = function(){
      var inputs=$('.page-form input, .page-form textarea');
      var param=[];
      for(var i=0;i<inputs.length;i++) {
        if(inputs.eq(i).attr('type')=='checkbox') {
          if(inputs.eq(i).prop('checked')) {
            param.push(inputs.eq(i).attr('name')+'='+inputs.eq(i).val());
          }
        } else {
          param.push(inputs.eq(i).attr('name')+'='+inputs.eq(i).val());
        }
      }
      $.ajax({
        type: 'post',
        url: location.href,
        data: param.join('&'),
        success: function(data)
        {
          if(data!='true') { alert('Notatki nie zostały zachowane. Prawdopodobnie nastąpiło wylogowania z systemu'); }
        }
      });
    }
    $('.page-form input, .page-form textarea').change(function(){
      clearTimeout(timer);
      saveNotice();
    });
    var timer=null;
    $('.page-form input, .page-form textarea').keyup(function(){
      clearTimeout(timer);
      timer=setTimeout(function(){
        saveNotice();
      }, 1000);
      
    });
    
    $('.inline-form input').click(function(ev){
      $(this).parents('.group').find('input').prop('disabled', true);
      var now = new Date();
      var hour=now.getHours();
      var minutes=now.getMinutes();
      var text=$(this).attr('data-answer');
      var $this=$(this);
      if(text)
      {
        $(this).parents('.group').append('<p class="answer"><span class="item-avatar"><img src="/wycena-pracy/assets/images/avatar.jpg" alt="">'+(hour<10?'0':'')+hour+':'+(minutes<10?'0':'')+minutes+'</span><span class="loader"><span></span><span></span><span></span></span></p>');
      }
      setTimeout(function(){
        $this.parents('.group').find('.loader').remove();
        if(text)
        {
          $this.parents('.group').find('.answer').append(text);
        }
        if($this.parents('.group').next().length)
        {
          $this.parents('.group').parent().append('<div class="group show"><p class="answer answer-last"><span class="item-avatar"><img src="/wycena-pracy/assets/images/avatar.jpg" alt="">'+(hour<10?'0':'')+hour+':'+(minutes<10?'0':'')+minutes+'</span><span class="loader"><span></span><span></span><span></span></span></p></div>');
          setTimeout(function(){
            $('.answer-last').parent().remove();
            $this.parents('.group').next().addClass('show');
          }, 1200);
        }
      }, 1200);
      
    });
    
    var posTop=-1;
    var elements=$('.show-scroll');
    var initScroll = function(ev){
      var x = Math.max($('body').scrollTop(), $('html').scrollTop());
      if(posTop!=x)
      {
        posTop=x;
        var height=$(window).height();
        for(var i=0;i<elements.length;i++)
        {
          if(posTop+height>elements.eq(i).offset().top&&posTop<elements.eq(i).offset().top+elements.eq(i).height()-100)
          {
            elements.eq(i).addClass('show');
          }
        }
      }
    }
    
    setInterval(initScroll, 50);
    
    
    
    /* LP */
    
    $('.js-faq .col-left ul h3').click(function(){
        $(this).parent().toggleClass('open');
    });
    
    
    
    $('.js-faq .col-right .btn').click(function(ev){
        ev.preventDefault();

        $('.layer-popup').addClass('show');
        $('#contact-popup').addClass('show');
        $('#contact-popup').css({top: Math.max($('html').scrollTop(), $('body').scrollTop())+50});
    });

    $('.popup-outer .button-close').click(function(ev){
        ev.preventDefault();
        $('.popup-outer').removeClass('show');
        $('.layer-popup').removeClass('show');
    });
    
    
    $('#contact-popup .form').submit(function(ev){
      ev.preventDefault();
      $.ajax({
        type: $(this).attr('method'),
        url: $(this).attr('action'),
        data: $(this).serialize(),
        success: function(data)
        {
          var html=$('<div>');
          html.html(data);
          $('#contact-popup .form fieldset').html(html.find('#contact-popup .form fieldset').html());
        }
      });
    });
    
    $('.small-form').submit(function(ev){
      ev.preventDefault();
      $.ajax({
        type: $(this).attr('method'),
        url: $(this).attr('action'),
        data: $(this).serialize(),
        success: function(data)
        {
          var html=$('<div>');
          html.html(data);
          $('.small-form fieldset').html(html.find('.small-form fieldset').html());
        }
      });
    });
    
    
    // Inside carousel
    
    let slider = document.getElementsByClassName('js-slider')[0];
    
    if (slider) {

        let inview = InView(slider, function(isInView, data) {
            
            if (data.elementOffsetTopInViewHeight < data.inViewHeight - 100) {
            
                $('.js-slider').slick({
                    autoplay: true,
                    dots: true,
                    appendDots: $('#insideDots'),
                    customPaging : function(slider, i) {
                        return '<i class="dot"></i>';
                    },
                    nextArrow: $('.c-inside .next'),
                    prevArrow: $('.c-inside .prev'),
                    infinite: true,
                    speed: 500,
                    fade: true,
                    cssEase: 'linear',
                    asNavFor: '.js-slider-nav'
                });
                
                $('.js-slider-nav').slick({
                    dots: false,
                    arrows: false,
                    slidesToShow: 1,
                    asNavFor: '.js-slider',
                });
                
            
                $('.js-slider').on('afterChange', function(event, slick, direction){
                    $('.js-slideNum').text(slick.currentSlide + 1);
                });
                this.destroy();
            }
        });
    }
    
    
    
    // Details carousel
    
    let details = document.getElementsByClassName('js-details')[0];
    
    if (details) {

        let inview = InView(slider, function(isInView, data) {
            
            if (data.elementOffsetTopInViewHeight < data.inViewHeight - 100) {
            
                $('.js-details').slick({
                    autoplay: true,
                    nextArrow: $('.c-details .next'),
                    prevArrow: $('.c-details .prev'),
                    infinite: true,
                    speed: 500,
                    adaptiveHeight: true
                });

                this.destroy();
            }
        });
    }
    




   if($('.can-fixed').length)
    {
      
      $(window).scroll(function(){
        $('.can-fixed').each(function(i, elem){
            if (window.innerWidth >= 1050) {
              elem=$(elem);
              if($(document).scrollTop()>elem.parent().offset().top-80) { elem.addClass('fixed'); $('.can-fixed').css({marginTop: 0}); }
              else { elem.removeClass('fixed'); elem.css({marginTop: 0}); }
              var container=elem.parents('.columns');
              if(!container.length) { container=elem.parents('.container-fluid'); }
              if((container.offset().top+container.height())<($(document).scrollTop()+elem.height())) {
              
              elem.removeClass('fixed');
              elem.css({marginTop: Math.max(0, (container.height()-elem.height()-10))+'px'});
            }
          
          }
        });
        
      });
    }
   
    
  });
})();