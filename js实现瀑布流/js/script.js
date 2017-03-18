window.onload = function(){
    waterfall('main','box');

    //模拟后台得到的数据

    // var dataInt = {"data":[{"src":'0.jpg'},{"src":'1.jpg'},{"src":'2.jpg'}，{"src":'3.jpg'}，{"src":'4.jpg'}，{"src":'5.jpg'}]};
    //上面那一句是错误的，不知道为毛??
    var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
    //拖动滚动条的时候会加载后面原本不显示的图片
    //当然还有设置的条件，我们把它定位最后一张图片超过一半的时候就把它加载出来
    window.onscroll = function(){
        if(checkscrollSlide){
            var oParent = document.getElementById('main');
            //将数据块渲染到当前页面尾部
            for(var i=0;i<dataInt.data.length;i++){
                var oBox = document.createElement('div');
                oBox.className = 'box';
                oParent.appendChild(oBox);
                var oPic = document.createElement('div');
                oPic.className = 'pic';
                oBox.appendChild(oPic);
                var oImg = document.createElement('img');
                oImg.src = "images/"+dataInt.data[i].src;
                oPic.appendChild(oImg);
            }
            waterfall('main','box');

        }
        checkscrollSlide();
    }
}
function waterfall(parent,box){
    //将main下的所有box的元素取出来
    var oParent = document.getElementById(parent);
    var oBoxs = getByClass(oParent,box);
    //计算整个页面显示的列数（页面宽/box的宽度）
    var oBoxW = oBoxs[0].offsetWidth;//拿到box宽度
    var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
    //设置main的宽度，然它窗口宽度缩小的时候，右边的框不会调到最左边，维持显示页面的宽度
    oParent.style.cssText = 'width:'+oBoxW*cols+'px;margin:0 auto';

    //第二行中的图片应该放在第一行最矮的图片的下方！！！！！！
    var hArr=[];//存放每一列高度的数组
    for(var i=0;i<oBoxs.length;i++){
        if(i<cols){
            hArr.push(oBoxs[i].offsetHeight);//放进第一行的class到数组里
        }else{//第二行和第二行以下
            var minH = Math.min.apply(null,hArr);
            //用apply来将求最小值应用到数组上！！！
            var index = getminHIndex(hArr,minH);
            oBoxs[i].style.position = 'absolute';
            oBoxs[i].style.top = minH+'px';
             oBoxs[i].style.left = oBoxs[index].offsetLeft+'px';
            //另外也可以：
            // oBoxs[i].style.left = oBoxW*index+'px';
            
            hArr[index]+=oBoxs[i].offsetHeight;
        }
    }
    // console.log(hArr);



}   

//根据class获取元素
function getByClass(parent,clsName){
    var boxArr = new Array(),
        oElements = parent.getElementsByTagName('*');//拿到所有子元素
    for(var i=0;i<oElements.length;i++){
        if(oElements[i].className==clsName){//为什么要这么复杂的写法？？
            boxArr.push(oElements[i]);
        }
    }
    return boxArr;
}

function getminHIndex(arr,val){
    for(var i in arr){
        if(arr[i]==val){
            return i;
        }
    }
}

//检测是否具备了滚动条加载数据库的条件
function checkscrollSlide(){
    var oParent = document.getElementById('main');
    var oBoxs = getByClass(oParent,'box');
    var lastBoxH = oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);

    //存在标准模式和混杂模式，所以要注意浏览器兼容问题
    //在混杂模式下是通过body来检测滚轴的距离的
    //在标准模式下是需要通过html元素来检测
    var scrollTop = document.body.scrollTop||document.documentElement.scrollTop;
    // console.log(scrollTop);
    var height = document.body.clientHeight||document.documentElement.clientHeight;
    return (lastBoxH<scrollTop+height)?true:false;
}




// window.onload=function(){

//     waterfall('main','pin');

//     var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
    
//     window.onscroll=function(){
//         if(checkscrollside()){
//             var oParent = document.getElementById('main');// 父级对象
//             for(var i=0;i<dataInt.data.length;i++){
//                 var oPin=document.createElement('div'); //添加 元素节点
//                 oPin.className='pin';                   //添加 类名 name属性
//                 oParent.appendChild(oPin);              //添加 子节点
//                 var oBox=document.createElement('div');
//                 oBox.className='box';
//                 oPin.appendChild(oBox);
//                 var oImg=document.createElement('img');
//                 oImg.src='./images/'+dataInt.data[i].src;
//                 oBox.appendChild(oImg);
//             }
//             waterfall('main','pin');
//         };
//     }
// }

// /*
//     parend 父级id
//     pin 元素id
// */
// function waterfall(parent,pin){
//     var oParent=document.getElementById(parent);// 父级对象
//     var aPin=getClassObj(oParent,pin);// 获取存储块框pin的数组aPin
//     var iPinW=aPin[0].offsetWidth;// 一个块框pin的宽
//     var num=Math.floor(document.documentElement.clientWidth/iPinW);//每行中能容纳的pin个数【窗口宽度除以一个块框宽度】
//     oParent.style.cssText='width:'+iPinW*num+'px;ma rgin:0 auto;';//设置父级居中样式：定宽+自动水平外边距

//     var pinHArr=[];//用于存储 每列中的所有块框相加的高度。
//     for(var i=0;i<aPin.length;i++){//遍历数组aPin的每个块框元素
//         var pinH=aPin[i].offsetHeight;
//         if(i<num){
//             pinHArr[i]=pinH; //第一行中的num个块框pin 先添加进数组pinHArr
//         }else{
//             var minH=Math.min.apply(null,pinHArr);//数组pinHArr中的最小值minH
//             var minHIndex=getminHIndex(pinHArr,minH);
//             aPin[i].style.position='absolute';//设置绝对位移
//             aPin[i].style.top=minH+'px';
//             aPin[i].style.left=aPin[minHIndex].offsetLeft+'px';
//             //数组 最小高元素的高 + 添加上的aPin[i]块框高
//             pinHArr[minHIndex]+=aPin[i].offsetHeight;//更新添加了块框后的列高
//         }
//     }
// }

// /****
//     *通过父级和子元素的class类 获取该同类子元素的数组
//     */
// function getClassObj(parent,className){
//     var obj=parent.getElementsByTagName('*');//获取 父级的所有子集
//     var pinS=[];//创建一个数组 用于收集子元素
//     for (var i=0;i<obj.length;i++) {//遍历子元素、判断类别、压入数组
//         if (obj[i].className==className){
//             pinS.push(obj[i]);
//         }
//     };
//     return pinS;
// }
// /****
//     *获取 pin高度 最小值的索引index
//     */
// function getminHIndex(arr,minH){
//     for(var i in arr){
//         if(arr[i]==minH){
//             return i;
//         }
//     }
// }


// function checkscrollside(){
//     var oParent=document.getElementById('main');
//     var aPin=getClassObj(oParent,'pin');
//     var lastPinH=aPin[aPin.length-1].offsetTop+Math.floor(aPin[aPin.length-1].offsetHeight/2);//创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
//     var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;//注意解决兼容性
//     var documentH=document.documentElement.clientHeight;//页面高度
//     return (lastPinH<scrollTop+documentH)?true:false;//到达指定高度后 返回true，触发waterfall()函数
// }