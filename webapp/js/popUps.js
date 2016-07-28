;(function(_w){
	var _mask = $('.J-maskBg'),
		_pop = $('.J-pop');

	function popOpens(_id,_pageStatus){
		var _top = '',
			_left = '',
			_wH = _w.height(),
			_wW = _w.width(),
			_iH = _id.height(),
			_iW = _id.width();	
		if(_wH >= _iH){
			_top = (_wH - _iH)/2;
			_left = (_wW - _iW)/2;
		}else{
			_top = _w.scrollTop();
			_left = (_wW - _iW)/2;
			_id.css({
				'position' : 'absolute'
			});
		}
	};

	return {
		open : popOpens
	}
})($(window));