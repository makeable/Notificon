(function(){
  
  var findFaviconTag = function findFaviconTag(notificon) {
    var link_tags = document.getElementsByTagName('link');
    for (var i=0; i < link_tags.length; i++) {
      if (notificon && (/\bnotificon\b/i).test(link_tags[i].getAttribute('rel'))) {
        return link_tags[i];
      } else if (!notificon && (/\bicon\b/i).test(link_tags[i].getAttribute('rel'))) {
        return link_tags[i];
      }
    }
    return false;
  };
  
  var getExistingFavicon = function getExistingFavicon() {
    var favicon = findFaviconTag();
    return favicon ? favicon.getAttribute('href') : '/favicon.ico';
  };
  
  var removeNotificon = function removeNotificon() {
    var notificon = findFaviconTag(true);
    if (notificon) {
      notificon.parentNode.removeChild(notificon);
      removeNotificon();
    }
  };
  
  var changeFavicon = function changeFavicon(canvas) {
    var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'icon notificon';
    link.href = canvas.toDataURL("image/png");
    removeNotificon();
    document.getElementsByTagName('head')[0].appendChild(link);
  };
  
  var drawLabel = function drawLabel(canvas, label) {
    var context = canvas.getContext("2d");
    context.font = "10px monospace";
    context.textAlign = 'right';
    context.textBaseline = "top";
    context.strokeStyle = 'rgba(255,255,255,0.85)';
    context.lineWidth = 4;
    context.strokeText(label,16,6);
    context.fillText(label,16,6);
  };
  
  var imgToCanvas = function imgToCanvas(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var context = canvas.getContext("2d");
    context.drawImage(img, 0, 0);
    return canvas;
  };
  
  var createNotificon = function createNotificon(label, favicon) {
      if (!favicon) {
        favicon = getExistingFavicon();
      }
      var img = document.createElement("img");
      img.src = favicon;
      img.onload = function() {
        var canvas = imgToCanvas(img);
        if (label) {
          drawLabel(canvas, label);
        }
        try {
          changeFavicon(canvas);
        } catch(e) {
		  		if (console) {
          	console.log('Notificon: cannot use icons located on a different domain (' + favicon + ')');
	  	  	}
        }
        
      };
      img.onerror = function() {
				if (console) {
        	console.log('Notificon: image not found (' + favicon + ')');
				}
      };
  };
  
  this.Notificon = function(label, favicon) {
    createNotificon(label, favicon);
  };
})();
