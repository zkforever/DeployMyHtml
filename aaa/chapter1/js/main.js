/**
 * Created by Administrator on 2015/6/3.
 */
var slideInBottom = {
    "transform": "translate3d(0, 0, 0)",
    "-moz-transform": "translate3d(0, 0, 0)",
    "-webkit-transform": "translate3d(0, 0, 0)",
    "-o-transform": "translate3d(0, 0, 0)",
    //"top": "0",
    "animation": "slideInBottom 0.15s",
    "-moz-animation": "slideInBottom 0.15s",
    "-webkit-animation": "slideInBottom 0.15s",
    "-o-animation": "slideInBottom 0.15s",
    "-webkit-animation-fill-mode": "forwards",
    "-moz-animation-fill-mode": "forwards",
    "animation-fill-mode": "forwards"
};
var slideOutTop = {
    "transform": "translate3d(0, 0, 0)",
    "-moz-transform": "translate3d(0, 0, 0)",
    "-webkit-transform": "translate3d(0, 0, 0)",
    "-o-transform": "translate3d(0, 0, 0)",

    "transform": "translate3d(0, -100%, 0)",
    "-moz-transform": "translate3d(0, -100%, 0)",
    "-webkit-transform": "translate3d(0, -100%, 0)",
    "-o-transform": "translate3d(0, -100%, 0)",
    //"top": "-100%",
    "animation": "slideOutTop 0.15s",
    "-moz-animation": "slideOutTop 0.15s",
    "-webkit-animation": "slideOutTop 0.15s",
    "-o-animation": "slideOutTop 0.15s",
    "-webkit-animation-fill-mode": "forwards",
    "-moz-animation-fill-mode": "forwards",
    "animation-fill-mode": "forwards"
};
var slideOutBottom = {
    "transform": "translate3d(0, 0, 0)",
    "-moz-transform": "translate3d(0, 0, 0)",
    "-webkit-transform": "translate3d(0, 0, 0)",
    "-o-transform": "translate3d(0, 0, 0)",

    "transform": "translate3d(0, 100%, 0)",
    "-moz-transform": "translate3d(0, 100%, 0)",
    "-webkit-transform": "translate3d(0, 100%, 0)",
    "-o-transform": "translate3d(0, 100%, 0)",
    //"top": "100%",
    "animation": "slideOutBottom 0.15s",
    "-moz-animation": "slideOutBottom 0.15s",
    "-webkit-animation": "slideOutBottom 0.15s",
    "-o-animation": "slideOutBottom 0.15s",
    "-webkit-animation-fill-mode": "forwards",
    "-moz-animation-fill-mode": "forwards",
    "animation-fill-mode": "forwards"
};
var slideInTop = {
    "transform": "translate3d(0, 0, 0)",
    "-moz-transform": "translate3d(0, 0, 0)",
    "-webkit-transform": "translate3d(0, 0, 0)",
    "-o-transform": "translate3d(0, 0, 0)",
    //"top": "0",
    "animation": "slideInTop 0.15s",
    "-moz-animation": "slideInTop 0.15s",
    "-webkit-animation": "slideInTop 0.15s",
    "-o-animation": "slideInTop 0.15s",
    "-webkit-animation-fill-mode": "forwards",
    "-moz-animation-fill-mode": "forwards",
    "animation-fill-mode": "forwards"
};
var currentUser = null;
var localPage = 1;
//保存进度
function postJson (videoName){
    if (currentUser != null) {
        console.log("localPage==="+localPage);
        $.ajax({
        url: currentUser.WebApi+'CoursesH5/SaveH5CourseStudyHistory?courseid='+currentUser.courseid+'&sectionid='+currentUser.sectionid+'&userId='+currentUser.userId+"&progress="+localPage,
        method: 'GET',        
        dataType: 'jsonp',
        //jsonp: 'jsonpCallback',
        success: function (data) {   
            console.log(data)
            if (videoName == "") {
                if (data.Success == true) {
                    alert(data.Message)
                }
            }
        }
    });
    }
}
//接收父页面传值
window.onmessage = function(e){
    e = e || event;
    var action = e.data;
    if (action == "saveSourceStudy") {
        postJson("");
    }
};
function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}
var s = getURLParameter('data');
if (s != null && typeof(s) != undefined) {
    h5GetUser(s);
}

