const express = require('express')
const app = express()
const port = 8080

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());

app.get('/', (req, res) => res.send({msg:'Mojito!'}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))


const raspi = require('raspi').init;
const Serial = require('raspi-serial').Serial;


app.post('/api/make', function(req, res) {
    var drink = req.body;
    messageArduino(drink);
    console.log(drink.p1)
    res.send(drink);
});

function messageArduino(data) {
  raspi.init(() => {
    var serial = new Serial();
    serial.open(() => {
      serial.write('Hello from raspi');
      serial.on('data', (data) => {
        process.stdout.write(data);
      });
    });
  });
}
