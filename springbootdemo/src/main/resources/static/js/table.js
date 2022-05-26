$(document).ready(function () {
    initComponent();
    initEvent();
});

function ajaxApi(typeVal, urlVal, dataVal, dataSource, sourceData){
	$.ajax({	
              type: typeVal
            , url: urlVal
            , data : dataVal
            , error: function () {
                alert('FAIL');
            }
            , success: function (response) {
				dataAdapter = new $.jqx.dataAdapter(sourceData);
       		 	$("#table").jqxDataTable(dataSource, dataAdapter);                        
       		 }
        });
}

function initComponent() {
	$('#add').jqxButton({ width: '100px' });

    var ordersSource =
    {
        dataFields: [
            { name: 'no', type: 'int' },
            { name: 'username', type: 'string' },
            { name: 'password', type: 'string' },
            { name: 'realname', type: 'string' },
            { name: 'email', type: 'string' },
            { name: 'phone', type: 'string' },
            { name: 'address', type: 'string' },
        ],
        dataType: "json",
        id: 'username',
        url: "/getAllUserList",
    };
    var dataAdapter = new $.jqx.dataAdapter(ordersSource, {
        loadComplete: function () {
        }
    });
	
    $("#table").jqxDataTable(
        {
            width: "100%",
            source: dataAdapter,
            pageable: true,
            sortable: true,
            altRows: true,
            ready: function () {
                $('#no').jqxInput({ disabled: true, width: 150, height: 25 });
                $('#username').jqxInput({ disabled: true, width: 150, height: 25 });
                $('#realname').jqxInput({ width: 150, height: 25 });
                $('#password').jqxPasswordInput({ width: 150, height: 25 });
                $('#email').jqxInput({ width: 150, height: 25 });
                $('#phone').jqxInput({ width: 150, height: 25 });
                $('#address').jqxInput({ width: 150, height: 25 });
                $('#save').jqxButton({ height: 30, width: 70 });
                $('#delete').jqxButton({ height: 30, width: 70 });
                $('#cancel').jqxButton({ height: 30, width: 70 });
                
                $("#cancel").mousedown(function () {
                    $("#dialog").jqxWindow('close');
                });
                
                $("#delete").mousedown(function(){
                    var rowData = {
                        username : $("#username").val()
                    }
                    ajaxApi("delete", "/deleteUser", rowData, 'source', ordersSource);
                    $("#dialog").jqxWindow('close');
                });

                $("#save").mousedown(function () {
					var mode = $('#mode').val();
					console.log(mode);
			        var url  = mode == 'ADD'? '/signupCheck' : '/updateUser';
                    var rowData = {
                        username: $('#username').val(),
                        realname: $('#realname').val(),
                        password: $('#password').val(),
                        email: 	  $('#email').val(),
                        phone: 	  $('#phone').val(),
                        address:  $('#address').val()
                    };
                    ajaxApi('POST', url, rowData, 'source', ordersSource);
                    $("#dialog").jqxWindow('close');
                });

                $("#dialog").on('close', function () {
                    $("#table").jqxDataTable({ disabled: false });
                });

                $("#dialog").jqxWindow({
                    resizable: false,
                    position: { left: $('#table').offset().left + 75, top: $("#table").offset().top + 35 },
                    width: 270,
                    height: 300,
                    autoOpen: false
                });
                $("#dialog").css('visibility', 'visible');
            },
            pagerButtonsCount: 8,
            columns: [
                { text: 'No', editable: false, dataField: 'no', width: 150 }
               ,{ text: 'Username', editable: false, dataField: 'username', width: 250 }
               ,{ text: 'Realname',dataField: 'realname', width: 250 }
               ,{ text: 'E-mail', dataField: 'email', width: 250 }
               ,{ text: 'Phone', dataField: 'phone', width: 250 }
               ,{ text: 'Address', dataField: 'address'}
               ,{ text: 'Password', dataField: 'password', hidden: true }
            	]
        });
        
}

function initEvent() {
    $('#add').click(addUser);
    $('#table').on('rowDoubleClick', function (event) {
		$('#mode').val('EDIT');
        var args = event.args;
        var index = args.index;
        var row = args.row;
        $('#dialog').jqxWindow('setTitle', "Edit Row: " + row.username);
        $('#dialog').jqxWindow('open');
        $('#dialog').attr('data-row', index);
        $('#table').jqxDataTable({ disabled: true });
  		$('#username').jqxInput({ disabled: true});
        $('#realname').val(row.realname);
        $('#password').val(row.password);
        $('#no').val(row.no);
        $('#username').val(row.username);
        $('#email').val(row.email);
        $('#phone').val(row.phone);
        $('#address').val(row.address);
		$('#delete').jqxButton({ disabled: false});
    });
}

function addUser(){
	$('#mode').val('ADD');

	$('#dialog').jqxWindow('setTitle', "Create New User");
    $('#dialog').jqxWindow('open');
    
    $('#no').val('');
    $('#username').val('');
    $('#realname').val('');
    $('#email').val('');
    $('#password').val('');
    $('#phone').val('');
    $('#address').val('');
    $('#table').jqxDataTable({ disabled: true });
    $('#username').jqxInput({ disabled: false});
	$('#delete').jqxButton({ disabled: true});
}