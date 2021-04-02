/* Magic Mirror
 * Node Helper: MMM-LedStrip
 *
 * By amonelias https://github.com/amonelias
 * MIT Licensed.
 */

'use strict'
const NodeHelper = require("node_helper")
const { execFile } = require("child_process")

module.exports = NodeHelper.create({

  stop: function(){
    this.ledsFill("000000")
  },

  socketNotificationReceived: function(notification, payload) {
    switch(notification) {
      case "START":
        this.leds = payload[0]
        this.brightness = payload[1]
        this.rawcolor = "000000"
        this.ledsFill("000000")
      case "CLEAR":
        this.rawcolor = "000000"
        this.ledsFill("000000")
        break
      case "FILL":
        if(this.colorCheck(payload) === false){
          this.sendSocketNotification("ERROR", "Invalid Color!")
          break
        }
        this.rawcolor = this.colorCheck(payload)
        this.color = this.colorBrightnessAdjust(this.rawcolor, this.brightness)
        this.ledsFill(this.color)
        break
    }
  },

  ledsFill: function(color) {
    let child = execFile('python3', ['modules/MMM-LedStrip/ws2801.py', this.leds, color], (error, stdout, stderr) => {
      if(error) {
        this.sendSocketNotification("ERROR",stderr)
      }
      else {
        this.sendSocketNotification("CHANGED", this.rawcolor)
      }
    })
  },

  colorCheck: function(color){
    if(typeof color === 'string' && !isNaN(Number('0x' + color))){
      if(color.length === 6){
        return color
      }
      else{
        while(color.length < 6){
          color = "0" +color
        }
        return color
      }
    }
    else if(this.colorNameToHex(color) !== false){
      return this.colorNameToHex(color)
    }
    else{
      return false
    }
  },

  colorNameToHex: function(color){
    let colors = {"aliceblue":"f0f8ff","antiquewhite":"faebd7","aqua":"00ffff","aquamarine":"7fffd4","azure":"f0ffff",
    "beige":"f5f5dc","bisque":"ffe4c4","black":"000000","blanchedalmond":"ffebcd","blue":"0000ff","blueviolet":"8a2be2","brown":"a52a2a","burlywood":"deb887",
    "cadetblue":"5f9ea0","chartreuse":"7fff00","chocolate":"d2691e","coral":"ff7f50","cornflowerblue":"6495ed","cornsilk":"fff8dc","crimson":"dc143c","cyan":"00ffff",
    "darkblue":"00008b","darkcyan":"008b8b","darkgoldenrod":"b8860b","darkgray":"a9a9a9","darkgreen":"006400","darkkhaki":"bdb76b","darkmagenta":"8b008b","darkolivegreen":"556b2f",
    "darkorange":"ff8c00","darkorchid":"9932cc","darkred":"8b0000","darksalmon":"e9967a","darkseagreen":"8fbc8f","darkslateblue":"483d8b","darkslategray":"2f4f4f","darkturquoise":"00ced1",
    "darkviolet":"9400d3","deeppink":"ff1493","deepskyblue":"00bfff","dimgray":"696969","dodgerblue":"1e90ff",
    "firebrick":"b22222","floralwhite":"fffaf0","forestgreen":"228b22","fuchsia":"ff00ff",
    "gainsboro":"dcdcdc","ghostwhite":"f8f8ff","gold":"ffd700","goldenrod":"daa520","gray":"808080","green":"008000","greenyellow":"adff2f",
    "honeydew":"f0fff0","hotpink":"ff69b4",
    "indianred ":"cd5c5c","indigo":"4b0082","ivory":"fffff0","khaki":"f0e68c",
    "lavender":"e6e6fa","lavenderblush":"fff0f5","lawngreen":"7cfc00","lemonchiffon":"fffacd","lightblue":"add8e6","lightcoral":"f08080","lightcyan":"e0ffff","lightgoldenrodyellow":"fafad2",
    "lightgrey":"d3d3d3","lightgreen":"90ee90","lightpink":"ffb6c1","lightsalmon":"ffa07a","lightseagreen":"20b2aa","lightskyblue":"87cefa","lightslategray":"778899","lightsteelblue":"b0c4de",
    "lightyellow":"ffffe0","lime":"00ff00","limegreen":"32cd32","linen":"faf0e6",
    "magenta":"ff00ff","maroon":"800000","mediumaquamarine":"66cdaa","mediumblue":"0000cd","mediumorchid":"ba55d3","mediumpurple":"9370d8","mediumseagreen":"3cb371","mediumslateblue":"7b68ee",
    "mediumspringgreen":"00fa9a","mediumturquoise":"48d1cc","mediumvioletred":"c71585","midnightblue":"191970","mintcream":"f5fffa","mistyrose":"ffe4e1","moccasin":"ffe4b5",
    "navajowhite":"ffdead","navy":"000080",
    "oldlace":"fdf5e6","olive":"808000","olivedrab":"6b8e23","orange":"ffa500","orangered":"ff4500","orchid":"da70d6",
    "palegoldenrod":"eee8aa","palegreen":"98fb98","paleturquoise":"afeeee","palevioletred":"d87093","papayawhip":"ffefd5","peachpuff":"ffdab9","peru":"cd853f","pink":"ffc0cb","plum":"dda0dd","powderblue":"b0e0e6","purple":"800080",
    "rebeccapurple":"663399","red":"ff0000","rosybrown":"bc8f8f","royalblue":"4169e1",
    "saddlebrown":"8b4513","salmon":"fa8072","sandybrown":"f4a460","seagreen":"2e8b57","seashell":"fff5ee","sienna":"a0522d","silver":"c0c0c0","skyblue":"87ceeb","slateblue":"6a5acd","slategray":"708090","snow":"fffafa","springgreen":"00ff7f","steelblue":"4682b4",
    "tan":"d2b48c","teal":"008080","thistle":"d8bfd8","tomato":"ff6347","turquoise":"40e0d0",
    "violet":"ee82ee",
    "wheat":"f5deb3","white":"ffffff","whitesmoke":"f5f5f5",
    "yellow":"ffff00","yellowgreen":"9acd32"}

    if (typeof colors[color.toLowerCase()] != 'undefined'){
        return colors[color.toLowerCase()]
    }

    return false
  },

  colorBrightnessAdjust: function(color, brightness){
    color = color.split('')
    let r = Math.round(parseInt(color[0] + color[1],16) * brightness)
    let g = Math.round(parseInt(color[2] + color[3],16) * brightness)
    let b = Math.round(parseInt(color[4] + color[5],16) * brightness)
    color = [r.toString(16), g.toString(16), b.toString(16)]
    for(let i = 0; i < color.length; i++){
      if(color[i].length !== 2){
        color[i] = "0" + color[i]
      }
    }
    return color.join('')
  },

})
