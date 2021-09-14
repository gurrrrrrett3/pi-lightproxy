# pi-lightproxy
A small Raspberry Pi Express server that uses the Pi's bluetooth to control BLE LED Devices


## Endpoints

```
GET  /    | Info about the server
POST /    | Accepts body data formatted as { hex: FFFFFF } to set LED color
POST /on  | Enables the lights
POST /off | Disables the lights
```
## About
This project was used as a small "proxy" server that allowed other projects (that were run from a server that didn't have bluetooth) 
to communicate with an LED strip.
