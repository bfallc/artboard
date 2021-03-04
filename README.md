# artboard

sortable/filterable web page for looking at a personal collection of saved art references. 

- [artboard](#artboard)
  - [TO-DO](#to-do)
  - [Stretch Goals](#stretch-goals)

## TO-DO
1. Refine checkbox generation
   1. ~~Prevent blank checkbox generation.~~ 
   2. If fewer than 2 checkboxes in a row, don't show checkboxes (duplicate addedby hiding behavior)
2. Edit Form-to-JSON generator
   1. ~~Add edit functionality to individual entries~~
   2. Add new fields to accomodate new JSON keys
   3. Add sample input type to each input textbox
   4. Add escape character checker for all fields
   5. Allow newly-added entries to be edited
   6. Make document jump to bottom of screen when new entry is added.
3. ~~Add functionality to copy/edit existing entry~~
4. ~~Dynamically display video or image for thumbnail~~
5. batch process images into thumbnails with photoshop action
   1. put all the thumbnails in the same folder as their fully-grown siblings.
6. ~~Get json to working state~~
7. Make prettier.
   1. Refine CSS for main page
      1. Center the grid
   2. Refine CSS for project page
   3. Make JSON
8. Refine User Experience
   1. Add button on home page to JSON form
   2. Add instructions to JSON form

## Stretch Goals
1. add -topic
2. Automatically generate and save thumbnail version of full-size uploaded image
3. ~~Dynamically generate individual page for each entry on click.~~
4. Convert all JS to JSFuck...for security reasons...? To imbue a sense of dial-up in a culture of immediacy.
5. Break up javascript files into smaller script files (more modular...but not using JS Modules)
6. Make user-friendly
   1. Add overall site instructions/purpose/project background