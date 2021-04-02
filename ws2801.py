#!/usr/bin/env python3
#
# Control LED Strip WS2801
#
# By amonelias https://github.com/amonelias
# MIT Licensed.

import sys
import time
import RPi.GPIO as GPIO
 
import Adafruit_WS2801
import Adafruit_GPIO.SPI as SPI

# Alternatively specify a hardware SPI connection on /dev/spidev0.0:
SPI_PORT   = 0
SPI_DEVICE = 0

if __name__ == "__main__":    
    if (len(sys.argv) == 3) and (int(sys.argv[2],16) <= int("FFFFFF",16)):
        leds = int(sys.argv[1])
        pixels = Adafruit_WS2801.WS2801Pixels(leds, spi=SPI.SpiDev(SPI_PORT, SPI_DEVICE), gpio=GPIO)
        color_hex = sys.argv[2]
        color_dec = int(color_hex,16)
        pixels.set_pixels(color_dec)
        pixels.show()
        print("Color filled")
    else:
        print("Error invalid arguments. Call: python3 ws2801.py [number of leds] [colorvalue in hex]")