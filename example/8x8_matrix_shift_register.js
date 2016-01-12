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
STCP.dir(mraa.DIR_OUT_LOW);
SHCP.dir(mraa.DIR_OUT_HIGH);


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

var colMapping = [13, 3, 4,10, 6,11,15,16],
    rowMapping = [ 9,14, 8,12, 1, 7, 2, 5],
    mask = [0x80,0x40,0x20,0x10,0x08,0x04,0x02,0x01];

/**
 * 顯示字元
 * 
 */
function showFont(font,milliseconds){
  var start = new Date().getTime();
  while(1){
    // 計時器
    if ((new Date().getTime() - start) > milliseconds) break;
    
    // 逐column亮燈
    for(var colIndex=0;colIndex<8; colIndex++){
      // 重設燈號
      reset();
        
      // 每組訊號就是 8x shift register數量
      for(var idx=0; idx<16; idx++) {
        // 判定目前控製腳位是column 還是row
        if ( -1 == colMapping.indexOf(16-idx+1) ) {
          // is row
          // 啟用指定的 Row 使用 mask
          // ex: 1000 0000 & 1100 1100 => 1000 0000
           DS.write( (font[colIndex]&mask[rowMapping.indexOf(16-idx+1)])>0?0:1 );
        }else{
          // is column
          // 啟用目前指定的 Column
          DS.write( colMapping.indexOf(16-idx+1)==(colIndex+1)?1:0 );
        }
        
        // clock data
        pulseSHCP();
      }
      
      // latch data
      pulseSTCP();
    }
  }
}

/**
 * 回復全暗
 */
function reset(){
  for(var idx=0; idx<16; idx++) {
    if ( -1 == colMapping.indexOf(16-idx+1) ) {
      DS.write(1);
    }else{
      DS.write(0);
    }
    
    // clock data
    pulseSHCP();
  }
  
  // latch data
  pulseSTCP();
}

/**
 * 全亮
 */
function turnOn(){
  for(var idx=0; idx<16; idx++) {
    if ( -1 == colMapping.indexOf(16-idx+1) ) {
      DS.write(0);
    }else{
      DS.write(1);
    }
    
    // clock data
    pulseSHCP();
  }
  
  // latch data
  pulseSTCP();
}


function pulseSTCP(){STCP.write(1);STCP.write(0);}
function pulseSHCP(){SHCP.write(0);SHCP.write(1);}

turnOn();

var tableIndex=0;
// show time !!
while(tableIndex<text.textTable.length){
  showFont(text.textTable[tableIndex++], 200); // 每 200ms 換下一個字 
}
// end 
reset();
