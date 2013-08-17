/*
 * Deus Duke
 * AVF 1308
 * Week 02
 *
 * Handles interaction with the trello api
 */

// hackery to allow deviceready to run in browser for testing
$(document).ready(function () {
	if (window.device) {
		document.addEventListener("deviceready", getTrelloInformation, false);
	}
	else {
		getTrelloInformation();
	}
});


function getTrelloInformation() {
	$.getJSON('https://api.trello.com/1/board/4d5ea62fd76aa1136000000c?key=103bf3b466a54737573ca743e6798d55&cards=open&lists=open',
		function (data) {
			console.log(data);

			// set the header name
			$('h3').text(data.name);

			// set the description
			$('#trello_data').append('<h4>' + data.desc + '</h4>');

			// container for all lists
			$('#trello_data').append('<section class="list_container">');

			// generate the lists
			$(data.lists).each(function(index, item) {
				$('.list_container').append('<div id="list_' + item.id + '" class="trello_list"><h3>' + item.name + '</h3><ul id="' + item.id + '"></ul></div>');
			});

			// generate the cards
			$(data.cards).each(function(index, card) {
				// descriptions are really long, limit chars
				var desc = card.desc.length > 250 ? card.desc.substring(0, 250) + '...' : card.desc;
				$('#' + card.idList).append('<div class="trello_card"><h4>' + card.name + '</h4><p>' + desc + '</p></div>');
			});
		}
	);
}