$(document).ready(function () {
    initComponent();
    initEvent();
});

function ajaxApi(typeVal, urlVal, dataVal, dataSource, sourceData){
	 			$.ajax({	
                          type: typeVal
                        , url: urlVal
                        , data : dataVal
                        , dataType: "json"
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
    var ordersSource =
    {
        dataFields: [
            { name: 'no', type: 'int' },
            { name: 'username', type: 'string' },
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
                $("#no").jqxInput({ disabled: true, width: 150, height: 30 });
                $("#username").jqxInput({ disabled: true, width: 150, height: 30 });
                $("#email").jqxInput({ width: 150, height: 30 });
                $("#phone").jqxInput({ width: 150, height: 30 });
                $("#address").jqxInput({ width: 150, height: 30 });
                $("#save").jqxButton({ height: 30, width: 80 });
                $("#delete").jqxButton({ height: 30, width: 80 });
                $("#cancel").jqxButton({ height: 30, width: 80 });
                
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
                    var rowData = {
                        no: $("#no").val(),
                        username: $("#username").val(),
                        email: $("#email").val(),
                        phone: $("#phone").val(),
                        address: $("#address").val()
                    };
                    
                    ajaxApi("POST", "/updateUser", rowData, 'source', ordersSource);
                    $("#dialog").jqxWindow('close');
                });

                $("#dialog").on('close', function () {
                    $("#table").jqxDataTable({ disabled: false });
                });

                $("#dialog").jqxWindow({
                    resizable: false,
                    position: { left: $("#table").offset().left + 75, top: $("#table").offset().top + 35 },
                    width: 270,
                    height: 270,
                    autoOpen: false
                });
                $("#dialog").css('visibility', 'visible');
            },
            pagerButtonsCount: 8,
            columns: [
                {
                    text: 'No'
                    , editable: false
                    , dataField: 'no'
                    , width: 150
                }

                , {
                    text: 'Username'
                    , editable: false
                    , dataField: 'username'
                    , width: 250
                }

                , {
                    text: 'E-mail'
                    , dataField: 'email'
                    , width: 250
                }

                , {
                    text: 'Phone'
                    , dataField: 'phone'
                    , width: 250
                }

                , {
                    text: 'Address'
                    , dataField: 'address'
                }
            ]
        });

}

function initEvent() {
    $("#table").on('rowDoubleClick', function (event) {
        var args = event.args;
        var index = args.index;
        var row = args.row;
        $("#dialog").jqxWindow('setTitle', "Edit Row: " + row.username);
        $("#dialog").jqxWindow('open');
        $("#dialog").attr('data-row', index);
        $("#table").jqxDataTable({ disabled: true });
        $("#no").val(row.no);
        $("#username").val(row.username);
        $("#email").val(row.email);
        $("#phone").val(row.phone);
        $("#address").val(row.address);
    });
}