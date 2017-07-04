function loadData() {
	var $body = $('body');
	var $wikiElem = $('#wikipedia-links');
	var $nytHeaderElem = $('#nytimes-header');
	var $nytElem = $('#nytimes-articles');
	var $greeting = $('#greeting');
	// clear out old data before new request
	$wikiElem.text("");
	$nytElem.text("");
	// load streetview
	// YOUR CODE GOES HERE!
	var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	url += '?' + $.param({
		'api-key': "fe80d4c8d59141df819c1e0b494ce758"
	});
	$.getJSON("url", function (data){
		var items = [];
  $.each( data, function( key, val ) {
    items.push( "<li id='" + key + "'>" + val + "</li>" );
  });
 
  $( "<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
  }).appendTo( "body" );
	})
	return false;
};

function init() {
	var street = $('#street').val();
	var city = $('#city').val();
	var streetView = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + street + ', ' + city;
	$('#bg').attr('src', streetView)
}
$('#form-container').submit(loadData);