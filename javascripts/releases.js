$(function() {
  var spinner = new Spinner({color: '#444', radius: 5, length: 4, width: 2, top: 0});
  var downloadContainer = $('.js-download-container').each(function() { spinner.spin(this); });
  if(downloadContainer.length > 0) {
    $.ajax({
      url: 'http://github.dev/git-tfs/git-tfs/releases.atom',
      complete: function() {
        spinner.stop();
      },
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
