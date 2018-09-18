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
