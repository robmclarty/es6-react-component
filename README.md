# ES6 React Component Patterns

![Screenshot](screenshot.png)

These are examples of alternative patterns for creating React components.

## Why?

I'm just going to say this right off the bat: I'm not a fan of OOP, and I don't
think adding `class` to Javascript is a benefit.

I prefer composition over inheritance in almost all cases, and would rather use
Javascript's wonderfully expressive, and simple, features like functions and
object literals to create reusable modules.

## But... Facebook's examples use `class`

A lot of Java developers have moved over to JS and made a lot of noise to make
it look like what they're used to. That doesn't mean you should do it too.
Faceook's interest is to bow to popular demand. Popular demand is what has given
us such jewels of civilization as Donald Trump, Rob Ford, and Lottery Tickets.
There's more than one way to skin a cat, and some of those ways are easier, more
maintainable, more intuitive, and ultimately less expensive to work with.

## Object's without classes? WTF?

Yes, you can make objects without inheriting from a class. Don't worry I'll
hold your hand and show you the way to enlightenment.

## But isn't doing it the Facebook way safer/more optimized/faster?

No, not really. One composable example is actually less resource hungry and a
tiny bit faster, whereas another uses slightly more memory. In all, each
example is roughly similar in performance, memory usage, and heap pattern. You
should feel safe using any example.

The biggest difference lays in the code itself, and imo the composable pattern
is better in that it is more intuitive, obvious, and easier to maintain which
should save time in the long run by minimizing errors (and making them more
visible when they happen) and by being more malleable, making the codebase more
easily extensible without requiring a lot of reworking. For example, one of the
biggest issues with OOP is the classification hierarchy, whereby if some class
in the chain needs to be redefined, it causes a ripple-effect throughout the
code with all the modules which have a related dependency to that changed-class.

This is my attempt at defining various patterns for building React components using
[ES6 syntax](https://people.mozilla.org/~jorendorff/es6-draft.html)
and
[React 0.14.4](https://facebook.github.io/react/blog/2015/12/29/react-v0.14.4.html).
It is transpiled using
[Babel](https://babeljs.io/),
[Browserify](http://browserify.org/),
and
[Gulp](http://gulpjs.com/).

## Usage

1. run `gulp` from the root of the project directory
2. open `http://localhost:3000` in your web browser

### Swap different components

Open `src/app.jsx` and change the import for `MyComponent` to point to a
different example from the `src` folder. It is set up by default to use the
`composableComponentNoThis.jsx` example.

## Why?

My personal goal has been to devise a more "functional" pattern which is
class-free (and this-free) in an attempt to be simple, concise, and explicit. My
belief is that by organizing my code in this way, I may reduce errors and make
it easier for newcomers to understand, thus increasing overall team velocity.

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
- there's object literals (a box of primitives, functions, or other object literals)

...and that's pretty much all you need to know about Javascript to get started.

And besides classes, there's always been `this`. `this` is hard to talk about and
difficult to clearly communicate just what `this` is. Is `this` `this`, or
`this`? Which `this` is `this`? Is it this `this`? What *is* `this`!? Getting
lost in a hierarchy of bound thises has always caused Javascript developers
headaches. Why not just get rid of `this` and be more explicit, and avoid all
the confusion?

What I'm looking for is a simple, non-fancy way of composing modules (like
React components) which is obvious (explicit) and flexible (composable). I don't
want to be forced into someone else's rigid class taxonomy. I just want to grab
the stuff I want, ignore the stuff I don't want, and mash it together into an
object I can work with.

Computer programs are some of the most complicated things that humans work on.
I feel like they don't need to be made more complicated by adding on a bunch of
classical baggage. I want to write programs that are made out of simple building
blocks, that are obvious to follow. I think this helps reduce errors while also
enabling a broader scope of features.

I like React (and Flux) from Facebook because it is a great simplification over
other front-end frameworks for making sophisticated interfaces. It groups together
markup templates with their corresponding behaviours, that react and modify
those templates, into components. And it does it all in fairly straightforward,
normal-looking, malleable Javascript syntax.

This repository is my attempt to create a React component, using ES6 syntax,
without using `class` (or `React.createClass`) or `this`, using only simple
functions. I specifically make use of
[Object.assign](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
to create objects through composition (including only the properties I want) to
start with the React.Component.prototype, and then augment it to something more
specific, which is my custom component, but defined using core JS language
features, simply, as a set of variables and functions and object literals
without any black magic.

## Style

I've chosen to compose the React component inside a module which is simply a set
of functions and variables and then return an object which is the combination of
all these properties and the core React.Component.prototype. I feel like this is
easy to read and follow and doesn't involve any special constructs.

It is similar to the
[revealing module pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript).
I think the returned component object is easier to understand because you can
glance at the list of public properties that are listed at the end. Also, the
component's properties are referenced by a variable actually called `component`
(this is in lieue of `this`) which gets defined at the top of the module. I
think that makes it a lot clearer what's being referenced, because you can see
it right there in front of you (rather than hidden inside a mysteriously magical
auto-binded `this`).

The only thing that could possibly be considered "weird" is the way that the
event handlers are called (but this problem exists for classical components as
well). I've made use of the new
[fat arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
definition of ES6 to invoke the component's event handlers in order to pass the
event object down to the handler (which itself is saved in the module's closure).
It could also be written with a `.bind()` syntax, but I felt that the new fat
arrow was a simpler to look at.

## Further Reading

- [Alternative Ways to Define React Components](https://gist.github.com/jquense/47bbd2613e0b03d7e51c)
- [Baby's First Reaction](https://medium.com/javascript-scene/baby-s-first-reaction-2103348eccdd)
- [An easy guide to object rest/spread properties in JavaScript](https://dmitripavlutin.com/object-rest-spread-properties-javascript/)
- [Variables, Scopes, Environments, and Closures](http://speakingjs.com/es5/ch16.html)
