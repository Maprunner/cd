# Maprunner IOF Control Description Quiz

## What is this?

You can [try the quiz here.](http://www.maprunner.co.uk/cd)

If you need some help then all of the answers are here:

- [International Orienteering Federation Control Description 2018 specification.](https://orienteering.sport/iof/rules/control-descriptions/)
- [Maprunner IOF pictorial control description guide.](https://www.maprunner.co.uk/iof-control-descriptions)

## Latest news

The quiz has now been updated to the IOF 2024 specification, so you can test your knowledge of railways.

To add a new language you need to create a translation file, based on the [xx.js](https://github.com/Maprunner/cd/blob/master/app/lang/xx.js) file in the cd/src/lang directory. Then email it to me or create a pull request, and I will build it in.

## Build notes

To run on a local server: # npm start

The application is then at localhost:3000 and includes hot module replacement.

To build for release to the internet: # npm run build

To add a new language, update Quiz.jsx.

## Technology

The original version was mainly an excuse to try React, but various other things turned out to be needed as well:

- [React](https://facebook.github.io/react/index.html): A javascript library for user interfaces. As nice as
  everyone said it would be, after getting over the move to ES6.
- [Webpack](https://webpack.github.io/): A module bundler. I wasn't intending to use this but it
  turned out to be the easiest way to get things working. The hot module replacement is impressive, but it feels like I've installed
  an awful lot of things which I now need to rely on not to break. And it did cause a lot of grief when I needed to update it...
- [npm](https://www.npmjs.com/): The node package manager.
- [IcoMoon App](https://icomoon.io/app/#/select): A really nice utility to generate the icon fonts files.
- [Inkscape](https://inkscape.org/en/): SVG editor.

The second major release moved to React 16, and added Progressive Web App features, so in theory you can now install this and run it without an internet connection.

The third major release moved to Bootstrap for components, and incorporated the IOF 2018 updates.

The IOF 2024 update has also been covered with the addition of the "railway" symbol.
