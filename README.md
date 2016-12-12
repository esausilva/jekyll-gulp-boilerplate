
jekyll-gulp-boilerplate
=======================

A boilerplate project including full setup for Jekyll, GulpJS, SASS, PostCSS, BrowserSync, Autoprefixer and deploy to GitHub Pages using Gulp.

The boilerplate is loaded with Bootstrap and jQuery (via CDN) to get you started with your projects. I have also included some SEO optimizations and [Open Graph](http://ogp.me/) tags / [Twitter Cards](https://dev.twitter.com/cards/overview) tags to tell Facebook and Twitter how shares to your site should display (**Note:** Look at `_includes/metas.html` and change accordingly).

## System Preparation

To use this starter boilerplate project, you'll need the following things installed on your machine.

1. [Jekyll](http://jekyllrb.com/) - `$ gem install jekyll`
2. [NodeJS](http://nodejs.org) - use the installer.
3. [GulpJS](https://github.com/gulpjs/gulp) - `$ npm install -g gulp` (mac users may need sudo)
4. [jekyll-minifier](https://github.com/digitalsparky/jekyll-minifier) - `$ gem install jekyll-minifier`

## Local Installation

1. Clone this repo, or download it into a directory of your choice.
2. Inside the directory, run `npm install`.

## Usage

I have two Yaml configuration files: `_config.yml` and `_config.dev.yml` that when running in development mode the *dev* configuration file overrides `baseurl` and `jekyll-minifier` default values.

### Development Mode

Running development mode will not minify your HTML or Javascript. 

Also if you are deploying to GitHub Pages - [Project Pages](https://help.github.com/articles/user-organization-and-project-pages/#project-pages), overriding the `baseurl` to *empty ("")* is essential to display the website correctly in **localhost**.

```shell
$ NODE_ENV=dev gulp
```

### Jekyll

As this is just a Jekyll project, you can use any of the commands listed in their [docs](http://jekyllrb.com/docs/usage/)

## Deploy with Gulp to GitHub Pages (Production Mode)

To accomplish this I am using [gulp-gh-pages](https://github.com/rowoot/gulp-gh-pages) and the final site will have HTML, CSS and Javascript minified.

In a nutshell, you need to have your project in GitHub and deploy to to a *gh-pages* branch. Then to deploy just run 

```shell
$ NODE_ENV=prod gulp deploy
```

or simply

```shell
$ gulp deploy
``` 

Something to note is that in the gulp *deploy* task `gulp.src()` needs to be the path to your final site folder, which by default will be `_site`. If you change the `destination` in your `_config.yml` file, be sure to reflect that in your gulpfile.

### Getting Your Branch Prepared

```shell
$ git init
$ git add .
$ git commit -m 'First Commit'
$ git remote add origin git@github.com:username/repository-name.git
$ git push -u origin master
$ git checkout --orphan gh-pages
$ git rm -rf .
$ touch README.md
$ git add README.md
$ git commit -m "Init gh-pages"
$ git push --set-upstream origin gh-pages
$ git checkout master
```

And finally you can deploy to GitHub Pages

```shell
$ gulp deploy
```

After deploying run the Gulp `clean` task since while deploying `gulp-gh-pages` creates a **.publish** directory with your entire site, and in my opinion it just a waste of hard disk space to leave it alone.

```shell
$ gulp clean
```

or simply *Right Click -> Delete* that direcotry to delete it.

## Screenshots

This is how the boilerplate template looks like.

![JPG](http://i.imgur.com/2vmwgkgl.jpg)

And here's a GIF showing the CSS injecting.

![GIF](http://f.cl.ly/items/373y2E0e0i2p0E2O131g/test-gif.gif)

## Credits

This boilerplate was built upon [shakyShane](https://github.com/shakyShane/jekyll-gulp-sass-browser-sync) starter project. 

## Miscellaneous

More information on [Twitter Cards](https://dev.twitter.com/cards/overview).

Twitter Cards [validator tool](https://cards-dev.twitter.com/validator) lets you preview your card. 

Facebook [Sharing Debugger](https://developers.facebook.com/tools/debug/) lets you preview your Open Graph tags.