function h5GetUser(userStr) {//获取user回调函数
    //alert(user);

    if(isThisMobile()){
    	 var user = {
            'usercode': 'FANGXIA_JIN',
            'courseid': 61,
            'itemid': 222,
            'fileid': 3834
    	}	
		 // var user = JSON.parse(userStr);
		    $.ajax({
		        url: 'http://eln.gtmc.com.cn/webapi/api/Courses/GetH5CourseStudyHistory',
		        method: 'get',
		        data: {
		            'usercode': user.UserCode,
		            'courseid': user.CourseId,
		            'itemid': user.ItemId,
		            'fileid': user.FileId
		        },
		        dataType: 'jsonp',
		        success: function (data) {
		            console.log(data);
		            localPage = data.Data.Page;
		            if (localPage > allPage) {
	                	localPage = allPage;
	            	}
	            	// resetPage(localPage);
	            	currentPage = localPage;
	            	initBodyPages(currentPage);
		        },
		        error: function (jqXHR, textStatus, errorThrown) {
		        	currentPage = localPage;
	            	initBodyPages(currentPage);
		        }
		    });
    }else{
    	var user = JSON.parse(userStr);
    	currentUser = user;
	    $.ajax({
	        url: currentUser.WebApi+'CoursesH5/GetH5CourseStudyHistory',
	        method: 'get',
	        data: {
	            'userId': user.userId,
	            'courseid': user.courseid,
	            'sectionid': user.sectionid
	        },
	        dataType: 'jsonp',
	        success: function (data) {
	            console.log(data);
	            localPage=data.Data.StudyProgress;
	            if (localPage > allPage) {
	                localPage = allPage;
	            }
	            resetPage(localPage);
	        }
	    });
    }

}

// ====================== 页数，以及页面上下箭头控制 ====================

var localPage = 1;
var videoPlayStatus = [];
var currentPage = 1;
function resetP (){
        if (currentPage == allPage) {
            $(".go").hide();
            $(".up").show();
        }else if (currentPage == 1){
            $(".up").hide();
            $(".go").show();
        }else {
            // if (currentPage == 11 && answerQuestions.length <1) {
            //     $(".go").hide();
            //     $(".up").show(); 
            // }else if (currentPage == 12 && answerQuestions.length <2) {
            //     $(".go").hide();
            //     $(".up").show(); 
            // }else{
                $(".go").show();
                $(".up").show(); 
            // }
        }
    }
function resetPage(x){
    currentPage = x;
    resetP();
    if (currentPage >= prePage) {
        //当前是下翻页
        resetLocalPage(currentPage);
        playAnim(true);
    }else{
        playAnim(false);
    }
}

function resetLocalPage(localPage){
    for (var i = 1; i < localPage; i++) {//看过的页面全部滑走，新页面进入
        $(".page" + i).css(slideOutTop);
    }
    $(".page" + localPage).show();
    $(".page" + localPage).addClass("animate");
    $(".page" + localPage).css(slideInBottom);
}
var audioNo = 1;
var canscroll=false;

//========================播放声音======================
function playAudio(src, e) {
    //document.getElementById("myAudio" + page).currentTime = 0;
    media = document.getElementById("myAudio1");
    if (media.played) {
        media.pause();
    }
    media.src = "audio/" + src;
    $(".up").hide();
    $(".go").hide();
    
    setTimeout(function(){
        media.play();
        media.addEventListener(e, function () {
        });
        media.addEventListener("ended",function(e){
            if (endWith(this.src,"t1.mp3") || endWith(this.src,"t3.mp3")|| endWith(this.src,"t4.mp3")|| endWith(this.src,"c5.mp3")|| endWith(this.src,"c8.mp3")|| endWith(this.src,"c9.mp3")|| endWith(this.src,"c10.mp3")) {
                return;
            }
            resetP();
        });
    },100);
    
}

