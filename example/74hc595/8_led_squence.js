/**
 * Linkit 7688 (duo) 範例
 * 使用單顆 74hc595 控制8顆 LED 跑馬燈
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

// 設定GPIO 接腳
var DS   = new m.Gpio(15),  
    STCP = new m.Gpio(16),
    SHCP = new m.Gpio(17);
    
// 設定跑馬燈速度 (越小越快)    
var sequence = 50; // ms

var valeurMirroir=0,
    chaserIndex=0;

// 設定為 output
DS  .dir(m.DIR_OUT);
STCP.dir(m.DIR_OUT);
SHCP.dir(m.DIR_OUT);


function setOutput(value) {
  valeurMirroir=value;
  for( var i = 0 ; i < 8 ; i++) {
    
    if( 0x80 == (value & 0x80) ){
      DS.write(1);
    }
    else {
      DS.write(0);
    }
    // clock data
    SHCP.write(0);
    SHCP.write(1);
    // 
    value = value << 1;
  }
  // latch data
  STCP.write(1);
  STCP.write(0);
}


/**
 * 逐顆亮燈
 */
function setBit(bitIndex) {
  setOutput(valeurMirroir | (1 << bitIndex));
}
/**
 * 逐顆熄燈
 */
function clrBit(bitIndex) {
  setOutput(valeurMirroir & ~(1 << bitIndex));
}


// start it !
setInterval(
  function() {
    if(chaserIndex > 7){
      clrBit(chaserIndex - 8);
    }
    else {
      setBit(chaserIndex);
    }
    
    chaserIndex++;
    if(chaserIndex > 15) 
      chaserIndex=0;
  }
  , sequence );
