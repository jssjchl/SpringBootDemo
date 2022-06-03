$(document).ready(function() {
	logoutComponent();
	logoutEvent();
});

function logoutComponent(){
	$("#logout").jqxButton({
		width: 80, height: 25
	});
}

function logoutEvent(){
	$("#logout").click(function() {
		location.href = "/logout/logout";
	});
}