//控制每页的声音播放
function playPageAudio(){
    switch (currentPage){
        case 1:{
            //sa传动系统
            playAudio("t1.mp3");
            setTimeout(function (){
                playAudio("t2.mp3");
            }, 2500);
            break;
        };
        case 2:{
            //传动系统组成
             playAudio("t3.mp3");
             setTimeout(function (){
                 playAudio("t4.mp3");
                 setTimeout(function (){
                    playAudio("t5.mp3");
                 }, 19500);
                
             }, 17000);
            break;
        };
        case 3:{
            //前置发动机前轮驱动
             setTimeout(function (){
                playAudio("t6.mp3");
             }, 360);
            break;
        };
        case 4:{
            //前置发动机后轮驱动
            playAudio("t7.mp3");
            break;
        };
        case 5:{
            //前置发动机后轮驱动
            playAudio("t8.mp3");
            break;
        };
        case 6:{
            //离合器
            playAudio("c1.mp3");
            break;
        };
        case 7:{
            playAudio("c2.mp3");
            break;
        }
        case 8:{
            //离合器的组成与构成
            playAudio("c3.mp3");
            setTimeout(function (){
                playAudio("c4.mp3");
            }, 7000);
            break;
        };
        case 9:{
            //离合器工作原理
             playAudio("c5.mp3");
             setTimeout(function (){
                playAudio("c6.mp3");
             }, 8000);
            break;
        };
        case 10:{
            //离合器的作用
             playAudio("c7.mp3");
            break;
        };
        case 11:{
            //离合器要求
             playAudio("c8.mp3");
             setTimeout(function (){
                playAudio("c9.mp3");
                setTimeout(function (){
                    playAudio("c10.mp3");
                    setTimeout(function (){
                        playAudio("c11.mp3");
                    },5100);
                },5100);
             }, 2100);
            break;
        };
        case 12:{
            playAudio("e1.mp3");
            break;
        };
        case 13:{
            playAudio("e2.mp3");
            break;
        };
        case 14:{
            playAudio("e3.mp3");
            break;
        };
        case 15:{
            playAudio("e4.mp3");
            break;
        }
        case 16:{
            playAudio("e5.mp3");
            break;
        }
    }
}

//播放AE动画
function playAnim (isLastFrame){
    if (isLastFrame) {
        playPageAudio();
    }    
    if (currentPage == 5 || currentPage == 6) {
        //第5页没有
        return;
    }
    var animPage = animPages[currentPage];
    if (animPage == undefined) {
        return;
    }
    if (!isLastFrame) {
        //跳到最后一个
        animPage.updateAnimation(10000);
    }else {
        animPage.stop();
        animPage.play();
    }
}
//音频object
var media = document.getElementById("myAudio1");
var animPages = [];
// http://eln.gtmc.com.cn/ELN_TEST/1/transmission/page2/data.json
// var paths = [    "http://eln.gtmc.com.cn/ELN_TEST/1/transmission/page2/data.json",
//                  "http://eln.gtmc.com.cn/ELN_TEST/1/transmission/page3/data.json",
//                  "http://eln.gtmc.com.cn/ELN_TEST/1/transmission/page4/data.json",
//                  "",
//                  "http://eln.gtmc.com.cn/ELN_TEST/1/clutch/clutchPage1/data.json",
//                  "http://eln.gtmc.com.cn/ELN_TEST/1/clutch/clutchPage2/data.json",
//                  "http://eln.gtmc.com.cn/ELN_TEST/1/clutch/clutchPage3/data.json",
//                  "http://eln.gtmc.com.cn/ELN_TEST/1/clutch/clutchPage4/data.json",
//                  "http://eln.gtmc.com.cn/ELN_TEST/1/clutch/clutchPage5/data.json",
//                  ""
//                  ];//json的地址
var paths = [    "http://zkforever.cn/DeployMyHtml/Transmission/page2/data.json",
                 "http://zkforever.cn/DeployMyHtml/Transmission/page3/data.json",
                 "http://zkforever.cn/DeployMyHtml/Transmission/page4/data.json",
                 "",
                 "",
                 "http://zkforever.cn/DeployMyHtml/clutch/clutchPage1/data.json",
                 "http://zkforever.cn/DeployMyHtml/clutch/clutchPage2/data.json",
                 "http://zkforever.cn/DeployMyHtml/clutch/clutchPage3/data.json",
                 "http://zkforever.cn/DeployMyHtml/clutch/clutchPage4/data.json",
                 "http://zkforever.cn/DeployMyHtml/clutch/clutchPage5/data.json",
                 ""
                 ];//json的地址


