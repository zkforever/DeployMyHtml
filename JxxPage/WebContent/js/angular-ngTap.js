"use strict";
angular.module("ngTap", []).directive("ngTap", function() {
	return {
		controller: ["$scope", "$element", function(a, b) {
			function d(a) {
				b.bind("touchmove", e), b.bind("touchend", f)
			}

			function e(a) {
				c = !0
			}

			function f(d) {
				if(b.unbind("touchmove", e), b.unbind("touchend", f), !c) {
					var g = b.attr("ng-tap");
					a.$apply(g)
				}
			}
			var c = !1;
			b.bind("touchstart", d)
		}]
	}
});