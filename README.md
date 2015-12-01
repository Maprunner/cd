# Maprunner IOF Control Description Quiz

## What is this?
A way of finding out if you understand:

* [International Orienteering Federation Control Description 2004 specification.] 
(http://orienteering.org/wp-content/uploads/2010/12/IOF-Control-Descriptions-2004.pdf)
* [Maprunner IOF pictorial control description guide.] (http://www.maprunner.co.uk/?page_id=79)

## Latest news
First version now released and [available to try] (http://www.maprunner.co.uk/cd).

## Technology
This was mainly an excuse to try React, but various other things turned out to be needed as well:

* [React] (https://facebook.github.io/react/index.html): A javascript library for user interfaces. As nice as
everyone said it would be, after getting over the move to ES6.
* [Webpack] (https://webpack.github.io/): A module bundler. I wasn't intending to use this but it
turned out to be the easiest way to get things working. The hot module replacement is impressive, but it feels like I've installed
an awful lot of things which I now need to rely on not to break.
* [npm] (https://www.npmjs.com/): The node package manager.
* [IcoMoon App] (https://icomoon.io/app/#/select): A realy nice utility to generate the icon fonts files.
* [Inkscape] (https://inkscape.org/en/): SVG editor.

And having got this far, it looks like I need to think about [Flux] (https://facebook.github.io/flux/)
or [Redux] (https://github.com/rackt/redux) next.
