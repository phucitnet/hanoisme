$(function() {
  function getScrollbarWidth() {
    var outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps

    document.body.appendChild(outer);

    var widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = 'scroll';

    // add innerdiv
    var inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);

    var widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
  }

  function scaleContent() {
    var oriSize = 1280,
      screenScale = (screen.width - getScrollbarWidth() - 300) / oriSize,
      mainContent = $('#maincontent');
      detailContent = $('.detail-content');

    mainContent.css({
      'transform': 'scale(' + screenScale + ')',
      'width': oriSize
    });
    detailContent.css({
      'transform': 'scale(' + screenScale + ')',
          'width': oriSize
    })
    // $('#wrapper').height(mainContent.height() * screenScale);
  }

  if (screen.width > 1024) {
    scaleContent();
  } else {
    // Fix for su kien
    var maxSuKienHeight = 0;
    $('.sukien').each(function() {
      if ($(this).height() > maxSuKienHeight) {
        maxSuKienHeight = $(this).height();
      }
    }).height(maxSuKienHeight);
  }

  // Menu scroll
  var mainMenu = $('#mainmenu');
  $('#menu a').on('click', function(event) {
    event.preventDefault();
    var $anchor = $(this), scrollPos = $($anchor.attr('data-id')).offset().top;
    if (screen.width > 1024) {
      $('html, body').stop().animate({
        scrollTop: scrollPos
      }, 500);
    } else {
      if ($anchor.attr('href') == '#home') {
        scrollPos -= 50;
      }
      $('html, body').scrollTop(scrollPos);
      mainMenu.css('transform', 'translate3d(-100%, 0, 0)');
    }
  });

  // Mobile menu
  $('#mobile-bar .navbar-toggle').click(function(event) {
    event.preventDefault();
    mainMenu.css('transform', 'translate3d(0, 0, 0)');
  });

  $('#mainmenu .closebtn').click(function(event) {
    event.preventDefault();
    mainMenu.css('transform', 'translate3d(-100%, 0, 0)');
  });

  //inline-editable

    $.fn.editable.defaults.mode = 'inline';
  
    $('#ign').editable({
      url: '/post',
      type: 'text',
      pk: 1,
      name: 'ign',
      title: 'Nhập tên in game của bạn'
    });
    $('#openid').editable({
      url: '/post',
      type: 'text',
      pk: 2,
      name: 'openid',
      title: 'Nhập open ID của bạn'
    });
    $('#hoten').editable({
      url: '/post',
      type: 'text',
      pk: 3,
      name: 'hoten',
      title: 'Nhập họ tên của bạn'
    });
    $('#sodienthoai').editable({
      url: '/post',
      type: 'tel',
      pk: 4,
      name: 'sodienthoai',
      title: 'Nhập số điện thoại của bạn'
    });
});
