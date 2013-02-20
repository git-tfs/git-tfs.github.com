$(function() {
  var downloadContainer = $('.js-download-container');
  if(downloadContainer.length > 0) {
    $.ajax({
      url: 'http://github.dev/git-tfs/git-tfs/releases.atom',
      error: function() { console.log(arguments); },
      success: function(data) {
        var feed = $(data);
        var mostRecentBinary = feed.find('entry link[rel=enclosure]').first();
        var mostRecentRelease = mostRecentBinary.closest('entry');
        var title = mostRecentRelease.find('title').text();
        downloadContainer.html('<a href="' + mostRecentBinary.attr('href') + '" class="download-button">Download ' + title + '</a>');
      }
    });
  }
});
