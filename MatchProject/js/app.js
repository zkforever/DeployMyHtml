//The following is customizable, and consistent to the templates used
function loaded() {
	window.location = "#page1";
}

var page1 = {};
page1.partial = "page1.html";
page1.init = function() {
	miniSPA.render('page1');
	var mySwiper = new Swiper('.swiper-container', {
		pagination: '.pagination',
		paginationClickable: true,
		slidesPerView: 3,
		loop: true
	});
	$(".isOffline").click(function(e) {
		window.location = "#page2";
	});
}

var page2 = {};
page2.partial = "page2.html";
page2.init = function() {
	miniSPA.render('page2'); //render related partial page
	//选择区域
	$("#chooseArea").click(function() {
		picker.show();
	});
	//选择学校
	$("#chooseSchool").click(function() {
		//todo 塞学校
		var school = [{
				"text": "广外1",
				"value": "1"
			},
			{
				"text": "广工1",
				"value": "2"
			},
			{
				"text": "华工1",
				"value": "3"
			}
		];
		pickerSchool = new Picker({
			data: [school]
		});

		pickerSchool.on('picker.select', function(selectedVal, selectedIndex) {
			$("#chooseSchool").html(school[selectedIndex[0]].text);
		});

		pickerSchool.on('picker.change', function(index, selectedIndex) {
			console.log(index);
		});

		pickerSchool.on('picker.valuechange', function(selectedVal, selectedIndex) {
			console.log(selectedVal);
		});

		pickerSchool.show();
	});

	//获取验证码
	$(".get-code").click(function() {
		checkPhone(); //验证手机号码
		if(isPhone) {
			//todo 获取验证码
			resetCode(); //倒计时
		} else {
			$('#tel').focus();
		}
	});

	//提交
	$(".submitBtn").click(function() {
		//todo 提交按钮
		window.location = "#page4";
	});

}

page2.submit = function() {
	miniSPA.render('page2');
}

var page4 = {};
page4.partial = "page4.html"
page4.init = function() {
	miniSPA.render('page4');
}

miniSPA.changeUrl(); //initialize

/*获取验证码*/
var isPhone = 1;
//验证手机号码
function checkPhone() {
	var phone = $('#tel').val();
	var pattern = /^1[0-9]{10}$/;
	isPhone = 1;
	if(phone == '') {
		alert('请输入手机号码');
		isPhone = 0;
		return;
	}
	if(!pattern.test(phone)) {
		alert('请输入正确的手机号码');
		isPhone = 0;
		return;
	}
}
//倒计时
function resetCode() {
	$('#J_getCode').hide();
	$('#J_second').html('5');
	$('#J_resetCode').show();
	var second = 5;
	var timer = null;
	timer = setInterval(function() {
		second -= 1;
		if(second > 0) {
			$('#J_second').html(second);
		} else {
			clearInterval(timer);
			$('#J_getCode').show();
			$('#J_resetCode').hide();
		}
	}, 1000);
}