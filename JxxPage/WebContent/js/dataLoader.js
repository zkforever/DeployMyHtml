var mainURL = "/ZYD";
var consultantsURL = mainURL + "/GetConsultants";
var consultantURL = mainURL + "/GetConsultantDetail";
var adURL = mainURL + "/GetAdImages";
var carURL = mainURL + "/GetCars";
var submitURL = mainURL + "/SubmitReservation";
attachTemplateToData = function(template, data) {
	var i = 0,
		len = data.length,
		fragment = '';
	// 遍历数据集合里的每一个项，做相应的替换
	function replace(obj) {
		var t, key, reg;
		//遍历该数据项下所有的属性，将该属性作为key值来查找标签，然后替换
		for(key in obj) {
			reg = new RegExp('{{' + key + '}}', 'ig');
			t = (t || template).replace(reg, obj[key]);
		}
		return t;
	}

	for(; i < len; i++) {
		fragment += replace(data[i]);
	}

	return fragment;
};

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}