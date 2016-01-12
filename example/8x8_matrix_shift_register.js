/**
 * Linkit Smart 7688 Duo + 2 Shift Register(74HC595) 
 * use 3 GPIO pin control a 8x8 LED matrix 
 * ----
 * Linkit Smart 7688 Duo 範例
 * 使用3pin GPIO 加兩顆 74hc595 控制 8x8 LED Matrix 顯示文數字 
 * 
 * 
 * @author Abola Lee 
 * @version 1.0
 * @since 2016-01-12
 * 
 * @link -
 */
var mraa = require('mraa'),
    //載入字集
    text = require('./textTable.js');

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
var DS   = new mraa.Gpio(15),  
    STCP = new mraa.Gpio(16),
    SHCP = new mraa.Gpio(17);

// 設定為 output
DS  .dir(mraa.DIR_OUT);
STCP.dir(mraa.DIR_OUT);
SHCP.dir(mraa.DIR_OUT);


// 8x8 LED Matrix 腳位命名參考
//  
//    
//    \Col 1   2   3   4   5   6   7   8
//Row  \ _13__03__04__10__06__11__15__16_  (針腳)
// 1  09|                               |
// 2  14|                               |
// 3  08|                               |
// 4  12|              8x8              |
// 5  01|           LED Matrix          |
// 6  07|                               |
// 7  02|                               |
// 8  05|_______________________________|
//   (針腳)

function showFont(font) {
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
