$(function(){
	var myActModel = (function(w,d){
		var _myModel,
			_host = w.location.host,
			_baseUrl = (_host == "money.hztest.mail.163.com" || _host == 'localhost:3000') ? "http://dashix.hztest.mail.163.com/ticwatch/" : "http://mail.163.com/dashi/activity/act9/ticwatch/";
		function init(){
			_myModel.getActInfo();
		};

		function events(eles){
			var eles = eles || {};
	        $.each(eles,function(_k,_v){
	            var _event = _k.split(' ');
	            $(_event[1]).unbind().on(_event[0],function(){
	                _myModel[_v]();
	            })
	        });
		}

		_myModel = {
			getAjaxData:function(_url,_data,_callback){
				var self = this;

				$.ajax({
                    type:'GET',
                    url:_url, 
                    async:false,
                    cache:false,
                    dataType:'jsonp',
                    data:_data,
                    success:function(_res){
                        _callback(_res);
                    }
                })
			},
			getActInfo:function(){
				var self = this;

				self.getAjaxData(_baseUrl + 'ajax/getActInfo.do','',function(_res){
					self.uid = _res.content.uid;

					console.log(self.uid);
				});
			},
		};

		return {
			init : init
		}
	})(window,document);

	myActModel.init();
})