var prePage = 1; //翻页前上一页
var allPage = 16;
var answerQuestions = [];
//============================初始化AE动画开始
function initBody(page,callback){
    if (page == 5 || page == 6) {
        console.log("initBody");
        if (callback) {
            callback();
        }
        return;
    }
    if (animPages[page] == undefined || animPages[page] == null){
        var type = "html";
        if (page >= 9) {
            type = "svg";
        }
        var animDataPage = {
            wrapper: document.getElementById('bodymovinPage'+page),
            animType: type,
            loop: false,
            prerender: true,
            autoplay: false,
            path: paths[page-2]
        };
        var animPage = bodymovin.loadAnimation(animDataPage);
        console.log("animPage==="+page);
        animPages[page] = animPage;
        animPage.addEventListener("data_ready",function(){
            if (callback) {
                callback();
            }
        });
        if (page == 1) {
            if (callback) {
                callback();
            }
        }
    }else {
         if (callback) {
            callback();
         }
    }
}

function initBodyBlock (page,pageNext,pagePre){
    if (page > 1) {
        initBody(page,function(){
         initBody(pagePre,function(){
            initBody(pageNext,function(){
                resetPage(currentPage);
            });
         });
        });   
    }else{
        initBody(page,function(){
            initBody(pageNext,function(){
                resetPage(currentPage);
            });
        });  
    }    
}

function initBodyPages(page) {
    if (page == 1 || page == 5 || page == 6) {
        initBody(page+1,function(){
            resetPage(currentPage);
        });
        return;
    }else if(page == 11){
         initBody(page-1,function(){
            resetPage(currentPage);
        });
    }else if (page >= 12){
         initBody(11,function(){
            resetPage(currentPage);
        });
        return;
    }
    if (page == 4) {
        initBodyBlock(page,page+3,page-1); 
    }else {
        initBodyBlock(page,page+1,page-1); 
    }
}
//============================初始化AE动画结束

//向上翻页
function wipeUpFun(){
    if (currentPage <= 10) {
        if (media != null && !media.ended) {
            return;
        }
    }
    if (currentPage > allPage) {
        currentPage = allPage;
    }
    var pre =  currentPage-1;
    $(".page"+currentPage).css(slideOutBottom);
    $(".page"+pre).css(slideInTop);
    prePage = currentPage;
    currentPage = pre;
    initBodyPages(currentPage);
    $(".page" + pre).show();
    $(".page" + pre+1).hide();
    console.log("currentPage"+currentPage);
}

