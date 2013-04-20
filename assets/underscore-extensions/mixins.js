_.mixin({
	_noop : function(){ return true;},
	noop : function(){ return this._noop},
	/*converts object to array and copies it\'s properties in specified order*/
	args : function(object, order){
		var arr = [];
		_.each(order,function(name){
			if (_.isString(name))
				arr.push(object[name]); 
		})

		return arr;
	},
	/*align passed arrays to length of longest passed array*/
	align : function(){
		var arrays = _.toArray(arguments); 
		var lengths = _.map(arrays, function(arr){
			return arr.length;
		});
		var maxLength = _.max(lengths);
		var rests = _.map(lengths, function(length){
			return maxLength - length;
		});
		var t,arrToConcat;

		t = _.map(arrays, function(array, index){
			return { arr : array, rest : rests[index]};
		});

		_.each(t, function(value, key, list){
			arrToConcat = new Array(value.rest);
			value.arr = value.arr.concat(arrToConcat);
			value.rest = 0;
		});
		t = _.map(t, function(value, key, list){
			return value.arr;
		});

		return t;
	}
})