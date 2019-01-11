# Contour Sample

Technical sample, requested by Nate Hunter.

This sample program consumes a portion of the MySportsFeeds.com API, and
converts it to a table of NHL athlete information. This table can,
subsequently, be sorted by various characteristics, or filtered by
player/team name.

## dev usage

A MySportsFeeds.com API key (subscribed to the NHL league), and account
password are required for this program's usage.

In the example below, starting the program under the test server,
`MSF_KEY` is your API key, and `MSF_PASS` your password. Inline with
modern security and virtualization practices, these two elements are
passed to the program as environment variables.

```
λ git clone https://github.com/chris-calo/contour-sample.git
λ cd contour-sample
λ npm i
λ MSF_KEY=ABC-DEF-GHI-123 MSF_PASS=abc123 npm start
```

## implementation

As mentioned above, the goal of this simple technical sample is to
make queries against the MySportsFeeds.com API, and build a table with
the results.

This is accomplished by using React to handle the user-interface, and
Redux actions/reducers to make store API results in an immutable 
application state. Overall, ES6 best-practices are used, demonstrating
examples of modern variable scoping, Promises, arrow functions,
string interpolation, and so on. Babel and Webpack are leveraged to
ensure reasonable portability with modern browsers, as needed.

Upon running the project, data is initially loaded (more on that below),
and becomes sortable by column (ascending or descending), and players
can be search by first name, last name, or team name. For fuzzy searching,
one of the few runtime dependencies is Fuse.js, used to bridge the gap in
MySportsFeeds.com's awkward filter logic.

## caveats

Please bear in mind, this is a toy program, created simply for
demonstration purposes. Understanding this, it is fairly hardened, but
there are a few known oddities, implemented as time-saving measures:

- Unknown at the initial time of writing, MSF.com's API is paid-for only,
  with the exception of a minimalistic non-commercial variant. If you are
  testing this, it is espected you have an API key and password for the
  platform, alongside a subscription to the NHL league.
- A further caveat of the MSF.com's non-commercial API, which was used to
  build this program, is that it is limited to only a few requests per
  day. As a result, not only was this program required to be built with a
  very small window for debugging, but it also affects its usage. As such,
  if this program was initially intended for your use, you should have
  received, a JSON file containing a small sampling of NHL data. By
  playing it in `/src/shared/`, the program will boot and allow for
  searching. Unfortunately, because sorting is tied to the API, it will
  be non-functional using this method.
- This program is not an example of good user-interface design, merely
  a simple case showing that the API can be communicated with. Please don't
  judge it on its visual merit, I can do FAAAAAAAAR better.

## license

The source code and user-interface found here-in may not be reproduced in
a commercial product, without written permission from Chris Calo. All
materials not associated with Catapult Sports or under a pre-existing
license fall under the copyright of Chris Calo or Vulcan Creative, LLC. –
this includes, but is not limited to: source code, executable binaries,
fonts, graphics, and any other technical or creative material.