//向下翻页
function wipeDownFun(){
    if (currentPage < 11) {
        if (media != null && !media.ended) {
            return;
        }
    }
    if (currentPage > allPage) {
        currentPage = allPage;
    }

    console.log("aa"+currentPage);
    var next = currentPage+1;
    $(".page"+ currentPage).css(slideOutTop);
    $(".page"+ next).css(slideInBottom);
    if (localPage < currentPage+1) {
        localPage = currentPage+1;
        console.log("localPage"+localPage);
    }
    setTimeout(function () {
        $(".page" + currentPage).removeClass("animate");
        $(".page" + next).addClass("animate");
    }, 250);
    prePage = currentPage;
    currentPage = next;
    initBodyPages(currentPage);
    console.log("currentPage===="+currentPage);
    $(".page" + next).show();
    $(".page" + currentPage-1).hide();
}

// ===================================== ================================ 加载dom后之事===============================

$(document).ready(function () {
    // currentPage = 14;
    // initBodyPages(currentPage);
    // if (isThisMobile()) {
    // 	h5GetUser(1);
    // 	 // window.location = "jxx://getUser?callback=h5GetUser";//获取user信息请求
    // }else{
    	currentPage = 1;
    	initBodyPages(currentPage);
    // }
    $(".up").click(function() {
        wipeUpFun();            
    });
    $(".go").click(function() {
        wipeDownFun();
    });

    //翻页
    for (var pageIndex = 1; pageIndex < allPage+1; pageIndex++) {//切换页面
         (function () {
             var local = pageIndex;
             // if (local != 11) {
                 $(".page" + local).touchwipe({
                 wipeUp: function () {
                     wipeDownFun();
                 },
                 wipeDown: function () {
                      wipeUpFun();
                 }
                });
             // }
         })();
     }

    //第五页
    var elem = document.querySelector('.js-min-max-start');//选择input元素
    var isNotFirst = false;
    var currentPowerValue = 50;
    var isLock = 0;
    var init = new Powerange(elem, { min: 0, max: 100, start: 50, hideRange:true, callback: function() {
        if (isNotFirst) {
        	if (elem.value == 100 || elem.value == 0) {
        		return;
        	}
        	// console.log("currentPowerValue=="+currentPowerValue+"====elem.value="+elem.value);
        	if (!isLock) {
        		isLock = 1;
        		var elemValue = elem.value;
    	        if (currentPowerValue > elemValue) {
    	        	// console.log("currentPowerValue2222=="+currentPowerValue+"====elem.value="+elemValue);
    	         //    console.log(2222);
    	            if (currentPowerValue > elemValue) {
    	            	currentPowerValue = elemValue;
    					$('#gifImg5_1').fadeOut();
    	            	$('#gifImg5_3').fadeOut();
    	            	$('#gifImg5_2').fadeIn();
    	            }
    	        }else if(currentPowerValue < elemValue){
    	        	// console.log(11111);
    	        	// console.log("currentPowerValue1111=="+currentPowerValue+"====elem.value="+elemValue);
    	        	if (currentPowerValue < elemValue) {
    	        		currentPowerValue = elemValue;
    	            	$('#gifImg5_1').fadeOut();
    	            	$('#gifImg5_2').fadeOut();
    	            	$('#gifImg5_3').fadeIn();
    	        	}
    	        }
    	        isLock = 0;
        	}
        }else {
            isNotFirst = true;
        }
    }});//实例化powerange类并且初始化参数
    init.value = 50;

    // //第11页
    initQuest1Data();

    //第12页
    var answer2 = 0;
    $(".rightClickClass").click(function(){
        $(".falseClickClass").removeClass("answerFalseClick");
        $(".falseClickClass").addClass("answerFalse");
        $(".rightClickClass").removeClass("answerRight");
        $(".rightClickClass").addClass("answerRightClick");
        answer2 = 1;
    });

    $(".falseClickClass").click(function(){
        $(".rightClickClass").removeClass("answerRightClick");
        $(".rightClickClass").addClass("answerRight");
        $(".falseClickClass").removeClass("answerFalse");
        $(".falseClickClass").addClass("answerFalseClick");
        answer2 = 2;
    });

    //第13页
    var answer3 = 0;
    $(".exerciseAnswer2Btn").click(function(){
    	var allID = ["exerciseAnswer2_1","exerciseAnswer2_2","exerciseAnswer2_3","exerciseAnswer2_4"];
    	var thisId = this.id;
    	for (var i = 0; i < allID.length; i++) {
    		if (thisId == allID[i]) {
    			$("#"+thisId).removeClass(thisId);
    			$("#"+thisId).addClass(thisId+"Click");
    			answer3 = i+1;
    		}else {
				$("#"+allID[i]).removeClass(allID[i]+"Click");
    			$("#"+allID[i]).addClass(allID[i]);
    		}
    	}
    });
    

    $(".commitBtn2").click(function () {
        if (answer2 == 1) {
            if (answerQuestions.length == 1) {
                answerQuestions.push("1");
            }
            $(".true").show();
            wrongTime1  = 0;
        }else{
            wrongTime1++;
            if(wrongTime1==2){
                $(".answer2").show();
                wrongTime1  = 0;
            }
            else{
                $(".false").show();
            }
        }
    });

    $(".commitBtn3").click(function(){
    	if (answer3 == 1)  {
            if (answerQuestions.length == 2) {
                answerQuestions.push("1");
            }
            $(".true").show();
            wrongTime1  = 0;
        }else{
            wrongTime1++;
            if(wrongTime1==2){
                $(".answer3").show();
                wrongTime1  = 0;
            }
            else{
                $(".false").show();
            }
        }
    });


    $(".shutVideo").click(function(){//关闭视频
        myVid.pause();
        console.log(myVid.ended);
        if(myVid.ended){//视频看完
            videoPlayStatus[number]=true;
        }
        $(".videoPlay ").hide();
    });
    //选择题1
    var subject1 = false;
    var subject2 = false;
    var wrongTime1=0;
    var wrongTime2=0;
    $(".chooseList li").click(function () {
        if ($(this).hasClass("choose")) {
            $(this).removeClass("choose");
            $(".commit1").removeClass("active");
        }
        else {
            $(".chooseList li").removeClass("choose");
            $(this).addClass("choose");
            $(".commit1").addClass("active");
        }
    });
    $(".commitBtn1").click(function () {
        if (quest1Answers.length == 5) {
            var quest = quest1Answers;
            var trueAnswer = ["0","1","4","6","8"];
            var isAllTrue = true;
            for (var i = quest.length - 1; i >= 0; i--) {
                var answer = quest[i];
                var isTrue = false;
                for (var j = 0; j < trueAnswer.length; j++) {
                    if (answer == "quest1Answer"+trueAnswer[j]) {
                        isTrue = true;
                        break;
                    }
                }
                if (!isTrue) {
                    isAllTrue = false;
                    break;
                }
            }
            if (isAllTrue) {
                console.log("true");
                if (answerQuestions.length == 0) {
                    answerQuestions.push("1");
                }
                wrongTime1  = 0;
                $(".true").show();
               
            }else{
                wrongTime1++;
                if(wrongTime1==2){
                    $(".answer1").show();
                    wrongTime1 = 0;
                }
                else{
                    $(".false").show();
                }
            }
        }else{
            wrongTime1++;
            if(wrongTime1==2){
                $(".answer1").show();
                wrongTime1  = 0;
            }
            else{
                $(".false").show();
            }
        }
    });
    $(".true .trueBtn").click(function () {
        $(".true").hide();
       
    });
    $(".answer1 .shut").click(function () {
        $(".chooseList li").removeClass("choose");
        $(".commit1").removeClass("active");
        $(".answer1").hide();
    });

  $(".answer3 .shut").click(function () {
        $(".chooseList li").removeClass("choose");
        $(".commit1").removeClass("active");
        $(".answer3").hide();
    });

    $(".false .falseBtn").click(function () {
        $(".chooseList li").removeClass("choose");
        $(".commit1").removeClass("active");
        $(".false").hide();
    });
    //选择题2
    var choose1 = false;
    var choose2 = false;
    $(".page7 .leftTi .chooseItem").click(function () {
        if ($(this).hasClass("yes")) {
            $(".page7 .leftTi .chooseItem").removeClass("yes");
            choose1 = false;
            $(".commit2").removeClass("active");
            console.log(choose1);
        }
        else {
            $(".page7 .leftTi .chooseItem").removeClass("yes");
            $(this).addClass("yes");
            choose1 = true;
            if (choose1 && choose2) {
                $(".commit2").addClass("active");
            }
            console.log(choose1);
        }
    });
    $(".page7 .rightTi .chooseItem2").click(function () {
        if ($(this).hasClass("yes")) {
            $(".page7 .rightTi .chooseItem2").removeClass("yes");
            choose2 = false;
            $(".commit2").removeClass("active");
            console.log(choose2);
        }
        else {
            $(".page7 .rightTi .chooseItem2").removeClass("yes");
            $(this).addClass("yes");
            choose2 = true;
            if (choose1 && choose2) {
                $(".commit2").addClass("active");
            }
            console.log(choose2);
        }
    });
    $(".commit2").click(function () {
        if ($(this).hasClass("active")) {
            console.log("xxx");
            if ($(".page7 .leftTi .yes").hasClass("success") && $(".page7 .rightTi .yes").hasClass("success")) {//选择正确
                $(".true").show();
                $(".page7 .go").show();
                subject2=true;
            }
            else {
                wrongTime2++;
                if(wrongTime2==2){
                    $(".answer2").show();
                }
                else{
                    $(".false2").show();
                }
            }
        }
    });
    $(".answer2 .shut").click(function () {//答案提示弹框按钮
        choose1 = false;
        choose2 = false;
        $(".page7 .leftTi .chooseItem").removeClass("yes");
        $(".page7 .rightTi .chooseItem2").removeClass("yes");
        $(".commit2").removeClass("active");
        $(".answer2").hide();
    });
    $(".false2 .false2Btn").click(function () {//错误弹框按钮
        choose1 = false;
        choose2 = false;
        $(".page7 .leftTi .chooseItem").removeClass("yes");
        $(".page7 .rightTi .chooseItem2").removeClass("yes");
        $(".commit2").removeClass("active");
        $(".false2").hide();
    });
    $(".reset").click(function () {
        $(".page10").css(slideOutBottom);
        $(".page1").css(slideInTop);
        resetPage(1);
    });
    $(".backto").click(function () {
    	if (isThisMobile()) {
        	window.location = "jxx://getLocalPage?localPage=" + localPage;//返回给APP当前的页
    	}else {
        	postJson("");
    	}
    })
});

