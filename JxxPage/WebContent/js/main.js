//顾问列表
var salesObjs = [];
//var openid = document.getElementById("openid").value;
var swiper = new Swiper('.swiper-container', {
	loop: true,
	spaceBetween: 30,
	centeredSlides: true,
	slidesPerView: 'auto',
	on: {
		click: function() {
			var consultantID = salesObjs[this.realIndex].StfCd;
			console.log("1111"+consultantID);
			var param = "consultantCode=" + consultantID;
			directURLWithParam("consultantDetail.html",param);
		},
	},
	init: false,
});

window.onload = function(){
	// getAllSales();
	var data = {
	"Status":1,
	"Message":[
		{"StfCd":"100010@44A00",
		"StfName":"柳文俊",
		"Gender":"男",
		"Age":"30",
		"WorkingExperience":"6",
		"WorkStatus":"0",
		"Hometown":"广州",
		"LabelJson":["运动"],
		"MediaJson":[{"MediaType":"1",
					 "ImageUrl":"https://gmstest.gtmc.com.cn/GMSFile/StaffImgUploadImg/44A00/201903/44A00_999906_201903161700472897014.jpg",
					 "SortNo":"1",
					 "VedioUrl":""}]

		        }     
		]
	};
	loadData(data);
}

$(".choose").on("click",function(e){
	var consultantObj = salesObjs[swiper.realIndex];
	var consultantStr = consultantObj.StfCd;
	var param = "Consultant=" + consultantStr;
	directURLWithParam("reservation.html",param);
});



function loadData(data) {
	var msg = data.Message;
	var status = data.Status;
	if(1 == status) {
		for(var i = 0; i < msg.length; i++) {
			var salesObj = msg[i];
			var labels = "";
			for(var j = 0; j < salesObj.LabelJson.length;j++){
				var obj = salesObj.LabelJson[j];
				labels += obj.LabelContent; 
				if(j!=salesObj.LabelJson.length-1){
					labels += ",";
				}
			}
			salesObj.Labels = labels;
			for(var j = 0;salesObj.MediaJson.length;j++){
				var obj = salesObj.MediaJson[j];
				if(obj.MediaType == '1'){
					salesObj.imgURL = obj.ImageUrl;
					break;
				}
			}
			salesObjs.push(salesObj);
		}
		var templateSale = document.querySelector('#tmplateSale').innerHTML;
		var saleHtml = attachTemplateToData(templateSale, salesObjs);
		$(".salesWrapper").html(saleHtml);
		swiper.init();
	}
}



//获取所有顾问
function getAllSales() {
	//网络请求
	$.ajax({
		url: consultantsURL,
		async: true,
		data: {
//			"openId": openid
		},
		type: 'POST',
		success: function(data, textStatus, jqXHR) {
			console.log(data);
			if(textStatus == "success") {
				loadData(data);
			}
		}
	});
}