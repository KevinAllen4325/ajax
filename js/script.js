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
	var street = $('#street').val();
	var city = $('#city').val();
	var streetView = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + street + ', ' + city;
	$('#bg').attr('src', streetView)
		//NYT JSON REQUEST
	var nytimesUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
	nytimesUrl += '?' + $.param({
		'api-key': "fe80d4c8d59141df819c1e0b494ce758"
		, 'q': city
		, 'sort': "newest"
	});
	console.log(nytimesUrl)
	$.getJSON(nytimesUrl, function (data) {
		$nytHeaderElem.text('New York Times Articles About ' + city);
		articles = data.response.docs;
		var headline = [];
		for (var i = 0; i < articles.length; i++) {
			if (articles[i].print_page !== 0) {
				headline.push('<li class="article"><a href="' + articles[i].web_url + '" target="_blank">' + articles[i].headline.main + '</a><br><p>' + articles[i].snippet + '</p></li>')
			}
		}
		$("#nytimes-articles").append(headline);
		//Wiki search
		var wikiUrl = 'http://en.wikipedia.org/w/api.php';
		wikiUrl += '?' + $.param({
			'action': "opensearch"
			, 'search': city
			, 'format': "json"
			, 'callback': "wikiCallback"
		});
		$.ajax({
			url: wikiUrl
			, dataType: "jsonp"
			, success: function (response) {
				var articleList = response[1];
				for (var i = 0; i < articleList.length; i++) {
					articleStr = articleList[i];
					var url = 'http://en.wikipedia.org/wiki/' + articleStr;
					$wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
				};
			}
		});
	});
	return false;
};
$('#form-container').submit(loadData);