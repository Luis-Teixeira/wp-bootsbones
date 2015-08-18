# WP - BootsBones - Grunt Scss


WP BootsBones GS is a Wordpress Theme based on [Bones](http://themble.com/bones/).
Powered with Bower, Scss and Bootstrap 3+

####features:
 - uglify js
 - autoprefixer
 - cssmin
 - livereload

#### Version
1.2.2


### Installation - Dependencies

You need Node JS [node js](https://nodejs.org/)

You need grunt installed globally:

```sh
$ npm install -g grunt-cli
```
and Bower installed. Bower is a command line utility.
```sh
$ npm install -g bower
```

### Installation
clone in theme folder (wordpress/wp-content/themes/)
```sh
$ git clone git@bitbucket.org:luispteixeira/wp-bootsbones-gs.git
$ cd wp-bootsbones-gs/sources
$ npm install
$ bower install
$ grunt
```

### Development

watch js, css, php files and do livereload:
```sh
$ grunt watch
```
### Distribution
distrubution task (compress scss, minify css, autoprefix, uglify, ect)
```sh
$ grunt dist
```

### Todo's
 - Change theme thumbnails
 - Compress/Minify images
 - Shell task (deploy theme - prod/staging/dev)


##### dev notes
- All scss and js developing must be done in source folder (wp-bootsbones-gs/sources/)
- Always add theme images in this folder (wp-bootsbones-gs/sources/images) NOT on 'library' folder
- To add new js files (concat js), in gruntfile.js search for 'themes_js' (wp-bootsbones-gs/sources)
- To add css files (minicss), in gruntfile.js search for 'themes_css' (wp-bootsbones-gs/sources)
- to add scss files, use @ import method in style.scss or similar scss file (wp-bootsbones-gs/sources/scss) ex: @ import 'example';


License
----
MIT

**Free Software, Hell Yeah!**