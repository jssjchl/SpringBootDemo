$(function() {
	$('#title, #register').jqxInput({
		theme: theme
		, width: '100%'
		, height: '30px'
		, disabled: true
	});

	$('#content').jqxTextArea({
		theme: theme
		, source: $('#content').text()
		, disabled: true
	});
	
	$("#edit, #delete, #cancel").jqxButton({
		theme: theme,
		height : 30,
		width : 80
	});

	$('#cancel').click(function() {
		location.href = "/board/list";
	});
});