(function() {
	
	function init() {
		getBlogContent();
	}

	function getBlogContent() {
		let blogData;
		const http = new XMLHttpRequest();
		const blogUrl="http://serverlesspebbleit.s3-website-ap-southeast-2.amazonaws.com/content.json";
		http.open('GET', blogUrl);
		http.send();

		http.onreadystatechange = (data) => {
			if (data.type === 'readystatechange' && http && http.responseText) {
				blogData = http.responseText;
				populateBlogContent(JSON.parse(blogData));
			}
		};
	}

	function populateBlogContent(data) {
		let articleElements = '';
		if (data && data.blogList.length > 0) {
			for (let i = 0; i < data.blogList.length; i++) {
				articleElements += '<h2 class="article-header">' + data.blogList[i].title + '</h2>' + 
				'<div class="article-author">' + data.blogList[i].author + '</div>' +
				'<span class="article-timestamps">' + data.blogList[i].date + '</span>' +
				'<p class="article-description">' + data.blogList[i].description + '</p>' +
				'<p class="read-more-link"><a href="">Read More</a></p>';
					
			}
			if (articleElements !== undefined) {
				document.getElementsByClassName('article-contents')[0].innerHTML = articleElements;
			}
		}
	}

	init();
})();
