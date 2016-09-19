## Chrome extension - Now You (don't) See Me

### Background

Sometimes I don't feel comfortable letting people see the content I am currently browsing when they passing by. Whenever you want to hide all of your tabs,this Chrome extension will help you to close all the tabs, save them into a temporary bookmark folder, and restore them later with one button.

### Functionality & MVP

With this extension, users will be able to:

- [ ] Hide ( & bookmark) all the tabs with one click.
- [ ] Open your preset homepage when hiding all the tabs.
- [ ] Restore ( & remove the temporary bookmarks) all the tabs with one click.
- [ ] Use Hotkey to hide & restore.

### Technologies & Technical Challenges

This extension will be implemented using the standard Chrome extension technology: Javascript, with chrome API.  In addition to the `manifest.json` and `package.json` files, there will be two scripts:

- `content.js`: will contain the logic hiding and restoring all the tabs.
- `options.js`: will contain the logic for changing the user's settings

There will also be one HTML file to display the settings:

- `options.html`: the file that renders the Settings menu for the user

The primary technical challenges will be:

- Identifying all the colors used on the DOM elements,
- Determining which grey scale tone corresponds to each color -- this will be different depending on whether the user requires high contrast or not
- Determining which high-contrast colors should be used to replace the existing colors, when the extension is in high contrast color mode

The colors will be identified by mapping classes in the DOM to a variety of attributes in the CSS such as `color`, `background-color`, and perhaps others.  Going from color to grey scale will be done with a standard algorithm.  Going from color to high-contrast color will be more challenging: currently, I plan to utilize a subset of high-contrast colors and map the given colors via some distance algorithm to the best match for these colors.  

### Implementation Timeline

**Day 1**: Get started on the infrastructure of the extension, following <a href="https://developer.chrome.com/extensions/getstarted">this guide</a> from Chrome.  By the end of the day, I will have:

- A completed `package.json`
- A completed `manifest.json`
- The ability to locate and alter a DOM element by class

**Day 2**: Work on identifying the colors used in the DOM by class and other attributes, and create and render a new DOM with different colors.  By the end of the day, I will have:

- The ability to identify all colors
- A new HTML file that gets rendered in place of the current DOM, using different colors

**Day 3**: Dedicate this day to correctly replacing colors with their grey scale or high-contrast equivalents.  By the end of the day:

- Implement an algorithm for replacing colors with grey scale tones
- At least understand (and hopefully implement) and algorithm for replacing colors with high-contrast equivalents
- Render a new DOM that contains each of these color equivalents

**Day 4**: Create the settings page and connect the settings to the color change logic.  If time, create high-contrast grey scale and low-contrast algorithms as well.  By the end of the day:

- Fully implemented settings changes that re-render a differently colored DOM
- If time, implement the final two features: normal color to low contrast and normal to high-contrast grey scale
