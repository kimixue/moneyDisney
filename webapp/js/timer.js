var PSC_C_Timer = (function(){

	function getInfo(){
		console.log(new Date(getCurrentTime('10:00:00')).getTime());
	};

	function getCurrentTime(_time){
		var _date = new Date(),
			_year = _date.getFullYear(),
			_month = _date.getMonth(),
			_day = _date.getDate(),
			_hour = _date.getHours(),
			_minute = _date.getMinutes(),
			_second = _date.getSeconds();
		_year = _year <= 9 ? '0'+_year : _year;
		_month = _month <= 9 ? '0'+_month : _month;
		_day = _day <= 9 ? '0'+_day : _day;
		return _year+'/'+_month+'/'+_day +' '+ _time;
	};

	//暴露接口
	return {
		init:getInfo
	}
})();


$(function(){
	PSC_C_Timer.init();
})                                                                                                                                                                                                                                                                                                                                         