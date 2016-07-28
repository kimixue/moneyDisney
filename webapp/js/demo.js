var myActModel = (function(w,d){
	var _host = w.location.host,
		_baseUrl = (_host == "money.hztest.mail.163.com" || _host == 'localhost:3000') ? "http://dashix.hztest.mail.163.com/ticwatch/" : "http://mail.163.com/dashi/activity/act9/ticwatch/";

	function getInfo(){
		var _model = model();

		_model.getActInfo();
		_model.events({
			'click a' : 'getUid'
		});
	};

	/**
	 * [model 活动页面中所需要的处理方法]
	 * @return [object]
	 */
	function model(){
		return {
			/**
			 * [events 对于绑定事件的处理]
			 * @param  {[object]} eles [对于单一事件的处理]
			 * @return {[fn]}      [事件触发函数]
			 */
			events:function(eles){
				var self = this;
				var eles = eles || {};
		        $.each(eles,function(_k,_v){
		            var _event = _k.split(' ');
		            $(_event[1]).unbind().on(_event[0],function(){
		                self[_v]();
		            })
		        });
			},
			/**
			 * [getAjaxData 对服务器端数据请求的处理]
			 * @param  {[string]} _url      [请求的url]
			 * @param  {[object]} _data     [需要提交的数据 不需要提交传入'']
			 * @param  {[fn]} _callback [数据返回的处理函数]
			 * @return {[fn]}           [对数据进行渲染]
			 */
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

				console.log(self);
				self.getAjaxData(_baseUrl + 'ajax/getActInfo.do','',function(_res){
					self.uid = _res.content.uid;
				});
			},
			getUid:function(){
				 var self = this;

				console.log(self);
				console.log(self.uid);
			}
		}
	}

	return {
		init:getInfo
	};

})(window,document);


$(function(){
	myActModel.init();
})