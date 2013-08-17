/*
 * Deus Duke
 * AVF 1308
 * Week 02
 *
 * Handles interaction with the instagram api
 */

// hackery to allow deviceready to run in browser for testing
$(document).ready(function () {
	if (window.device) {
		document.addEventListener("deviceready", getInstagramInformation, false);
	}
	else {
		getInstagramInformation();
	}
});

function getInstagramInformation() {
	$.getJSON('https://api.instagram.com/v1/tags/snow/media/recent?client_id=bca8022f75704d5cb9bc3bf10682f51a&callback=?',
		function(result){
			$('h3').html('Instagram\'s Recent Photos');

			$(result.data).each(function(index, item) {
				$('#insta_data').append('<div class="image_wrapper"><img src="' + item.images.standard_resolution.url + '" /></div>');
			});
	});
}