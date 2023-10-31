- little boilerplater
- doest rely on provider
- faster than context
- state mergy by default
- extendable
- little opinionated

Context -> Components
If state change, component gets rerendered, not good

In Zustand
ZustandStore -> compoentes
no rerendered

is it bad?

- rerenderes run react, so not necessarily
- rerenders don't change the dom, it has a shadow dom
- shadow dom is cheap

is it the solution?

- nahh

Now project

Advancded Features

- function can be async, fetch request in store as an example
- There is immer
   - Its a library
   - get rid of spreading
   - espec. for big spread, to get nested object
- there is subscribe
   - if something happens, do more with the store
- there is subscribe with selector
   - we react what selector says, whatever that means
- there is things like refTest
   - to keep refs uptodate without rerender

Outro, tralala
