$('#is_admin').click(function(){
	if($(this).is(':checked')) {
		$('#hidden_is_admin').val(true);
	} else {
		$('#hidden_is_admin').val(false);
	}

	console.log($('#hidden_is_admin'));
});