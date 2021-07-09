var noble = require("@abandonware/noble");
var bluetooth = require("@abandonware/bluetooth-hci-socket")

var characteristic;

noble.state = "poweredOn";

var serviceUUIDs = []; // default: [] => all

noble.startScanning(serviceUUIDs, false); // particular UUID's

noble.on("discover", (peripheral) => {
  if (peripheral.address == "be:89:e0:01:dd:7e") {
    peripheral.connect();
    noble.stopScanning();
    console.log(`Connecting to: ${peripheral.advertisement.localName}`);
  }

  peripheral.once("connect", () => {
    console.log(
      `Connectected to: ${peripheral.advertisement.localName} \nDiscovering Services...`
    );
    peripheral.discoverServices();
  });

  peripheral.once("servicesDiscover", (services) => {
    console.log('Searching for service: "fff0"');

    services.filter((service) => {
      if (service.uuid == "fff0") {
        return true;
      }
    });

    console.log('Found service: "fff0"');

    var service = services[1];

    service.discoverCharacteristics();

    service.once("characteristicsDiscover", (characteristics) => {
      characteristics.filter((characteristic) => {
        if (characteristic.uuid == "fff3") {
          return true;
        }
      });

      console.log("Found Characteristic fff3");

      characteristic = characteristics.find((characteristic) => {
        return characteristic.properties.includes("writeWithoutResponse");
      });

      console.log("Writing test data...");

      const testData = "7E070503FFFFFF10EF";

      characteristic.write(Buffer.from(testData, "hex"), false);
    });
  });
});

 function setLEDcolor(hex) {

  console.log(`Writing ${hex}...`);

  const data = `7E070503${hex}10EF`;

  characteristic.write(Buffer.from(data, "hex"), false);
  return true;
}


const express = require("express");
const app = express();
var path = require("path");
const port = 3333;
const bodyParser = require("body-parser") 
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'docs')));
  
app.post('/', (req, res) => {

    console.log(req)

    const { hex }= req.body
    setLEDcolor(hex) 
    res.sendStatus(200)
})
    
app.listen(port, () => {
  console.log(`Server ready on localhost:${port}`);
});