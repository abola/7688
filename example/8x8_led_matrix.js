/**
 * Linkit 7688 範例
 * 使用 GPIO 控制 8x8 LED Matrix (共陽)
 * 
 * @author Abola Lee 
 * @version 1.0
 * @since 2016-01-10
 * 
 * @link http://www.gibar.co/2016/01/linkit-7688-duo-74hc595-led.html
 */
var mraa = require('mraa');

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
var col = [
      new mraa.Gpio(2),
      , new mraa.Gpio(16)
      , new mraa.Gpio(17)
      , new mraa.Gpio(44)
      , new mraa.Gpio(5)
      , new mraa.Gpio(46)
      , new mraa.Gpio(0)
      , new mraa.Gpio(1) 
    ],
    row = [
      new mraa.Gpio(37),
      , new mraa.Gpio(3),
      , new mraa.Gpio(13),
      , new mraa.Gpio(45),
      , new mraa.Gpio(14),
      , new mraa.Gpio(12),
      , new mraa.Gpio(15),
      , new mraa.Gpio(4)      
    ];
    
// 預設全亮測試
for(var idx=0; idx<8; idx++) col[idx].dir(mraa.DIR_OUT_HIGH);
for(var idx=0; idx<8; idx++) row[idx].dir(mraa.DIR_OUT_LOW);

var offIndex=0;
setInterval(function(){
  if( offIndex<8 ) row[offIndex].write(1);
},250);
