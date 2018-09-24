# id-kss-builder
A KSS theme for creating styleguides in Boston University
repositories.

This theme uses Grunt and node-sass to compile Sass to CSS.

## Get started

Run `npm install` to install dependencies, then run `grunt` to
begin watching your Sass files. This builder places Sass files
in the `css-dev` folder.

You can also run `grunt build` to manually build the Sass anytime.

### Contributing to this repository

So you've decided you want to contribute to this repo. Lucky you!
Using `npm link` to link this as a dependency of the repo you're
testing this with is a great way to test your changes without
having to constantly pull this branch as a dependency of another
repo with `npm install`.

The catch with that is there are requirements in this theme that
don't resolve correctly when you do that, because instead of your
dependencies sitting in the node_modules folder in this repo, now,
they're in the repo you're testing with. Usually, this is solved
with something like a loadPath or includePath, but we don't have
either of those available to us, so we need a way to point this
repo to the linked `node_modules` in the repo you're testing with.

The quick way around this is to create a second simlink for `kss` from
your test repo by cd-ing to `node_modules` in your test repo, and then
the `kss` folder, running `npm link`, and then heading back to this repo
and running `npm link kss`.

### Supported features

This builder supports a number of options in addition to KSS defaults.

- Status: Pass any status for how your component is doing! A status is
intended to represent the progress on the _frontend_ portion of your
component - your backend stuff should be tracked separately. Styles come
out of the box for the following statuses:
	- Planned: styles are planned, but not yet started
	- In Progress: styles are in progress, but not fully tested and
	completed
	- Ready: styles are done, fully tested, and ready to hand off for
	backend functionality
	- Bug: styles were ready, but we found a bug that needs to be
	addressed. If you have a `//TODO`, you should use this status.
	- Deprecation Planned: styles will soon be deprecated
	- Deprecated: styles are deprecated and will be removed soon
	- Removed: component has been completely removed from this repo
- Coming soon: pass your own set of breakpoints!



## Example Comment

```
// Responsive Video Block
//
// A handy block for embedding videos and making them responsive
//
// Status: In-Progress
//
// Markup:
// <div class="responsive-video {{modifier_class}}">
// <div>
// 	<iframe src="http://www.bu.edu/buniverse/interface/embed/embed.html?v=CSe7S24N" width="550" height="310" frameborder="0"></iframe>
// </div>
// </div>
//
// .video-large - Makes the video larger
// .video-small - Makes the video smaller
//
// Styleguide Blocks.Global.Video
```

See KSS Spec for all details: 
https://github.com/kss-node/kss/blob/spec/SPEC.md

### New Properties:

### Status
```
// Status: Planned
```
Options: 
- **Planned**: styles are planned, but not yet started
- **In Progress**: styles are in progress, but not fully tested and
completed
- **Ready**: styles are done, fully tested, and ready to hand off for
backend functionality
- **Bug**: styles were ready, but we found a bug that needs to be
addressed. If you have a `//TODO`, you should use this status.
- **Deprecation Planned**: styles will soon be deprecated
- **Deprecated**: styles are deprecated and will be removed soon
- **Removed**: component has been completely removed from this repo

### Hidden
```
// Hidden: true
```
Options: 
- **true**: this is not a boolean, any value will equate to true in handlebars and hide this entire component from the styleguide

### Is-Header
```
// Is-Header: true
```
Denotes that this entry is a top level section header such as "Blocks", "Templates", "Atoms"

Options: 
- **true**: this is not a boolean, any value will equate to true in handlebars and activate certain styles and formatting. 

### Is-Subheader
```
// Is-Subheader: true
```
Denotes that this entry is a sub header such as "Global", or "Homepage" under the "Blocks" section

Options: 
- **true**: this is not a boolean, any value will equate to true in handlebars and activate certain styles and formatting. 


## Controlling Headings
To have better control over headings intead of KSS autocreating them based on the Styleguide property, you can add a Comment block that controls their appearance, and add a description, or even hide it. 

A possible pattern is to create a kss-headings.scss file in your theme and place all of your top level heading & subheader comments in that file:

```
// Blocks
//
// Blocks are reusable components throughout the theme.
// Examples may include buttons, audio players, and callouts.
//
// Blocks should be further categorized by a sub-category such as:
// Global, Homepage, Edition, Article corresponding to how they are used
// and where they are available to users in the theme.
//
// Is-Header: true
//
// Styleguide Blocks

// Global
//
// These are blocks that are available throughout the site on
// multiple post types and page templates
//
// Is-Subheader: true
//
// Styleguide Blocks.Global


// Edition Post Type
//
// These are blocks that are available only on the Edition
// post type that is used for the homepage of each editorial
// publication. They cannot be used elsewhere. Each block should
// have styles for each publication: BU Today, Bostonia, & Research Magazine
//
// Is-Subheader: true
//
// Styleguide Blocks.Edition

// Components
//
// Need to define these
//
// Is-Header: true
//
// Styleguide Components


// Post Types
//
// Need to define these
//
// Is-Header: true
//
// Styleguide Post Types



// Templates
//
// Need to define these
//
// Is-Header: true
//
// Styleguide Templates


// Utilities
//
// Need to define these
//
// Is-Header: true
//
// Styleguide Utilities
```
