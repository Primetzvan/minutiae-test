#!/bin/sh -e
#
# rc.local
#
# This script is expected as the end of each mutliuser runlevel.
# Make sure that the script will "exit 0" on success or any other 
# value on error.
#
# In order to enable or disable this script just change the execution
# bits.
#
# By default this script does nothing.

/home/pi/newnode/systemstart.sh

exit 0 

