# MMM-LedStrip
A MagicMirror² module to control the LED Strip WS2801 and display the output.

## Dependencies

- [Adafruit_WS2801](https://pypi.org/project/Adafruit-WS2801/)

## Installation
1. Navigate to the `/modules` folder of you MagicMirror²
2. Clone this repository using the following command: `git clone https://github.com/amonelias/MMM-LedStrip.git`
3. Install dependencies using the following command: `pip3 install Adafruit-WS2801`

## Config

<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>leds</code></td>
      <td><strong>Default: 1</strong><br>Number of LEDs on the LED Strip<br><br><strong>Type:</strong> <code>number</code></td>
    </tr>
    <tr>
      <td><code>brightness</code></td>
      <td><strong>Default: 0.5</strong><br>Brigtness of the LEDs<br>Options: 0 - 1<br><br><strong>Type:</strong> <code>number</code></td>
    </tr>
    <tr>
      <td><code>fontSize</code></td>
      <td><strong>Default: "medium"</strong><br>Font size of the module<br>Options: <code>"small", "medium", "large"</code><br><br><strong>Type:</strong> <code>string</code></td>
    </tr>
  </tbody>
</table>

To use this module, add it to the modules array in the `config/config.js` file:
```javascript
  {
    module: 'MMM-LedStrip',
    position: 'top_right', // any possible region or none
    config: {
      leds: 1,
      brightness: 0.5,
    },
  },
```

## Update
Navigate to the folder of the module in the `/modules` folder and get the latest version using the command `git pull`.
