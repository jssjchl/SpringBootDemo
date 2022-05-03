$(document).ready(function() {
	initComponent();
	initEvent();
});


function initComponent() {
	var template = [
		{
			bind: 'username',
			type: 'text',
			label: 'Username',
			required: true,
			labelWidth: '80px',
			width: '250px',
		},
		{
			bind: 'password',
			type: 'password',
			label: 'Password',
			required: true,
			labelWidth: '80px',
			width: '250px'
		},
		{
			bind: 'codfirm',
			type: 'text',
			label: 'Confirm',
			required: true,
			labelWidth: '80px',
			width: '250px'
		},
		{
			bind: 'email',
			type: 'text',
			label: 'E-mail',
			required: false,
			labelWidth: '80px',
			width: '250px'
		},
		{
			bind: 'phone',
			type: 'text',
			label: 'Phone',
			required: false,
			labelWidth: '80px',
			width: '250px'
		},
		{
			columns: [
				{
					bind: 'signup',
					type: 'button',
					text: 'Sign up',
					width: '90px',
					height: '30px',
					rowHeight: '40px',
					columnWidth: '50%',
					align: 'right'
				},
				{
					bind: 'cancel',
					type: 'button',
					text: 'Cancel',
					width: '90px',
					height: '30px',
					rowHeight: '40px',
					columnWidth: '50%'
				}
			]
		}
	];
	$('#sampleForm').jqxForm({
		template: template,
		padding: { left: 10, top: 10, right: 10, bottom: 10 }
	});
	cancelButton = $('#sampleForm').jqxForm('getComponentByName', 'cancel');
}

function initEvent() {
	$("#signupButton").click(function() {
		$('form').submit
	});
	$("#cancelButton").click(function() {
		location.href = "index"
	});
}
