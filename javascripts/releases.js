$(function() {
  var downloadContainer = $('.js-download-container');

  var getReleases = function(url) {
    $.ajax({
      url: url,
      dataType: 'jsonp',
      success: function(data) {
        if(data.meta.status == 200) {
          getAssets(newestRelease(data.data).assets_url);
        } else {
          spinner.stop();
        }
      }
    });
  };

  var getAssets = function(url) {
    $.ajax({
      url: url,
      dataType: 'jsonp',
      success: function(data) {
        spinner.stop();
        if(data.meta.status == 200) {
          renderButton(data.data);
        }
      }
    });
  };

  var renderButton = function(assets) {
    var asset = assets[0];
    var html = '<a href="' + asset.download_url + '" class="download-button">Download ' + asset.name + '</a>';
    localStorage['lastReleaseButton'] = html;
    downloadContainer.html(html);
  };

  var renderLastButton = function() {
    var html = localStorage['lastReleaseButton'];
    if(html) {
      spinner.stop();
      downloadContainer.html(html);
    }
  };

  var newestRelease = function(releases) {
    var newest = releases[0];
    var i;
    for(i = 1; i < releases.length; i++) {
      newest = newestOfTwoReleases(newest, releases[i]);
    }
    return newest;
  };

  var newestOfTwoReleases = function(a, b) {
    var va = parseVersion(a.tag_name), vb = parseVersion(b.tag_name);
    if(newestOfTwoVersions(va, vb) === va) {
      return a;
    }
    return b;
  };

  var newestOfTwoVersions = function(va, vb) {
    var i;
    for(i = 0; i < va.length && i < vb.length; i++) {
      if(va[i] < vb[i]) {
        return vb;
      } else if(va[i] > vb[i]) {
        return va;
      }
    }
    return va.length < vb.length ? vb : va;
  };

  var parseVersion = function(tag) {
    tag = tag.substr(1); // tag name will have a 'v' at the beginning, e.g. 'v0.16.1'
    var parts = tag.split('.');
    var i;
    for(i = 0; i < parts.length; i++) {
      parts[i] = parseInt(parts[i]);
    }
    return parts;
  };

  if(downloadContainer.length > 0) {
    renderLastButton();
    getReleases('https://api.github.com/repos/git-tfs/git-tfs/releases');
  }
});
