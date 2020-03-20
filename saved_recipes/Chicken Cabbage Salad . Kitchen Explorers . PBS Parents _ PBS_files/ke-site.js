// Close Welcome Div Container
jQuery(document).ready(function($){
						   
	$(".welcome .close-welcome").click(function(){
		$(this).parents(".welcome").animate({ opacity: 'hide' }, "slow");
	});

});

// CAROUSEL
(function($){
    $(document).ready(function() {
    		$(".slider").jCarouselLite({
        		btnNext: ".next",
        		btnPrev: ".prev",
        		visible: 14
    		});
		});
	})(jQuery);

(function($){
    	$(document).ready(function() {
			$('img.captify').captify({
				// all of these options are... optional
				// ---
				// speed of the mouseover effect
				speedOver: 'fast',
				// speed of the mouseout effect
				speedOut: 'normal',
				// how long to delay the hiding of the caption after mouseout (ms)
				hideDelay: 500,	
				// 'fade', 'slide', 'always-on'
				animation: 'slide',		
				// text/html to be placed at the beginning of every caption
				prefix: '',		
				// opacity of the caption on mouse over
				opacity: '0.7',					
				// the name of the CSS class to apply to the caption box
				className: 'caption-bottom',	
				// position of the caption (top or bottom)
				position: 'bottom',
				// caption span % of the image
				spanWidth: '100%'
			});
			});
		})(jQuery);

(function($){
    	$(document).ready(function() {
			$(".entry-content iframe").wrap("<div class='pinit-iframe'/>");
		});
		})(jQuery);

// PINTEREST BUTTON ON IMAGES
$(function () {
	
		$('.single .entry-content img.alignleft').pinit();
		$('.single .entry-content img.alignright').pinit();
		$('.single .entry-content img.alignnone').pinit();
		$('.single .entry-content img.aligncenter').pinit();
	
	});

// Add classes to most popular widget
(function($){
    $(document).ready(function() {
        // Add classes to popular posts plugin
        $('#wpp-3 li').each(function(i, item) {
            $(item).addClass('item' + (i + 1));
        });
    });
})(jQuery);

// ADD CLASS TO MODAL LINK
jQuery(document).ready(function($){
	$('[data-reveal-id="videoModal"]').each(function (i) {
    		$(this).addClass('modal' + (i%4));
	});
});

// Add classes to most popular widget
(function($){
    $(document).ready(function() {
        // Add classes to popular posts plugin
        $('#wpp-6 li').each(function(i, item) {
            $(item).addClass('item' + (i + 1));
        });
    });
})(jQuery);


// Add classes to recent posts
(function($){
    $(document).ready(function() {
        // Add classes to popular posts plugin
        $('#recent li').each(function(i, item) {
            $(item).addClass('item' + (i + 1));
        });
    });
})(jQuery);

$(function() {
    $( "#tabs" ).tabs();
});

jQuery().ready(function($) {
// validate the comment form when it is submitted
$("#commentform").validate();
});

// Drop-Down Menu
jQuery(document).ready(function($){
		$('#cssdropdown li.headlink').hover(
			function() { $('ul', this).css('display', 'block'); },
			function() { $('ul', this).css('display', 'none'); });
	});

// Comment Icon hover
jQuery(document).ready(function($){
   // Change the image of hoverable images
   $(".comment-icon").hover( function() {
       var hoverImg = HoverImgOf($(this).attr("src"));
       $(this).attr("src", hoverImg);
     }, function() {
       var normalImg = NormalImgOf($(this).attr("src"));
       $(this).attr("src", normalImg);
     }
   );
});

function HoverImgOf(filename)
{
   var re = new RegExp("(.+)\\.(gif|png|jpg)", "g");
   return filename.replace(re, "$1_hover.$2");
}
function NormalImgOf(filename)
{
   var re = new RegExp("(.+)_hover\\.(gif|png|jpg)", "g");
   return filename.replace(re, "$1.$2");
}