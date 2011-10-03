/*
Notificon :: Client-side Favicon Notifications - Usage: Notificon(label='',favicon_url={default_favicon})
=========================================================================================================

Copyright (c) 2011 Matt Williams <matt@makeable.co.uk>. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are
permitted provided that the following conditions are met:

   1. Redistributions of source code must retain the above copyright notice, this list of
      conditions and the following disclaimer.

   2. Redistributions in binary form must reproduce the above copyright notice, this list
      of conditions and the following disclaimer in the documentation and/or other materials
      provided with the distribution.

THIS SOFTWARE IS PROVIDED BY MATT WILLIAMS ''AS IS'' AND ANY EXPRESS OR IMPLIED
WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL MATT WILLIAMS OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

The views and conclusions contained in the software and documentation are those of the
authors and should not be interpreted as representing official policies, either expressed
or implied, of Matt Williams.

*/

(function(){
	
	var unsupported = false;
	
	var checkSupport = function checkSupport() {
		if (unsupported) {
			return false;
		}
		if (!document.createElement('canvas').getContext) {
			unsupported = true;
			if (console) {
				console.log('Notificon: requires canvas support');
			}
			return false;
		}
		return true;
	}
  
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
			if (!checkSupport()) {
				return false;
			}
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
