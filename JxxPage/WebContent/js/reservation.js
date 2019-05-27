//var openid = document.getElementById("openid").value;
var adMsg = [];
var swiper = new Swiper('.swiper-container', {
	loop: true,
	centeredSlides: true,
	slidesPerView: 'auto',
	init: false,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	pagination: {
		el: '.swiper-pagination',
	},
	on: {
		click: function() {
			if(adMsg.length > 0){
				var obj = adMsg[this.realIndex];
				var html = obj["BannerLinkUrl"];
				directURLWithParam(html,"");
			}
		},
	},
});

$(".carImg").hide();
var selectCarCd = "";
function removeInvalidClass() {
	$(".nameLabel").removeClass("inputInvalid");
	$(".telLabel").removeClass("inputInvalid");
	$(".carLabel").removeClass("inputInvalid");
}

function removeAllLabel() {
	$(".carImg").removeClass("firstLabel");
	$(".carImg").removeClass("secondLabel");
	$(".carImg").removeClass("lastLabel");
	$(".carImg").show();
}

$(".nameLabel").on("focus", function(e) {
	removeAllLabel();
	removeInvalidClass();
	$(".carImg").addClass("firstLabel");
});

$(".nameLabel").on("blur", function(e) {
	removeAllLabel();
	$(".carImg").hide();
});

$(".telLabel").on("focus", function(e) {
	removeAllLabel();
	removeInvalidClass();
	$(".carImg").addClass("secondLabel");
});

$(".telLabel").on("blur", function(e) {
	removeAllLabel();
	$(".carImg").hide();
});
$(".carLabel").on("focus", function(e) {
	removeAllLabel();
	removeInvalidClass();
	$(".carImg").addClass("lastLabel");
});
$(".carLabel").on("blur", function(e) {
	removeAllLabel();
	$(".carImg").hide();
});

$(".carDiv").on("click", function(e) {
	removeAllLabel();
	removeInvalidClass();
	$(".carImg").addClass("lastLabel");

});

$(".submit").on("click", function(e) {
	var name = $(".nameLabel").val();
	var tel = $(".telLabel").val();
	var car = $(".carLabel").val();
	if(name == "") {
		$(".nameLabel").addClass("inputInvalid");
		return;
	}
	if(tel == "") {
		$(".telLabel").addClass("inputInvalid");
		return;
	}
	if(car == "") {
		$(".carLabel").addClass("inputInvalid");
		return;
	}
	var saleStr = getQueryString("Consultant");
	var paramObj = {
//		openId: openid,
		CustomerName: name,
		CustomerTelNo: tel,
		ModelCd: window.selectCarCd,
		ModelName: car,
		DlrCd:"44A00",
		StfCd:saleStr
	};
//	console.log("aaaaa==="+JSON.stringify(paramObj));
	submitReservation(paramObj);
});

var adData = {
  "Status": 1,
  "Message": [
    {
      "BannerImageUrl": "https://gms.gtmc.com.cn/GMSFile/BannerMediaImg/44A00/201905/44A00_001.jpg",
      "SortNo": "1",
      "BannerLinkUrl": "https://gms.gtmc.com.cn/GMSFile/BannerMediaImg/44A00/201905/44A00_001.jpg"
    },
    {
      "BannerImageUrl": "https://gms.gtmc.com.cn/GMSFile/BannerMediaImg/44A00/201905/44A00_002.jpg",
      "SortNo": "2",
      "BannerLinkUrl": "https://gms.gtmc.com.cn/GMSFile/BannerMediaImg/44A00/201905/44A00_002.jpg"
    },
    {
      "BannerImageUrl": "https://gms.gtmc.com.cn/GMSFile/BannerMediaImg/44A00/201905/44A00_003.jpg",
      "SortNo": "3",
      "BannerLinkUrl": "https://gms.gtmc.com.cn/GMSFile/BannerMediaImg/44A00/201905/44A00_003.jpg"
    },
    {
      "BannerImageUrl": "https://gms.gtmc.com.cn/GMSFile/BannerMediaImg/44A00/201905/44A00_004.jpg",
      "SortNo": "4",
      "BannerLinkUrl": "https://gms.gtmc.com.cn/GMSFile/BannerMediaImg/44A00/201905/44A00_004.jpg"
    },
    {
      "BannerImageUrl": "https://gms.gtmc.com.cn/GMSFile/BannerMediaImg/44A00/201905/44A00_005.jpg",
      "SortNo": "5",
      "BannerLinkUrl": "https://gms.gtmc.com.cn/GMSFile/BannerMediaImg/44A00/201905/44A00_005.jpg"
    },
    {
      "BannerImageUrl": "https://gms.gtmc.com.cn/GMSFile/BannerMediaImg/44A00/201905/44A00_006.jpg",
      "SortNo": "6",
      "BannerLinkUrl": "https://gms.gtmc.com.cn/GMSFile/BannerMediaImg/44A00/201905/44A00_006.jpg"
    },
    {
      "BannerImageUrl": "https://gms.gtmc.com.cn/GMSFile/BannerMediaImg/44A00/201905/44A00_007.jpg",
      "SortNo": "7",
      "BannerLinkUrl": "https://gms.gtmc.com.cn/GMSFile/BannerMediaImg/44A00/201905/44A00_007.jpg"
    },
    {
      "BannerImageUrl": "https://gms.gtmc.com.cn/GMSFile/BannerMediaImg/44A00/201905/44A00_008.jpg",
      "SortNo": "8",
      "BannerLinkUrl": "https://gms.gtmc.com.cn/GMSFile/BannerMediaImg/44A00/201905/44A00_008.jpg"
    },
    {
      "BannerImageUrl": "https://gms.gtmc.com.cn/GMSFile/BannerMediaImg/44A00/201905/44A00_009.jpg",
      "SortNo": "9",
      "BannerLinkUrl": "https://gms.gtmc.com.cn/GMSFile/BannerMediaImg/44A00/201905/44A00_009.jpg"
    },
    {
      "BannerImageUrl": "https://gms.gtmc.com.cn/GMSFile/BannerMediaImg/44A00/201905/44A00_010.jpg",
      "SortNo": "10",
      "BannerLinkUrl": "https://gms.gtmc.com.cn/GMSFile/BannerMediaImg/44A00/201905/44A00_010.jpg"
    }
  ]
};

