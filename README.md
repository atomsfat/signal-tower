#Raspeberry Signal tower


1. Setup [Raspberry](https://learn.adafruit.com/node-embedded-development?view=all)
2. Pins used [BCM](http://www.raspberrypi-spy.co.uk/wp-content/uploads/2012/06/Raspberry-Pi-GPIO-Layout-Model-B-Plus-rotated-2700x900-1024x341.png)
  * GPIO 4
  * GPIO 18
  * GPIO 23
  * GPIO 24
3. How to use:
  * Define some patterns http://localhost:5000/
  * Active or deactivate http://localhost:5000/api/cmd/:name/[on/off]
4. Electric Components
  * 4 Mosfet
  * 4 NPN transistor
  * 12V 2amp
  * Signal tower from [ebay](http://www.ebay.com/itm/Industrial-Signal-Tower-Light-Red-Orange-Green-Blue-Alarm-Lamp-DC-24V-/310738755313?hash=item4859791ef1)
  * LM2596 Switch Regulator

5. Install
  ```bash
  cp signalTowerService.sh /etc/init.d/signaltower
  chmod 755 /etc/init.d/signaltower
  systemctl daemon-reload
  sudo service signaltower start
  ```
