var module = angular.module('detailApp', ['ngAnimate']);
module.controller('detailController', function($scope, $http) {
var salesID = getQueryString("consultantCode");
var saleObj;
var images = [];
console.log(salesID);

var _start = 0,
	_moveY = 0,
	_num = 0
document.getElementById('swiper-container').addEventListener('touchstart',function(e){
	_start = e.touches[0].clientY;
});
document.getElementById('swiper-container').addEventListener('touchmove',function(ev){
	_moveY = ev.touches[0].clientY;
	_num = _moveY - _start;
	if (Math.abs(_num) > 10) {
		if(_num){
			 var t = document.documentElement.scrollTop || document.body.scrollTop;
			$(window).scrollTop(t - _num)
		}
	}
});

//var openid = document.getElementById("openid").value;
var swiper = new Swiper('.swiper-container', {
//	direction:'vertical',
	loop: true,
	centeredSlides: true,
	slidesPerView: 'auto',
    observer: true,//修改swiper自己或子元素时，自动初始化swiper
    observeParents: true,//修改swiper的父元素时，自动初始化swiper
	init: false,
	 navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    pagination: {
        el: '.swiper-pagination',
      },
});
var detail =   {"Status": 1,
  "Message": {
    "StfCd": "101836@44A00",
    "StfName": "林清华",
    "Gender": "男",
    "Age": "28",
    "WorkingExperience": "5",
    "Speciality": "健身",
    "PersonalProfile": "大家好，我是林清华，清华大学的清华，浩瀚如林的林！我有一个爱我的老婆，和可爱的儿子，我希望通过自身的努力让他们过上无忧无虑的生活！",
    "Hometown": "四川成都",
    "LabelJson": [
      {
        "LabelContent": "四川boy"
      },
      {
        "LabelContent": "摩羯型男"
      },
      {
        "LabelContent": "效率工作"
      },
      {
        "LabelContent": "喜爱健身"
      },
      {
        "LabelContent": "足球健将"
      },
      {
        "LabelContent": "游戏达人"
      },
      {
        "LabelContent": "博览群书"
      }
    ],
    "MediaJson": [
      {
        "MediaType": "1",
        "ImageUrl": "https://gms.gtmc.com.cn/GMSFile/StaffImgUploadImg/44A00/201904/44A00_001808_201904112305128545374.jpg",
        "SortNo": "1",
        "VedioUrl": ""
      }
    ],
    "ScheduleStatus": "01",
    "WorkStatus": "0"
  }
};
loadDetail(detail);
// getASales(salesID);

$(".choose").on("click",function(e){
	var consultantObj = saleObj;
	var consultantStr = consultantObj.StfCd;
	var param = "Consultant=" + consultantStr;
	directURLWithParam("reservation.html",param);
});


function loadDetail(data){
	var msg = data.Message;
	var status = data.Status;
	if(1 == status) {
		saleObj = msg;
		for(var i = 0; i < msg.MediaJson.length; i++) {
			var obj = msg.MediaJson[i];
			if(obj.MediaType == 1) {
				obj.showVideo = "display:none";
				obj.showImg = "display:block";
				obj.Url = obj.ImageUrl;
			} else {
				obj.showVideo = "display:block";
				obj.showImg = "display:none";
				obj.Url = obj.VedioUrl;
			}
			obj.index = i;
			images.push(obj);
		}
		var labels = "";
		for(var j = 0; j < saleObj.LabelJson.length;j++){
			var obj = saleObj.LabelJson[j];
			labels += obj.LabelContent; 
			if(j!=saleObj.LabelJson.length-1){
				labels += ",";
			}
		}
		saleObj.Labels = labels;
		$scope.salesObj = saleObj;
		
		var templateSale = document.querySelector('#tmplateSaleHead').innerHTML;
		var saleHtml = attachTemplateToData(templateSale, images);
		$(".salesWrapper").html(saleHtml);
		swiper.init();
				// $scope.$apply();
	}
}


//获取某个顾问详情
function getASales(ConsultantId) {
	//网络请求
	$.ajax({
		url: consultantURL,
		async: true,
		data: {
//			"openId": openid,
			"ConsultantCode": ConsultantId
		},
		type: 'POST',
		success: function(data, textStatus, jqXHR) {
			console.log(data);
			if(textStatus == "success") {
				loadDetail(data);
			}
		}
	});
}
});