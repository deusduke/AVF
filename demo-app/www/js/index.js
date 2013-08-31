/*
 * Deus Duke
 * AVF 1308
 * Week 03
 *
 */
var destinationType;
var pictureSource;

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

        window.onerror = function(message, url, lineNumber) {
            console.log("Error: "+message+" in "+url+" at line "+lineNumber);
        }
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        destinationType: navigator.camera.DestinationType;
        pictureSource: navigator.camera.PictureSourceType;
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

// bind all pageinit events
$(document).on("pageinit", '#pgContacts', function() {
    function onSuccess(contacts) {
        for (var i = 0; i < contacts.length; ++i) {
            $("#contacts").append("<li>" + contacts[i].name.formatted + "</li>");
        };
    }

    function onError(error) {
        navigator.notification.alert(error);
    }

    var contactList = new ContactFindOptions(); 
    contactList.filter=""; 
    contactList.multiple=true;
    var fields = ["*"];  //"*" will return all contact fields
    navigator.contacts.find(fields,  onSuccess, onError, contactList );
});

$(document).on("pageinit", '#pgDevice', function() {
    $("#device_info").html(
        "<p> Device Name: " + device.name + "</p>" +
        "<p> Device Cordova: " + device.cordova + "</p>" +
        "<p> Device Platform: " + device.platform + "</p>" +
        "<p> Device UUID: " + device.uuid + "</p>" +
        "<p> Device Model: " + device.model + "</p>" +
        "<p> Device Version: " + device.version + "</p>"
    );
});

$(document).on("pageinit", '#pgInstagram', function() {
    $.getJSON('https://api.instagram.com/v1/tags/snow/media/recent?client_id=bca8022f75704d5cb9bc3bf10682f51a&callback=?',
        function(result){
            $(result.data).each(function(index, item) {
                $('#insta_data').append('<div class="image_wrapper"><img src="' + item.images.standard_resolution.url + '" /></div>');
            });
        }
    );
});

$(document).on("pageinit", '#pgTrello', function() {
    $.getJSON('https://api.trello.com/1/board/4d5ea62fd76aa1136000000c?key=103bf3b466a54737573ca743e6798d55&cards=open&lists=open',
        function (data) {
            console.log(data);

            // set the header name
            $('#trello_data').append("<h3>" + data.name + "</h3>");

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
});

$(document).on("pageinit", "#pgGeolocation", function() {

    function onSuccess(position) {

        navigator.notification.alert('working');

        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        var myLatlng = new google.maps.LatLng(latitude, longitude);
        var mapOptions = {
            zoom: 12,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'My Location'
        });
    }

    function onError(error) {
        if (error == 1) {
            navigator.notification.alert('Turn on geolocation services');
        }

        navigator.notification.alert('Geolocation does not appear to be working :(');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError, {timeout: 5000});
});

$(document).on("pageinit", '#pgGallery', function() {

    function getPhoto(source) {
        var options = { 
            destinationType: navigator.camera.PictureSourceType.File_URI,
            sourceType: source
        };

        navigator.camera.getPicture(
            onSuccess, 
            onFail, 
            options
        );
    }

    function onSuccess(source) {
        //navigator.notification.alert('It\'s working: ' + message);
        
        $('#gallery_image').attr('src', source);
    }

    function onFail(message) {
        navigator.notification.alert('Failed because: ' + message);
    }

    getPhoto(navigator.camera.PictureSourceType.PHOTOLIBRARY);
});
