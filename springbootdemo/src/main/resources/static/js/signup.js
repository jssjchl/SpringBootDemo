$(document).ready(function() {
	initComponent();
	initEvent();
});

function initComponent() {
	var template = [
		{
			bind: 'username'
			, name: 'username'
			, type: 'text'
			, label: 'Username'
			, required: true
			, labelWidth: '80px'
			, width: '250px'
			, options: { id: 'test' }
		},
		{
			bind: 'password'
			, name: 'password'
			, type: 'password'
			, label: 'Password'
			, required: true
			, labelWidth: '80px'
			, width: '250px'
		},
		{
			bind: 'confirm'
			, name: 'confirm'
			, type: 'password'
			, label: 'Confirm'
			, required: true
			, labelWidth: '80px'
			, width: '250px'
		},
		{
			bind: 'email'
			, name: 'email'
			, type: 'text'
			, label: 'E-mail'
			, required: false
			, labelWidth: '80px'
			, width: '250px'
		},
		{
			bind: 'phone'
			, name: 'phone'
			, type: 'text'
			, label: 'Phone'
			, required: false
			, labelWidth: '80px'
			, width: '250px'
		},
		{
			columns: [
				{
					bind: 'signup'
					, type: 'button'
					, text: 'Sign up'
					, width: '120px'
					, height: '30px'
					, rowHeight: '40px'
					, columnWidth: '50%'
					, align: 'right'
				},
				{
					bind: 'cancel'
					, type: 'button'
					, text: 'Cancel'
					, width: '120px'
					, height: '30px'
					, rowHeight: '40px'
					, columnWidth: '50%'
				}
			]
		}
	];
	$('#sampleForm').jqxForm({
		template: template
		, padding: { left: 10, top: 10, right: 10, bottom: 10 }
	});

	var username = $('#sampleForm').jqxForm('getComponentByName', 'username');
	var password = $('#sampleForm').jqxForm('getComponentByName', 'password');
	var confirm = $('#sampleForm').jqxForm('getComponentByName', 'confirm');
	var phone = $('#sampleForm').jqxForm('getComponentByName', 'phone');
	var email = $('#sampleForm').jqxForm('getComponentByName', 'email');

	$('#sampleForm').jqxValidator({
		rules: [
			{ input: username, message: 'Username is required!', action: 'keyup, blur', rule: 'required' },
			{ input: username, message: 'Your username must start with a letter!', action: 'keyup, blur', rule: 'startWithLetter' },
			{ input: username, message: 'Username is 4~10 word!', action: 'keyup, blur', rule: 'length=4,10' },
			{ input: password, message: 'password is 4~10 word!', action: 'keyup, blur', rule: 'length=4,10' },
			{ input: password, message: 'password is required!', action: 'keyup, blur', rule: 'required' },
			{ input: confirm, message: 'confirm is required!', action: 'keyup, blur', rule: 'required' },
			{
				input: confirm, message: 'confirm is not correct!', action: 'keyup, blur', rule: function() {
					if (!(password.val() === confirm.val())) {
						return false;
					}
				}
			},
			{ input: email, message: 'email required!', action: 'keyup, blur', rule: 'required' },
			{ input: email, message: 'keep format email', action: 'keyup, blur', rule: 'email' },
			{ input: phone, message: 'phone is required!', action: 'keyup, blur', rule: 'required' },
			{
				input: phone, message: 'keep format phone!', action: 'keyup, blur', rule: function() {
					var regExp = /^\d{3}-\d{3,4}-\d{4}$/;
					if (regExp.test(phone.val()) === false) {
						return false;
					}
				}
			}
		]
	});
}

function initEvent() {
	$('#sampleForm').on('buttonClick', function(event) {
		var args = event.args;
		var text = args.text // clicked button's text.;
		if (text == 'Cancel') {
			location.href = "/login"
		}
		else {
			//$('#sampleForm').jqxValidator('validate');
			$('#sampleForm').jqxForm('submit', "/signupCheck", null, 'POST');
		}
	});


	$('#sampleForm').on('validationSuccess', function() {
		$('#sampleForm').jqxForm('submit', "/signupCheck", null, 'POST');
	});

	$('#sampleForm').on('validationError', function() {
		alert("올바르지 않은 작동입니다.");
	});

}