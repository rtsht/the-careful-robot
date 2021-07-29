# The Careful Robot

## Written by Andrew Waltos

- Run index.html in a web browser (Tested in Firefox, Chrome, Edge, Safari) from the unzipped directory.
- Type commands into the input field on the page and press enter or the 'Send Command' button.
- Valid commands are:  

  * PLACE X,Y,F (Where 'X' is number from 0-4, 'Y' is number from 0-4, 'F' is string "NORTH","EAST","SOUTH", or "WEST")
  * MOVE
  * LEFT
  * RIGHT
  * REPORT  
  
- A valid PLACE X,Y,F command must be the first command entered.
- Invalid commands (anything other than those listed above) are ignored.
- A MOVE command when the robot is at an edge square and facing the boundary is ignored.
- Output produced by the REPORT command will be displayed below the input field.
