# id-kss-builder
A KSS theme for creating styleguides in Boston University
repositories.

This theme uses Grunt and node-sass to compile Sass to CSS.

## Get started

Run `npm install` to install dependencies, then run `grunt` to
begin watching your Sass files. This builder places Sass files
in the `css-dev` folder.

You can also run `grunt build` to manually build the Sass anytime.

### npm linking "fun"

So you've decided you want to contribute to this repo. Lucky you!
You might like using npm link to link this as a dependency of the
repo you're testing this with. What's the catch, you say?

There's requirements here that don't resolve correctly when you do
that, because instead of your dependencies sitting in the node_modules
folder in here, now, they're in the repo you're testing with. Can you
just change the folder path to get it to look up a directory and kinda
figure it out? Nope! Not unless you want to hard-code in your test
repo name. Spoiler: you don't.

The quick way around this is to create a second simlink for `kss` from
your test repo by cd-ing to node_modules in your test repo, and then
the kss folder, running npm link, and then heading back to this repo
and running npm link kss.

Better ideas always welcome!