# PiMbotInf
Serial interface between Raspberry Pi and mBot

Connect to bluetooth devices:
https://www.cnet.com/how-to/how-to-setup-bluetooth-on-a-raspberry-pi-3/
> sudo bluetoothctl
# agent on
# scan on

Find address of device from list
# pair XX:XX:XX:XX:XX:XX 
# trust XX:XX:XX:XX:XX:XX

> sudo l2ping -c 1 00:1B:10:81:14:07

Setup up raspberry pi rf serial port:
https://www.raspberrypi.org/forums/viewtopic.php?f=63&t=154651

> sudo rfcomm bind 0 00:1B:10:81:14:07
> ls /dev/rfcomm0   # shows rfcomm0 created successfully in /dev/rfcomm0

Disable getty
>

> echo "hello" > rfcomm0

> sudo rfcomm release rfcomm0

> sudo systemctl restart rfcomm

> sudo rfcomm connect 0 00:1B:10:81:14:07 1     # open serial port

I got it running.
1. Serial Port should be enabled
2. Add enable_uart = 1 and corefreq = 250 in your /boot/config.txt file
3. change bot.start() to bot.start('/dev/ttyS0') in your python code