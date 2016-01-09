/**
 * 單顆 74hc595 跑馬燈
 * 
 * @author Abola Lee 
 * @version 1.0
 * @since 2016-01-09
 * 
 * @link http://www.gibar.co/2016/01/linkit-7688-duo-74hc595-led.html
 */
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
    for( var i = 0 ; i < 8 ; i++) {
      // Set data bit
      console.log("    value:" + value + ","+ (value & 0x80) );
      if((value & 0x80) == 0x80)
          DS.write(1);
      else
          DS.write(0);
          
      // clock data
      SHCP.write(0);
      SHCP.write(1);
      value = value << 1;
     }
     // latch data
      STCP.write(1);
      STCP.write(0);
    }



function setBit(bitIndex) {
    console.log( "  setBit(" + bitIndex + "):" + (1 << bitIndex) );
  setOutput(valeurMirroir | (1 << bitIndex));
}

function clrBit(bitIndex) {
    console.log( "  clrBit(" + bitIndex + "):" + ~(1 << bitIndex) );
  setOutput(valeurMirroir & ~(1 << bitIndex));
}

var chaserIndex=0;

setInterval(function() {
  
   if(chaserIndex > 7){
     console.log("clear: " + chaserIndex + " -8");
     clrBit(chaserIndex - 8);
   }
   else {
     console.log("set bit:" + chaserIndex);
     setBit(chaserIndex);
       
   }
   chaserIndex++;
   if(chaserIndex > 15) 
     chaserIndex=0;
   },50);