//图片预加载
var imgReady = (function () {
    var list = [], intervalId = null,

    // 用来执行队列
    tick = function () {
        var i = 0;
        for (; i < list.length; i++) {
            list[i].end ? list.splice(i--, 1) : list[i]();
        };
        !list.length && stop();
    },

    // 停止所有定时器队列
    stop = function () {
        clearInterval(intervalId);
        intervalId = null;
    };

    return function (url, ready, load, error) {
        var onready, width, height, newWidth, newHeight,
            img = new Image();
        
        img.src = url;

        // 如果图片被缓存，则直接返回缓存数据
        if (img.complete) {
            ready.call(img);
            load && load.call(img);
            return;
        };
        
        width = img.width;
        height = img.height;
        
        // 加载错误后的事件
        img.onerror = function () {
            error && error.call(img);
            onready.end = true;
            img = img.onload = img.onerror = null;
        };
        
        // 图片尺寸就绪
        onready = function () {
            newWidth = img.width;
            newHeight = img.height;
            if (newWidth !== width || newHeight !== height ||
                // 如果图片已经在其他地方加载可使用面积检测
                newWidth * newHeight > 1024
            ) {
                ready.call(img);
                onready.end = true;
            };
        };
        onready();
        
        // 完全加载完毕的事件
        img.onload = function () {
            // onload在定时器时间差范围内可能比onready快
            // 这里进行检查并保证onready优先执行
            !onready.end && onready();
        
            load && load.call(img);
            
            // IE gif动画会循环执行onload，置空onload即可
            img = img.onload = img.onerror = null;
        };

        // 加入队列中定期执行
        if (!onready.end) {
            list.push(onready);
            // 无论何时只允许出现一个定时器，减少浏览器性能损耗
            if (intervalId === null) intervalId = setInterval(tick, 40);
        };
    };
})();

