var m = require('mraa');
var shift_OE = new m.Gpio(14),
    shift_RCLK = new m.Gpio(16),
    shift_SRCLK = new m.Gpio(17),
    shift_data = new m.Gpio(15);

shift_OE.dir(m.DIR_OUT);
shift_RCLK.dir(m.DIR_OUT);
shift_SRCLK.dir(m.DIR_OUT);
shift_data.dir(m.DIR_OUT);

var valeurMirroir=0;

function setOutput(value) {
    valeurMirroir=value;
    for( var i = 0 ; i < 16 ; i++) {
      // Set data bit
      if((value & 0x8000) == 0x8000)
          shift_data.write(1);
      else
          shift_data.write(0);
      // clock data
      shift_SRCLK.write(0);
      shift_SRCLK.write(1);
      value = value << 1;
     }
     // latch data
      shift_RCLK.write(1);
      shift_RCLK.write(0);
     // active sortie
      shift_OE.write(0);
    }



function setBit(bitIndex) {
  setOutput(valeurMirroir | (1 << bitIndex));
}

function clrBit(bitIndex) {
  setOutput(valeurMirroir & ~(1 << bitIndex));
}

// Creons un light chaser comme exemple



var chaserIndex=0;

// la routine d'intervale de 100ms

setInterval(function() {
   if(chaserIndex > 15)
     clrBit(chaserIndex - 16);
   else
     setBit(chaserIndex);
   chaserIndex++;
   if(chaserIndex > 31) 
     chaserIndex=0;
   },50);




function exitHandler(options, err) {
    setOutput(0);
    shift_OE.write(1);// disable output
//    if (options.cleanup) console.log('clean');
    if (err) console.log(err.stack);
    if (options.exit) process.exit();
}

