$(function(){

	$('#menu').mmenu({
		extensions	: [ 'effect-slide-menu', 'pageshadow' ],
		searchfield	: true,
		navbar 		: {
			title		: 'Home'
		},
		navbars		: [
			{
				position	: 'top',
				content		: [ 'searchfield' ]
			}, {
				position	: 'top',
				content		: [
					'prev',
					'title',
					'close'
				]
			}
		]
	});
	
	$('#slider').bxSlider({
		auto:true,
		nextSelector: '#slider-prev',
		prevSelector: '#slider-next',
		nextText: '<i class="fa fa-angle-right fa-2x"></i>',
		prevText: '<i class="fa fa-angle-left fa-2x"></i>'
		
	});
	
	
	$(".weekly-plans .weekly-tabs li").click(function () {
		
		var myButton = $(this).attr("id");
		
		$(this).addClass("active").siblings().removeClass("active");
		
		$(".weekly-plans .tabs > div").hide();
		
		$("." + myButton).fadeIn(1000);
		
	});
	
	$('#excellent-slider').bxSlider({
		auto:true,
		nextSelector: '#excellent-prev',
		prevSelector: '#excellent-next',
		nextText: '<i class="fa fa-angle-right fa-2x"></i>',
		prevText: '<i class="fa fa-angle-left fa-2x"></i>',
		pager: false
	});
	
	$('#video-slider').bxSlider({
		auto:false,
		nextSelector: '#video-prev',
		prevSelector: '#video-next',
		nextText: '<i class="fa fa-angle-right fa-2x"></i>',
		prevText: '<i class="fa fa-angle-left fa-2x"></i>',
		pager: false
	});
	
	$('#comments-slider').bxSlider({
		auto:true,
		nextSelector: '#comments-prev',
		prevSelector: '#comments-next',
		nextText: '<i class="fa fa-angle-right fa-2x"></i>',
		prevText: '<i class="fa fa-angle-left fa-2x"></i>',
		pager: false
	});
	
	$(".post-page .tabs li").click(function () {
		
		var myButton = $(this).attr("id");
		
		$(this).addClass("active").siblings().removeClass("active");
		
		$(".post-page .open-tabs > div").hide();
		
		$("." + myButton).fadeIn(1000);
		
	});
	
	
	$(".video-page .video-style .img-mask .mask a").click(function (){

		
		var vid =  $(this).attr("video-url");
		
		$(".video-page .container embed").remove();
		
		$(".video-page .container").append("<embed src='https://www.youtube.com/v/watch?v="+vid+"&feature=related'></embed>");

		
	});
	
	$(".contact-us .accordion.active .accordion-content").css("display","block");
	
	$(".contact-us .accordion .accordion-title").click(function () {
		
		$(this).next().slideToggle(400);
		
		$(this).parent().siblings().children().next().slideUp(300);
		
		$(this).parent().toggleClass("active").siblings().removeClass("active");
				
	});
	
		$(".top-bar ul li form a").click(function ()
		{
			$(this).siblings().toggleClass("active")
		});

		$(".top-bar ul li .social-header").click(function ()
		{
			$(this).siblings().slideToggle(500);
	
		});
	
	
	
	
	
	
	
	
	
	
});

        var initPhotoSwipeFromDOM = function(gallerySelector) {
        
            // parse slide data (url, title, size ...) from DOM elements 
            // (children of gallerySelector)
            var parseThumbnailElements = function(el) {
                var thumbElements = el.childNodes,
                    numNodes = thumbElements.length,
                    items = [],
                    figureEl,
                    linkEl,
                    size,
                    item;
        
                for(var i = 0; i < numNodes; i++) {
        
                    figureEl = thumbElements[i]; // <figure> element
        
                    // include only element nodes 
                    if(figureEl.nodeType !== 1) {
                        continue;
                    }
        
                    linkEl = figureEl.children[0]; // <a> element
        
                    size = linkEl.getAttribute('data-size').split('x');
        
                    // create slide object
                    item = {
                        src: linkEl.getAttribute('href'),
                        w: parseInt(size[0], 10),
                        h: parseInt(size[1], 10)
                    };
        
        
        
                    if(figureEl.children.length > 1) {
                        // <figcaption> content
                        item.title = figureEl.children[1].innerHTML; 
                    }
        
                    if(linkEl.children.length > 0) {
                        // <img> thumbnail element, retrieving thumbnail url
                        item.msrc = linkEl.children[0].getAttribute('src');
                    } 
        
                    item.el = figureEl; // save link to element for getThumbBoundsFn
                    items.push(item);
                }
        
                return items;
            };
        
            // find nearest parent element
            var closest = function closest(el, fn) {
                return el && ( fn(el) ? el : closest(el.parentNode, fn) );
            };
        
            // triggers when user clicks on thumbnail
            var onThumbnailsClick = function(e) {
                e = e || window.event;
                e.preventDefault ? e.preventDefault() : e.returnValue = false;
        
                var eTarget = e.target || e.srcElement;
        
                // find root element of slide
                var clickedListItem = closest(eTarget, function(el) {
                    return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
                });
        
                if(!clickedListItem) {
                    return;
                }
        
                // find index of clicked item by looping through all child nodes
                // alternatively, you may define index via data- attribute
                var clickedGallery = clickedListItem.parentNode,
                    childNodes = clickedListItem.parentNode.childNodes,
                    numChildNodes = childNodes.length,
                    nodeIndex = 0,
                    index;
        
                for (var i = 0; i < numChildNodes; i++) {
                    if(childNodes[i].nodeType !== 1) { 
                        continue; 
                    }
        
                    if(childNodes[i] === clickedListItem) {
                        index = nodeIndex;
                        break;
                    }
                    nodeIndex++;
                }
        
        
        
                if(index >= 0) {
                    // open PhotoSwipe if valid index found
                    openPhotoSwipe( index, clickedGallery );
                }
                return false;
            };
        
            // parse picture index and gallery index from URL (#&pid=1&gid=2)
            var photoswipeParseHash = function() {
                var hash = window.location.hash.substring(1),
                params = {};
        
                if(hash.length < 5) {
                    return params;
                }
        
                var vars = hash.split('&');
                for (var i = 0; i < vars.length; i++) {
                    if(!vars[i]) {
                        continue;
                    }
                    var pair = vars[i].split('=');  
                    if(pair.length < 2) {
                        continue;
                    }           
                    params[pair[0]] = pair[1];
                }
        
                if(params.gid) {
                    params.gid = parseInt(params.gid, 10);
                }
        
                return params;
            };
        
            var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
                var pswpElement = document.querySelectorAll('.pswp')[0],
                    gallery,
                    options,
                    items;
        
                items = parseThumbnailElements(galleryElement);
        
                // define options (if needed)
                options = {
        
                    // define gallery index (for URL)
                    galleryUID: galleryElement.getAttribute('data-pswp-uid'),
        
                    getThumbBoundsFn: function(index) {
                        // See Options -> getThumbBoundsFn section of documentation for more info
                        var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                            pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                            rect = thumbnail.getBoundingClientRect(); 
        
                        return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
                    }
        
                };
        
                // PhotoSwipe opened from URL
                if(fromURL) {
                    if(options.galleryPIDs) {
                        // parse real index when custom PIDs are used 
                        // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                        for(var j = 0; j < items.length; j++) {
                            if(items[j].pid == index) {
                                options.index = j;
                                break;
                            }
                        }
                    } else {
                        // in URL indexes start from 1
                        options.index = parseInt(index, 10) - 1;
                    }
                } else {
                    options.index = parseInt(index, 10);
                }
        
                // exit if index not found
                if( isNaN(options.index) ) {
                    return;
                }
        
                if(disableAnimation) {
                    options.showAnimationDuration = 0;
                }
        
                // Pass data to PhotoSwipe and initialize it
                gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
                gallery.init();
            };
        
            // loop through all gallery elements and bind events
            var galleryElements = document.querySelectorAll( gallerySelector );
        
            for(var i = 0, l = galleryElements.length; i < l; i++) {
                galleryElements[i].setAttribute('data-pswp-uid', i+1);
                galleryElements[i].onclick = onThumbnailsClick;
            }
        
            // Parse URL and open gallery if it contains #&pid=3&gid=1
            var hashData = photoswipeParseHash();
            if(hashData.pid && hashData.gid) {
                openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
            }
        };
        
        // execute above function
        initPhotoSwipeFromDOM('.my-gallery');
        