var quest1Answers = [];
function questItemClick(e){
    var inId = e.id;
    aId = "."+inId;
    if($(aId).hasClass('itemClick')){
        $(aId).removeClass("itemClick");
        $(aId).addClass("itemRight");
        quest1Answers.remove(inId);
    }else {
        $(aId).removeClass("itemRight");
        $(aId).addClass("itemClick");
        quest1Answers.push(inId);
    }
    console.log(quest1Answers);
}

Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
    this.splice(index, 1);
    }
};

function initQuest1Data(){
    var html = '<div class="ss">';
    var btnArray = ["动力损耗小","直线行驶稳定性好","操控性好","在急转弯时如果驱动力过大容易甩尾","空间利用率更高","空间小","易推头","制动性强","易转向不足"];
    for(var i=0; i<btnArray.length; i++){
        var  s = btnArray[i];
        html += '<button class="itemRight quest1Answer'+i+'" onclick="questItemClick(this)" id="quest1Answer'+i+'" >'+s+'</button>';
    }
    html += '<div class="aSpace"></div></div>';
    document.querySelector('.exerciseAnswer .cc').innerHTML = html+html; // 复制一份数据
    var height = document.querySelector('.exerciseAnswer .ss').offsetHeight; // 一份数据的高度
    addKeyFrames( '-'+height+'px' ); // 设置keyframes
    document.querySelector('.exerciseAnswer .cc').className += ' rowup'; // 添加 rowup
}


