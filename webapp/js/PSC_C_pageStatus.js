var PSC_C_PageStatus = (function(w,d){
	var myModel;

	function init(){
    	myModel.pageStatus(obj);
	};

	myModel = {
		isPc:function(){
			var userAgentInfo = window.navigator.userAgent;
	        var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
	        var flag = true;
	        for (var v = 0; v < Agents.length; v++) {
	            if (userAgentInfo.indexOf(Agents[v]) > 0) {
	                flag = false;
	            }
	        };
	        return flag;
		},
		pageName:function(){
			var _location = window.location.href,
	            _url = _location.replace(/(.*\/)*([^.]+).*/ig, '$2');
	        return _url;
		},
		pageStatus:function(obj){
			var self = this,
	            _host = w.location.host,
	            _type = function() {
	                if (_host.match('qian') || _host.match('money')) { //有钱
	                    return {
	                        _product: 'money',
	                        _url: 'http://you.163.com/act/static/ax7IiQcwXQ.html'
	                    };
	                } else if (_host.match('you')) { //严选
	                    return {
	                        _product: 'yx',
	                        _url: 'http://you.yxp.163.com/act/pre/ax7IiQcwXQ.html'
	                    };
	                } else { //大师
	                    return {
	                        _product: 'master',
	                        _url: 'http://activity.mail.163.com/static/ax7IiQcwXQ.html'
	                    };
	                }
	            };
	        var _view = this.isPc() ? 'web' : 'wap';

	        $.ajax({
	            type: 'GET',
	            url: 'http://activity.mail.163.com/hdapi/commonapi/ajax/checkOnlineStatus.do',
	            dataType: 'jsonp',
	            data: {
	                activityAlias: obj.activityAlias
	            },
	            async: false,
	            cache: false,
	            success: function(_data) {
	                var _code = _data.code;
	                if (_code == 200) {
	                    var _offline = _data.content.online;
	                    if (_data.offline != 0) {
	                        var iframeDoc = '<iframe id="J-iframeTag" src="' + _type()._url + '?offline=' + _offline + '&view=' + _view + '&product=' + _type()._product + '" width="100%"  height="100%" scrolling="no" style="position:fixed;z-index:9999;left:0;top:0;" frameborder="0"></iframe>'
	                        $('body').append(iframeDoc);
	                    };
	                }
	            }
	        })
		}
	};

	return {
		init:init
	}
})(window,document);