var $ = jQuery.noConflict();
(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define([ 'jquery' ], factory);
	} else if (typeof exports === 'object') {
		factory(require('jquery'));
	} else {
		factory(jQuery);
	}
}(function($) {
	var pluses = /\+/g;
	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}
	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}
	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}
	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}
		try {
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch (e) {
		}
	}
	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}
	var config = $.cookie = function(key, value, options) {
		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);
			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}
			return (document.cookie = [
					encode(key),
					'=',
					stringifyCookieValue(value),
					options.expires ? '; expires='
							+ options.expires.toUTCString() : '',
					options.path ? '; path=' + options.path : '',
					options.domain ? '; domain=' + options.domain : '',
					options.secure ? '; secure' : '' ].join(''));
		}
		var result = key ? undefined : {};
		var cookies = document.cookie ? document.cookie.split('; ') : [];
		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');
			if (key && key === name) {
				result = read(cookie, value);
				break;
			}
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}
		return result;
	};
	config.defaults = {};
	$.removeCookie = function(key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}
		$.cookie(key, '', $.extend({}, options, {
			expires : -1
		}));
		return !$.cookie(key);
	};
}));
$(document).ready(function() {
	var visitor_referrer = document.referrer;
	if ($.cookie('pc_r') == null) {
		$.cookie('pc_r', visitor_referrer, {
			expires : 360,
			path : '/'
		});
	}
	if ($.cookie('pc_sr') == null) {
		$.cookie('pc_sr', visitor_referrer, {
			path : '/'
		});
	}
	var landing = $(location).attr('href');
	if ($.cookie('pc_lp') == null) {
		$.cookie('pc_lp', landing, {
			expires : 360,
			path : '/'
		});
	}
	var url = window.location;
	url = url['href'];
	if (url.indexOf('?keyword=') > -1) {
		var keyword_url = url.split('?keyword=');
		if (keyword_url[1].indexOf('&gclid=') > -1) {
			var keyword = keyword_url[1].split('&gclid=');
			keyword = keyword[0];
			keyword = keyword.replace(/\+|%20/g, ' ');
		} else {
			var keyword = keyword_url[1];
			keyword = keyword.replace(/\+|%20/g, ' ');
		}
	}
	var kw = keyword;
	if ($.cookie('pc_keyword') == null) {
		$.cookie('pc_keyword', kw, {
			expires : 360,
			path : '/'
		});
	}
});
var _gaq = _gaq || [];
_gaq.push([ '_gat._forceSSL' ]);
$(window)
		.load(
				function() {
					var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl."
							: "http://www.");
					$.ajax({
						url : gaJsHost + 'google-analytics.com/ga.js',
						type : 'get',
						dataType : 'script',
						cache : true,
						success : function() {
							try {
								_gat._getTracker("_your_tracking_code_here_")
										._trackPageview();
							} catch (err) {
							}
						}
					});
				})