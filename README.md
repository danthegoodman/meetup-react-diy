# meetup-react-diy

A simple "log" application that is "password protected" and saves messages.

This is a companion project for a presentation given at the Central Texas programming meetup on February 28, 2018.
My presentation plan is available in `plan.txt`.

Several functionally identical implementations are given of this app:
1. `not-react`, in plain javascript
1. `real-react-1`, using the Facebook react library, with only one custom component 
1. `my-react-1`, same app as above, but with our own react library instead.
1. `real-react-2`, using the Facebook react library, with several custom components 
1. `my-react-2`, same app as above, but with our own react library instead.


The purpose is not to improve upon react but to show what react is doing under the hood. 
To this end, the exact same application code (`assets/app-react-*.js`) is shared between the real-react and my-react pages.
The only difference between the two is which library is loaded.

# Project Structure

## `server.js` 

A stupid simple server that:
* stores data in a single file.
* has a very rudimentary read/write api for the data
* serves static files
* admittedly has NO security.

The legwork for reading and writing our data is in `server-lib/database.js`  

## `assets/`

All of the frontend code lives here.

* `all.css` - The styling for all of the versions of our app.
* `index.html` - Routing page to get to the different versions of the app
* Other `*.html` files - The pages for the different app versions.
* `app-*.js` - The companion application files for the different app versions. 
* `lib-shared-api.js` - A common set of functions for interacting with the server. Used by all versions of the app.
* `lib-real-react-*.js` - The latest published version of React. Used by the "real-react" versions of the app.
* `lib-my-react.js` - Our custom minimal implementation of React. 

## `steps__lib-my-react/`

The primary exercise of the meetup is to write `lib-my-react`.
This directory serves to record checkpoints of individual changes.
Each file is titled to document the scope of the change. 

To see a diff of what changed between each file, you can run:

```
git diff --no-index 01-start.js 02-create-element.js 
```


# Instructions

1. `npm install`
1. `node server.js`
1. Go to <http://localhost:3000>

# Regards

Many thanks to Ofir Dagan for the article I based this off of: 
https://hackernoon.com/build-your-own-react-48edb8ed350d
