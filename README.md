# PiMbotInf
Serial interface between Raspberry Pi and mBot

Connect to bluetooth devices:
https://www.cnet.com/how-to/how-to-setup-bluetooth-on-a-raspberry-pi-3/
> sudo bluetoothctl
# agent on
# scan on

Find addrass of device from list
# pair XX:XX:XX:XX:XX:XX 
# trust XX:XX:XX:XX:XX:XX

> sudo l2ping -c 1 xx:xx:xx:xx:xx:xx

Setup up raspberry pi rf serial port:
https://www.raspberrypi.org/forums/viewtopic.php?f=63&t=154651
