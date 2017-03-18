$(window).on('load',function(){
    //相当于原生的onload
    waterfall();

    //2.配合上滚动条的那些功能
    var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
    $(window).on('scroll',function(){
        if(checkscrollSlide){
            $.each(dataInt.data,function(key,value){
                //好像这个each函数被封装过了，而且功能挺强的
                // console.log(value);

                //相较于js创建html标签的优势
                var oBox = $('<div>').addClass('box').appendTo($('#main'));
                //JQ的两大优点，支持连缀，隐式迭代
                var oPic = $('<div>').addClass('pic').appendTo($(oBox));
                var oImg = $('<img>').attr('src','images/'+$(value).attr('src')).appendTo($(oPic));


                // console.log(value.attr('src'));
                // value这个对象还是object对象，用JQ方法的时候还是会报错
                // console.log($(value).attr('src'));
            })
            waterfall();
        }
    })
})


//和js的waterfall函数有区别
function waterfall(){
    var $boxs = $('#main>div');
    var w = $boxs.eq(0).outerWidth();
    //和$boxs.eq(0).Width()有区别
    //前者包括padding border
    var cols = Math.floor($(window).width()/w);
    $('#main').width(w*cols).css('margin','0 auto');
    
    //不用再像js那要用for循环遍历了
    var hArr = [];
    $boxs.each(function(index,value){//这个函数是jq已经封装好了？
        // console.log(value);
        var h = $boxs.eq(index).outerHeight();
        if(index<cols){
            hArr[index] = h;
        }else{
            var minH = Math.min.apply(null,hArr);
            //这个方法直接就能通过值来拿到对应的数组中的index
            var minHIndex = $.inArray(minH,hArr);

            //把DOM对象转化为jQ对象才能用jQ方法
            $(value).css({
                'position':'absolute',
                'top':minH+'px',
                //注意一定是逗号
                'left':minHIndex*w+'px'
            })
            hArr[minHIndex]+=$boxs.eq(index).outerHeight();
        }
    })
    console.log(hArr);
}

function checkscrollSlide(){
    var $lastBox = $('#main>div').last();
    var lastBoxDis = $lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);
    //相当于js里面的offsetTop
    var scrollTop = $(window).scrollTop;
    var documentH = $(window).height();
    return (lastBoxDis<scrollTop+documentH)?true:false;
}

























//原来的js实现：
// window.onload = function(){
//     waterfall('main','box');

//     //模拟后台得到的数据
        //不知为毛下一句是错误的??
//     // var dataInt = {"data":[{"src":'0.jpg'},{"src":'1.jpg'},{"src":'2.jpg'}，{"src":'3.jpg'}，{"src":'4.jpg'}，{"src":'5.jpg'}]};
//     var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
//     //拖动滚动条的时候会加载后面原本不显示的图片
//     //当然还有设置的条件，我们把它定位最后一张图片超过一半的时候就把它加载出来
//     window.onscroll = function(){
//         if(checkscrollSlide){
//             var oParent = document.getElementById('main');
//             //将数据块渲染到当前页面尾部
//             for(var i=0;i<dataInt.data.length;i++){
//                 var oBox = document.createElement('div');
//                 oBox.className = 'box';
//                 oParent.appendChild(oBox);
//                 var oPic = document.createElement('div');
//                 oPic.className = 'pic';
//                 oBox.appendChild(oPic);
//                 var oImg = document.createElement('img');
//                 oImg.src = "images/"+dataInt.data[i].src;
//                 oPic.appendChild(oImg);
//             }
//             waterfall('main','box');

//         }
//         checkscrollSlide();
//     }
// }
// function waterfall(parent,box){
//     //将main下的所有box的元素取出来
//     var oParent = document.getElementById(parent);
//     var oBoxs = getByClass(oParent,box);
//     //计算整个页面显示的列数（页面宽/box的宽度）
//     var oBoxW = oBoxs[0].offsetWidth;//拿到box宽度
//     var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
//     //设置main的宽度，然它窗口宽度缩小的时候，右边的框不会调到最左边，维持显示页面的宽度
//     oParent.style.cssText = 'width:'+oBoxW*cols+'px;margin:0 auto';

//     //第二行中的图片应该放在第一行最矮的图片的下方！！！！！！
//     var hArr=[];//存放每一列高度的数组
//     for(var i=0;i<oBoxs.length;i++){
//         if(i<cols){
//             hArr.push(oBoxs[i].offsetHeight);//放进第一行的class到数组里
//         }else{//第二行和第二行以下
//             var minH = Math.min.apply(null,hArr);
//             //用apply来将求最小值应用到数组上！！！
//             var index = getminHIndex(hArr,minH);
//             oBoxs[i].style.position = 'absolute';
//             oBoxs[i].style.top = minH+'px';
//              oBoxs[i].style.left = oBoxs[index].offsetLeft+'px';
//             //另外也可以：
//             // oBoxs[i].style.left = oBoxW*index+'px';
            
//             hArr[index]+=oBoxs[i].offsetHeight;
//         }
//     }
//     // console.log(hArr);



// }   

// //根据class获取元素
// function getByClass(parent,clsName){
//     var boxArr = new Array(),
//         oElements = parent.getElementsByTagName('*');//拿到所有子元素
//     for(var i=0;i<oElements.length;i++){
//         if(oElements[i].className==clsName){//为什么要这么复杂的写法？？
//             boxArr.push(oElements[i]);
//         }
//     }
//     return boxArr;
// }

// function getminHIndex(arr,val){
//     for(var i in arr){
//         if(arr[i]==val){
//             return i;
//         }
//     }
// }

// //检测是否具备了滚动条加载数据库的条件
// function checkscrollSlide(){
//     var oParent = document.getElementById('main');
//     var oBoxs = getByClass(oParent,'box');
//     var lastBoxH = oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);

//     //存在标准模式和混杂模式，所以要注意浏览器兼容问题
//     //在混杂模式下是通过body来检测滚轴的距离的
//     //在标准模式下是需要通过html元素来检测
//     var scrollTop = document.body.scrollTop||document.documentElement.scrollTop;
//     // console.log(scrollTop);
//     var height = document.body.clientHeight||document.documentElement.clientHeight;
//     return (lastBoxH<scrollTop+height)?true:false;
// }

