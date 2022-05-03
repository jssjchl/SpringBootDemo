$(document).ready(function() {
	initComponent();
	initEvent();
});

// validate form.

function initEvent() {
	$("#loginButton").click(function() {
		$('#form').jqxValidator('validate');
	});
	
	$('#form').on('validationSuccess', function () {
		$('#form').submit();
	});
	$('#jqxValidator').on('validationError', function () {
		alert("올바르지 않은 작동입니다.");
	 }); 

	
	$("#signupButton").click(function() {
		location.href = "/signup";
	});
}

function initComponent() {
	$("#username, #password").jqxInput();
	$("#rememberme").jqxCheckBox({ width: 130 });
	$("#loginButton").jqxButton({
		width: 97, height: 40
	});
	$("#signupButton").jqxButton({
		width: 97, height: 40
	});

	// add validation rules.
	$('#form').jqxValidator({
		rules: [
			{ input: '#username', message: 'Username is required!', action: 'keyup, blur', rule: 'required' },
			{ input: '#username', message: 'Your username must start with a letter!', action: 'keyup, blur', rule: 'startWithLetter' },
			{ input: '#username', message: 'Your username must be between 3 and 12 characters!', action: 'keyup, blur', rule: 'length=3,12' },
			{ input: '#password', message: 'Password is required!', action: 'keyup, blur', rule: 'required' },
			{ input: '#password', message: 'Your password must be between 4 and 12 characters!', action: 'keyup, blur', rule: 'length=4,12' }
		]
	});
}
