var m = require('mraa');

// 腳位命名參考
//       _______
//  Q1[1|   U   |16]Vcc
//  Q2[2|       |15]Q0
//  Q3[3|       |14]DS
//  Q4[4|  595  |13]OE
//  Q5[5|       |12]STCP
//  Q6[6|       |11]SHCP
//  Q7[7|       |10]MR
// GND[8|_______| 9]Q7s
//       
var DS   = new m.Gpio(15),
    STCP = new m.Gpio(16),
    SHCP = new m.Gpio(17);

// 設定為 output
DS  .dir(m.DIR_OUT);
STCP.dir(m.DIR_OUT);
SHCP.dir(m.DIR_OUT);

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

var chaserIndex=0;

setInterval(function() {
   if(chaserIndex > 15)
     clrBit(chaserIndex - 16);
   else
     setBit(chaserIndex);
   chaserIndex++;
   if(chaserIndex > 31) 
     chaserIndex=0;
   },50);
