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
  "Status": 1,
  "Message": [
    {
      "StfCd": "101813@44A00",
      "StfName": "林俊升",
      "Gender": "男",
      "Age": "25",
      "WorkingExperience": "3",
      "Speciality": "电子竞技 乒乓球",
      "PersonalProfile": "人之初，性本善。有一种美丽叫信任，它美丽着人们的心灵，美丽着我们直营店。",
      "Hometown": "汕头",
      "LabelJson": [
        {
          "LabelContent": "汕头boy"
        },
        {
          "LabelContent": "农药王者"
        },
        {
          "LabelContent": "国球健将"
        },
        {
          "LabelContent": "爱狗人士"
        },
        {
          "LabelContent": "腼腆细心男"
        },
        {
          "LabelContent": "诚实可靠"
        }
      ],
      "MediaJson": [
        {
          "MediaType": "1",
          "ImageUrl": "https://gms.gtmc.com.cn/GMSFile/StaffImgUploadImg/44A00/201904/44A00_001808_201904112302312741437.jpg",
          "SortNo": "1",
          "VedioUrl": ""
        }
      ],
      "ScheduleStatus": "01",
      "WorkStatus": "0"
    },
    {
      "StfCd": "101823@44A00",
      "StfName": "赵俊",
      "Gender": "男",
      "Age": "26",
      "WorkingExperience": "3",
      "Speciality": "运动",
      "PersonalProfile": "我一直认为用心、踏实是做好每一件是的基础，是取得成功必不可少的条件，而热情、真诚是待人必不可少的条件，期待与你相遇。",
      "Hometown": "江西",
      "LabelJson": [
        {
          "LabelContent": "江西小哥"
        },
        {
          "LabelContent": "篮球"
        },
        {
          "LabelContent": "爱阅读"
        },
        {
          "LabelContent": "自律整洁"
        },
        {
          "LabelContent": "乐观大方"
        },
        {
          "LabelContent": "跑步"
        }
      ],
      "MediaJson": [
        {
          "MediaType": "1",
          "ImageUrl": "https://gms.gtmc.com.cn/GMSFile/StaffImgUploadImg/44A00/201904/44A00_001808_201904112301299145983.jpg",
          "SortNo": "1",
          "VedioUrl": ""
        }
      ],
      "ScheduleStatus": "01",
      "WorkStatus": "0"
    },
    {
      "StfCd": "101826@44A00",
      "StfName": "黄境泰",
      "Gender": "男",
      "Age": "26",
      "WorkingExperience": "4",
      "Speciality": "游泳 羽毛球",
      "PersonalProfile": "您好，我叫黄境泰，阳光乐观是我对自己的评价，专业认真是客户对我的认可，从业工作三年一直在汽车行业发展，很高兴认识您并为您提供优质的服务。",
      "Hometown": "湛江",
      "LabelJson": [
        {
          "LabelContent": "湛江老乡"
        },
        {
          "LabelContent": "广东青年代表"
        },
        {
          "LabelContent": "王者农药迷"
        },
        {
          "LabelContent": "旅行爱好者"
        },
        {
          "LabelContent": "心思缜密"
        },
        {
          "LabelContent": "专业认真"
        }
      ],
      "MediaJson": [
        {
          "MediaType": "1",
          "ImageUrl": "https://gms.gtmc.com.cn/GMSFile/StaffImgUploadImg/44A00/201904/44A00_001808_201904120113304693293.jpg",
          "SortNo": "1",
          "VedioUrl": ""
        }
      ],
      "ScheduleStatus": "01",
      "WorkStatus": "0"
    },
    {
      "StfCd": "101829@44A00",
      "StfName": "蓝泽能",
      "Gender": "男",
      "Age": "27",
      "WorkingExperience": "3",
      "Speciality": "旅游、弹吉他",
      "PersonalProfile": "当您的目光聚集于此，我们的故事已经开始，希望能尽我所能为您服务，与您相伴在未来的诗和远方。",
      "Hometown": "潮汕",
      "LabelJson": [
        {
          "LabelContent": "潮汕小伙"
        },
        {
          "LabelContent": "旅游达人"
        },
        {
          "LabelContent": "爱好吉他"
        },
        {
          "LabelContent": "天枰座"
        },
        {
          "LabelContent": "LOL"
        },
        {
          "LabelContent": "吃货"
        }
      ],
      "MediaJson": [
        {
          "MediaType": "1",
          "ImageUrl": "https://gms.gtmc.com.cn/GMSFile/StaffImgUploadImg/44A00/201904/44A00_001808_201904112300210232362.jpg",
          "SortNo": "1",
          "VedioUrl": ""
        }
      ],
      "ScheduleStatus": "01",
      "WorkStatus": "0"
    },
    {
      "StfCd": "101830@44A00",
      "StfName": "王凯伦",
      "Gender": "男",
      "Age": "25",
      "WorkingExperience": "3",
      "Speciality": "唱歌 游泳",
      "PersonalProfile": "王凯伦，英文名：Kelen。当代大学生，充满着热情洋溢的心和激情四射的活力。以最真诚的态度为您服务，就为带给您最满意最贴心的拥车体验。相信今世的一次相遇，都是上世的百次回眸。",
      "Hometown": "汕尾",
      "LabelJson": [
        {
          "LabelContent": "汕尾陆河"
        },
        {
          "LabelContent": "陈奕迅fans"
        },
        {
          "LabelContent": "麦霸"
        },
        {
          "LabelContent": "爱狗人士"
        },
        {
          "LabelContent": "游戏高手"
        },
        {
          "LabelContent": "天枰男"
        }
      ],
      "MediaJson": [
        {
          "MediaType": "1",
          "ImageUrl": "https://gms.gtmc.com.cn/GMSFile/StaffImgUploadImg/44A00/201904/44A00_001808_201904112255353954789.jpg",
          "SortNo": "1",
          "VedioUrl": ""
        }
      ],
      "ScheduleStatus": "01",
      "WorkStatus": "0"
    },
    {
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
    },
    {
      "StfCd": "101849@44A00",
      "StfName": "方琴妹",
      "Gender": "女",
      "Age": "28",
      "WorkingExperience": "5",
      "Speciality": "阅读、跑步、旅游",
      "PersonalProfile": "专业是我的本职，极致的服务是我追求。对于每一位来店的客户，我们都怀有一颗 努力＂拥抱＂的心，希望通过提供优质的服务，想您之所想，想您所未想，让您有一种宾至如归的用车体验。如果您有任何购车，用车以及出行等方面问题，请联系我，让我和您一起想想办法吧。谢谢！",
      "Hometown": "广东揭阳",
      "LabelJson": [
        {
          "LabelContent": "潮汕girl"
        },
        {
          "LabelContent": "跑步"
        },
        {
          "LabelContent": "旅游"
        },
        {
          "LabelContent": "吃货"
        },
        {
          "LabelContent": "呆萌女孩"
        },
        {
          "LabelContent": "不做第一，做唯一爱"
        }
      ],
      "MediaJson": [
        {
          "MediaType": "1",
          "ImageUrl": "https://gms.gtmc.com.cn/GMSFile/StaffImgUploadImg/44A00/201904/44A00_001808_201904112303292757451.jpg",
          "SortNo": "1",
          "VedioUrl": ""
        }
      ],
      "ScheduleStatus": "01",
      "WorkStatus": "0"
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