loadADMsg(adData);


var carData = {
  "Status": 1,
  "Message": [
    {
      "ModelCd": "004013",
      "ModelName": "致炫",
      "SortNo": "1"
    },
    {
      "ModelCd": "004014",
      "ModelName": "雷凌",
      "SortNo": "2"
    },
    {
      "ModelCd": "004019",
      "ModelName": "雷凌 双擎",
      "SortNo": "3"
    },
    {
      "ModelCd": "004021",
      "ModelName": "致享",
      "SortNo": "4"
    },
    {
      "ModelCd": "004027",
      "ModelName": "C-HR",
      "SortNo": "5"
    },
    {
      "ModelCd": "004028",
      "ModelName": "2018款全新汉兰达",
      "SortNo": "6"
    },
    {
      "ModelCd": "004029",
      "ModelName": "广汽ix4",
      "SortNo": "7"
    },
    {
      "ModelCd": "004031",
      "ModelName": "雷凌双擎E+",
      "SortNo": "8"
    },
    {
      "ModelCd": "004033",
      "ModelName": "2019款凯美瑞",
      "SortNo": "9"
    },
    {
      "ModelCd": "004034",
      "ModelName": "2019款凯美瑞运动",
      "SortNo": "10"
    },
    {
      "ModelCd": "004035",
      "ModelName": "2019款凯美瑞双擎",
      "SortNo": "11"
    },
    {
      "ModelCd": "004036",
      "ModelName": "全新换代雷凌",
      "SortNo": "12"
    },
    {
      "ModelCd": "004037",
      "ModelName": "埃尔法双擎",
      "SortNo": "13"
    },
    {
      "ModelCd": "004038",
      "ModelName": "全新换代雷凌双擎",
      "SortNo": "14"
    }
  ]
};

loadCars(carData);


function loadADMsg(data) {
	var msg = data.Message;
	var status = data.Status;
	if(1 == status) {
		if(msg.length > 0){
			adMsg = msg;
			var templateSale = document.querySelector('#tmplateAD').innerHTML;
			var saleHtml = attachTemplateToData(templateSale, msg);
			$(".adWarper").html(saleHtml);
			swiper.init();
		}

	}
}


function loadCars(data){
	var msg = data.Message;
	console.log("msg=="+msg);
	var status = data.Status;
	if(1 == status) {
		var nameEl = document.getElementById("carDiv");
		var dataCar = [];
		for(var i = 0; i < msg.length;i++) {
			var carObj = msg[i];
			carObj.text = carObj.ModelName;
			dataCar.push(carObj);
		}
		var picker = new Picker({
			data: [dataCar],
			selectedIndex: [0],
			title: ''
		});
		picker.on('picker.select', function(selectedVal, selectedIndex) {
			$(".carLabel").val(dataCar[selectedIndex[0]].text);
			window.selectCarCd = dataCar[selectedIndex[0]].ModelCd;
			
		});
		nameEl.addEventListener('click', function() {
			picker.show();
		});
	}
}


// getCars();
// getADMsg();

//获取广告页
function getADMsg() {
	//网络请求
	$.ajax({
		url: adURL,
		async: true,
		type: 'POST',
		success: function(data, textStatus, jqXHR) {
			if(textStatus == "success") {
				loadADMsg(data);
			}
		}
	});
}

//获取车型
function getCars() {
	//网络请求
	$.ajax({
		url: carURL,
		async: true,
		type: 'POST',
		success: function(data, textStatus, jqXHR) {
			console.log(data);
			if(textStatus == "success") {
				loadCars(data);
			}
		}
	});
}

//提交请求
function submitReservation(param) {
	//网络请求
	$.ajax({
		url: submitURL,
		data:{
			data:JSON.stringify(param)
		},
		type: 'POST',
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		success: function(data, textStatus, jqXHR) {
			console.log(data);
			if(textStatus == "success") {
				var msg = data.Message;
				var status = data.Status;
				if(1 == status) {
					location.href = "reservationSuccess.html";
				} else {
					location.href = "reservationFailed.html";
				}
			}
		}
	});
}