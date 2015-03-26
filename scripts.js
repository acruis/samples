$(document).ready(function() {
  // Dotdotdot
  $('.event-content-text').dotdotdot();
  $('.featurette-cat-content').dotdotdot();
  
  // Featured carousel
  $('#featuredCarousel').carousel({
    cycle: true,
    pause: "hover"
  }).on('slide.bs.carousel', function(e) {
    // Caption animation on sliding out
    if (e.relatedTarget.children[0].children[0].className.indexOf('right') > -1) { // if is carousel-caption-right
      $('.carousel-caption-right').velocity({
        'opacity': 0
      }, {
        'duration': 'fast',
        'queue': false
      });
    } else if (e.relatedTarget.children[0].children[0].className.indexOf('left') > -1) { // if is carousel-caption-left
      $('.carousel-caption-left').velocity({
        'opacity': 0
      }, {
        'duration': 'fast',
        'queue': false
      });
    } else {
      $('.carousel-caption-center').velocity({
        'opacity': 0
      }, {
        'duration': 'fast',
        'queue': false
      });
    }
  }).on('slid.bs.carousel', function(e) {
    // Caption animation on sliding in
    if (e.relatedTarget.children[0].children[0].className.indexOf('right') > -1) { // if is carousel-caption-right
      $('.carousel-caption-right').css({
        'right': '17vw'
      });
      $('.carousel-caption-right').velocity({
        'right': '15vw',
        'opacity': 1
      }, {
        'queue': false
      });
    } else if (e.relatedTarget.children[0].children[0].className.indexOf('left') > -1) {      
      $('.carousel-caption-left').css({
        'left': '13vw'
      });
      $('.carousel-caption-left').velocity({
        'left': '15vw',
        'opacity': 1
      }, {
        'queue': false
      });
    } else {
      $('.carousel-caption-center').css({
        'right': '2vw',
        'left': 0,
      });
      $('.carousel-caption-center').velocity({
        'right': 0,
        'opacity': 1
      }, {
        'queue': false
      });
    }
  });
  
  // Sidelink click to switch
  $('.sidelink').click(function(e) {
    e.preventDefault();
    var postID = $(this).attr('href');
    var titleID = '#h' + postID.substring(2); // '#p42' -> '42'
    $('.sidelink-selected').removeClass('sidelink-selected');
    $(this).addClass('sidelink-selected');
    $('.sidelink-title-active').velocity({'right': '-40px'}, {'queue': false}).velocity({'opacity': 0}, function() {
      $('.sidelink-title-active').css({'right': '40px'}).addClass('sidelink-title-inactive').removeClass('sidelink-title-active');
      $(titleID).css({'opacity': 0, 'right': '40px'}).velocity({'right': 0}, {'queue': false}).velocity({'opacity': 1}).addClass('sidelink-title-active').removeClass('sidelink-title-inactive');
    });
    $('.sidelink-post-active').velocity({'opacity': 0}, function() {
      $(this).addClass('sidelink-post-inactive').removeClass('sidelink-post-active');
      $(postID).css({'opacity': 0}).velocity({'opacity': 1}).addClass('sidelink-post-active').removeClass('sidelink-post-inactive');
    });
  });
  
  // Scroll to top
  $(window).scroll(function() {
    // Show when scrolled
    if ($(this).scrollTop() > 100) {
      $('.scrollup').fadeIn();
    } else {
      $('.scrollup').fadeOut();
    }
  });
  // Scroll when clicked
  $('.scrollup').click(function() {
    $('html, body').animate({scrollTop: 0}, 600);
    return false;
  });
  
  // Related posts
  var relPostsLimit = $('.related-posts-nav-next').css('order');
  var currentPost = 0;
  var allPosts = $('.related-posts-list-p');
  $('.related-posts-nav').click(function(e) {
    e.preventDefault();
    var that = this;
    $('.related-posts-list-p li').velocity({'opacity':0}, function() {
      if ($(that).hasClass('related-posts-nav-prev')) {
        // Go back. The guy in front cannot be displayed so we hide it if he's being displayed.
        if ($(window).width() >= 1080) {
          allPosts.find('li[data-position="' + ((currentPost + 1) % relPostsLimit) + '"]').css({'display':'none'});
        }
        // If window size larger than 1080, we keep the currentPost. If window size < 1080, we hide it.
        if ($(window).width() < 1080) {
          allPosts.find('li[data-position="' + currentPost + '"]').css({'display':'none'});
        }
        // Then we display the previous one and move the currentPost pointer to the appropriate position.
        if (--currentPost < 0) currentPost = relPostsLimit - 1;
        allPosts.find('li[data-position="' + currentPost + '"]').css({'display':'block'});
      } else {
        // Go forward. The current guy cannot be displayed so hide it.
        allPosts.find('li[data-position="' + currentPost + '"]').css({'display':'none'});
        // Move currentPost forward.
        currentPost = (currentPost + 1) % relPostsLimit;
        allPosts.find('li[data-position="' + currentPost + '"]').css({'display':'block'});
        // If window size larger than 1080, we make currentPost + 1 visible too.
        if ($(window).width() >= 1080) {
          allPosts.find('li[data-position="' + ((currentPost + 1) % relPostsLimit) + '"]').css({'display':'block'});
        }
      }
      $('.related-posts-list-p li').velocity({'opacity':1});
    });
  });
  
  $(window).resize(function() {
    if ($(window).width() < 1080) {
      $('.related-posts-list-p li[data-position="' + ((currentPost + 1) % relPostsLimit) + '"]').css({'display':'none'});
    } else {
      $('.related-posts-list-p li[data-position="' + ((currentPost + 1) % relPostsLimit) + '"]').css({'display':'block'});
    }
  });
  
  // Readjust empty sidebar page title. VanillaJS
  var hasWidget = document.getElementsByClassName('widget-wrapper');
  if (!hasWidget.length) {
    document.getElementsByClassName('sidelink-title-wrapper')[0].children[0].classList.remove("col-sm-9", "pull-right");
  }
});