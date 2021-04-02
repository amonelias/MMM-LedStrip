/* global Module */

/* Magic Mirror
 * Module: MMM-LedStrip
 *
 * By amonelias https://github.com/amonelias
 * MIT Licensed.
 */

Module.register("MMM-LedStrip", {

  defaults: {
    leds: 1,
    brightness: 0.5,
    fontSize: "medium"
  },

  start: function(){
    this.sendSocketNotification("START", [this.config.leds, this.config.brightness])
    if(this.config.fontSize === "small"){
      this.fontSizeHeader = "xsmall"
    }
    else if(this.config.fontSize === "medium"){
        this.fontSizeHeader = "small"
    }
    else if(this.config.fontSize === "large"){
        this.fontSizeHeader = "medium"
    }
    else{
        this.config.fontSize = "medium"
        this.fontSizeHeader = "small"
    }
  },

  getDom: function() {
    if(this.data.position != undefined){
      let element = document.createElement("div")

      let status = document.createElement("div")
      status.id = "ledStrip-status"
      status.classList.add("normal", this.fontSizeHeader, "regular")
  
      let color = document.createElement("div")
      color.id = "ledStrip-color"
      color.classList.add(this.config.fontSize, "regular")
      color.style = "-webkit-text-stroke: 0.25px white" // Font Boarder

      status.innerHTML = "Led Strip: "
      
      element.appendChild(status)
      element.appendChild(color)
      return element
    }
  },

  notificationReceived: function(notification, payload, sender) {
    switch(notification) {
      case "LEDS_CLEAR":
        this.sendSocketNotification("CLEAR")
        break
      case "LEDS_FILL":
        this.sendSocketNotification("FILL", payload)
        break
    } 
  },

  socketNotificationReceived: function(notification, payload) {
    switch(notification) {
      case "ERROR":
        this.colorInnerHTML = "ERROR"
        this.color = "#ff0033"
        console.error("Error LedStrip: ", payload)
        break
      case "CHANGED":
        this.colorInnerHTML = "#" + payload
        this.color = "#" + payload
        break
      }
      if(this.data.position != undefined){
        let color = document.getElementById("ledStrip-color")
        color.innerHTML = this.colorInnerHTML
        color.style.color = this.color
      }
  },

})

