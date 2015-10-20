## Transition tester

An attempt to recreate the circumstances of the transition between pages in galaxy.

### Usage

To start a transition, type `goToPage(pages.$NAME)` in the browser console, where `$NAME` is one of:

 - `Base`
 - `Login`
 - `AppShow`
 - `OrgAppList`
 - `OrgUserList`

To finish it, type `finishTransition()`.

### Development

The idea is to pad out the HTML and write the CSS to prove that a given layout works, both normally, and during a transition.

The next step would be to expand this app to actually run transitions via `CSSTransitionGroup` or something. But that seems like a distinct next step once we actually are sure our basic layout works.