# The Careful Robot

## Written by Andrew Waltos

#### To Run
* Open index.html in a web browser (Tested in Firefox, Chrome, Edge, Safari) from the unzipped directory  
or 
* Just click  https://rtsht.github.io/the-careful-robot/

#### To Use
- Type commands into the input field on the page and press enter or the 'Send Command' button.
- Valid commands are:  

  * PLACE X,Y,F (Where 'X' is number from 0-4, 'Y' is number from 0-4, 'F' is string "NORTH","EAST","SOUTH", or "WEST")
  * MOVE (step forward)
  * LEFT (change direction to the left)
  * RIGHT (change direction to the right)
  * REPORT (display the current position of the active robot)
  * STRAFE LEFT (slide left 1 tile)
  * STRAFE RIGHT (slide right 1 tile)
  * WALK (set speed to 1 tile/move - default)
  * RUN (set sped to 2 tiles/move)
  * CHARGE (move straight to grid border)
  
- A valid PLACE X,Y,F command must be the first command entered.
- Invalid commands (anything other than those listed above) are ignored.
- A MOVE or STRAFE command is ignored if that move would result in moving off the grid.
- Output produced by the REPORT command will be displayed below the input field.
