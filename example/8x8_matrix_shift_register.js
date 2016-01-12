/**
 * Linkit 7688 (duo) 範例
 * 使用單顆 74hc595 控制8顆 LED 跑馬燈
 * 
 * @author Abola Lee 
 * @version 1.0
 * @since 2016-01-12
 * 
 * @link -
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

// 設定為 output
DS  .dir(m.DIR_OUT);
STCP.dir(m.DIR_OUT);
SHCP.dir(m.DIR_OUT);
