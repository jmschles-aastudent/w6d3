$(function() {
	console.log("in jquery");
	var $cont = $('#container');
	_(200).times(function (i) {
		var $div = $("<div></div>");
		$div.attr('id', i);
		$cont.append($div);
	});
});