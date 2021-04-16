# Notificon :: _Client-side favicon notifications._
Notificon is a BSD licensed javascript class for providing client-side favicon notifications.
Instead of requiring a number of favicons be created and served up to the client, you can specify a label and a favicon (default being the current favicon) and it will generate a favicon notification.

[Example is available here](https://makeable.github.io/Notificon/)

## Browser Support
Due to browser limitations, Favicons can only be changed post-render in Chrome 6+ and Firefox 2+ and Opera. Other browsers are currently unsupported.
Favicons must be served from the same domain due to browser security restrictions!

## Basic Usage
1) Include the notificon.js in your page
2) Call Notificon(12) to overlay the number 12 on your favicon.

## Advance Usage
Notificon can take 2 parameters - Notificon(label, options) where label is the text to overlay, and options can contain:
favicon: the url of a 16x16 favicon (default current favicon)
color: Color of the text (default #000000)
stroke: Stroke/outline colour (default rgba(255,255,255,0.85))

An empty label will clear your favicon to its original state. e.g. Notificon();

Favicon_url defaults to your primary favicon (if specified in head, or with fallback to /favicon.ico)

## Ender
Notificon is published as an ender package via NPM.
Build ender with 'notificon' and use in the browser using the $ syntax:
$.notificon(label, options)
