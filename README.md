# ES6 React Component

This is my attempt at defining a pattern for building class-free React
components using
[ES6 syntax](https://people.mozilla.org/~jorendorff/es6-draft.html)
and
[React 0.14.0-beta2](https://facebook.github.io/react/blog/2015/07/03/react-v0.14-beta-1.html).
It is transpiled using
[Babel](https://babeljs.io/),
[Browserify](http://browserify.org/),
and
[Gulp](http://gulpjs.com/).

## Usage

1. run `gulp` from the root of the root project directory
2. open `http://localhost:3000` in your web browser

## Why?

I'm not a big fan of `class`. I feel like it hides the underlying language from
new users who might expect `class` to act like, say, a Java class, when in fact
it's just a prototype. Javascript != Java. Javascript is, utlimately, class-free.

Douglas Crockford has a good talk about the better parts of ES6 from
[Nordic.js 2014](https://www.youtube.com/watch?v=PSGEjv3Tqo0).

I feel like the whole classical inheritance thing is just too much work:

- you have to define special constructors (and be able to tell the difference between those and regular functions)
- you have to use extra special keywords like `super`, `new`, `class`, `extends`, etc.
- you have to remember what's up in the hierarchy that's there even though you can't see it
- class hierarchies are brittle (e.g., taxonomies break down with the platypus effect) making them hard to change (and code is always changing)

I don't see the value of adding all this overhead to an otherwise simple, concise,
yet highly expressive language. Javascript is easy. All you have to know is:

- there's functions
- there's variables (within which you can store functions, objects, or plain old primitives)
- there's object literals (a box of variables, functions, or other object literals)

...and that's pretty much all you need to know about Javascript to get started.

Computer programs are some of the most complicated things that humans work on.
I feel like they don't need to be made more complicated by adding on a bunch of
classical baggage. I want to write programs that are made out of simple building
blocks, that are obvious to follow. I think this helps reduce errors while also
enabling a broader scope of features.

I like React (and Flux) from Facebook because it is a great simplification over
other front-end frameworks for making complex interfaces. It groups together
markup templates with their corresponding behaviours, that react and modify
those templates, into components. And it does it all in fairly straightforward,
normal-looking, malleable Javascript syntax.

This repository is my attempt to create a React component, using ES6 syntax,
without using `class` or `React.createClass`, using only simple functions. I
specifically make use of
[Object.assign](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
to create objects that are an augmentation of the React.Component prototype from
a set of functions and variables defined in a module (actually, here, I'm using the
[object-assign](https://github.com/sindresorhus/object-assign)
ponyfill while `Object.assign` is still being implemented).

## Style

I've chosen to compose the React component inside a module which is simply a set
of functions and variables and then return an object which is the combination of
all these properties and the core React.Component prototype. I feel like this is
easy to read and follow and doesn't involve any special constructs.

It is similar to the
[revealing module pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript).
I think the returned component object is easier to understand because you can
glance at the list of public properties that are listed at the end.

The only thing that could possibly be considered "wierd" is the way that the
event handlers are called (but this problem exists for classical components as
well. I've made use of the new fat arrow function definition
of ES6 to invoke the component's event handlers in order to take advantage of
its binding of `this` to the function. `React.createClass` does some
[autobinding behind the scenes](https://facebook.github.io/react/docs/interactivity-and-dynamic-uis.html#under-the-hood-autobinding-and-event-delegation)
so you don't have to think about this. It could also be written
with a `.bind(this)` syntax, but I felt that the new fat arrow was a simpler
syntax to look at; but it's really just so the event handlers get a reference
to `this` which is the React component object to be able to do things like
`this.setState()`.