// 设置keyframes属性
function addKeyFrames(y){
    var style = document.createElement('style');
    style.type = 'text/css';
    var keyFrames = '\
    @-webkit-keyframes rowup {\
        0% {\
            -webkit-transform: translate3d(0, 0, 0);\
            transform: translate3d(0, 0, 0);\
        }\
        100% {\
            -webkit-transform: translate3d(0, A_DYNAMIC_VALUE, 0);\
            transform: translate3d(0, A_DYNAMIC_VALUE, 0);\
        }\
    }\
    @keyframes rowup {\
        0% {\
            -webkit-transform: translate3d(0, 0, 0);\
            transform: translate3d(0, 0, 0);\
        }\
        100% {\
            -webkit-transform: translate3d(0, A_DYNAMIC_VALUE, 0);\
            transform: translate3d(0, A_DYNAMIC_VALUE, 0);\
        }\
    }';
    style.innerHTML = keyFrames.replace(/A_DYNAMIC_VALUE/g, y);
    document.getElementsByTagName('head')[0].appendChild(style);
}

//工具方法，str以什么结束
function endWith(str1, str2){
     if(str1 == null || str2 == null){
      return false;
     }
     if(str1.length < str2.length){
      return false;
     }else if(str1 == str2){
      return true;
     }else if(str1.substring(str1.length - str2.length) == str2){
      return true;
     }
     return false;
}

function isThisMobile() {
	var ua =  navigator.userAgent;
    isAndroid = /Android/i.test(ua);
    isBlackBerry = /BlackBerry/i.test(ua);
    isWindowPhone = /IEMobile/i.test(ua);
    isIOS = /iPhone|iPad|iPod/i.test(ua);
    isMobile = isAndroid || isBlackBerry || isWindowPhone || isIOS;
    return isMobile;
}


