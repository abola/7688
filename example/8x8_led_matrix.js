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
var col1 = new mraa.Gpio(2),
    col2 = new mraa.Gpio(16),
    col3 = new mraa.Gpio(17),
    col4 = new mraa.Gpio(44),
    col5 = new mraa.Gpio(5),
    col6 = new mraa.Gpio(46),
    col7 = new mraa.Gpio(0),
    col8 = new mraa.Gpio(1),
    row1 = new mraa.Gpio(37),
    row2 = new mraa.Gpio(3),
    row3 = new mraa.Gpio(13),
    row4 = new mraa.Gpio(45),
    row5 = new mraa.Gpio(14),
    row6 = new mraa.Gpio(12),
    row7 = new mraa.Gpio(15),
    row8 = new mraa.Gpio(4);
    
// 預設全亮測試
col1.dir(mraa.DIR_OUT_HIGH);
col2.dir(mraa.DIR_OUT_HIGH);
col3.dir(mraa.DIR_OUT_HIGH);
col4.dir(mraa.DIR_OUT_HIGH);
col5.dir(mraa.DIR_OUT_HIGH);
col6.dir(mraa.DIR_OUT_HIGH);
col7.dir(mraa.DIR_OUT_HIGH);
col8.dir(mraa.DIR_OUT_HIGH);

row1.dir(mraa.DIR_OUT_LOW);
row2.dir(mraa.DIR_OUT_LOW);
row3.dir(mraa.DIR_OUT_LOW);
row4.dir(mraa.DIR_OUT_LOW);
row5.dir(mraa.DIR_OUT_LOW);
row6.dir(mraa.DIR_OUT_LOW);
row7.dir(mraa.DIR_OUT_LOW);
row8.dir(mraa.DIR_OUT_LOW);
    
