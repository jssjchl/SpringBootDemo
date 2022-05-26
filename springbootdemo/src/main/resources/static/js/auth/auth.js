$(document).ready(function () {
 	initComponent();
	initTableData(1);
	initEvent();
});

function initComponent() {
	$('#addButton').jqxButton({width: 80, height: 30});
	$('#removeButton').jqxButton({width: 80, height: 30});
	
	var templete ={
		height: '100%',
        width:  '37%',
        pageable: true,
        sortable: true,
        altRows: true,
        columns: 
        	[{ text: 'Username', editable: false, dataField: 'username', width: '50%'  }
           , { text: 'Realname', editable: false, dataField: 'realname', width: '50%' }]
    };
    $('#denyTable').jqxDataTable(templete);
    $('#authTable').jqxDataTable(templete);
    initTreeComponent();
}

function initTreeComponent() {
    var source = {
          datatype: 'json'
        , datafields: [
            { name: 'group_Id' }
           ,{ name: 'group_Name' }
           ,{ name: 'parent_Group_Id' }
        ]
        , id: 'group_Id'
        , url: '/groupData'
    };
    var dataAdapter = new $.jqx.dataAdapter(source, {
        loadComplete: function (response) {
			var items = [];
			items.push({ name: 'group_Name', map: 'label'});
			items.push({ name: 'parent_Group_Id', map: 'parentId'});
			items.push({ name: 'group_Id', map: 'id'});
            var records = dataAdapter.getRecordsHierarchy('group_Id', 'parent_Group_Id', 'items', items);
            initTreeData(records)
        }
    });
    dataAdapter.dataBind();
}
function initTreeData(records) {
	$('#jqxGroupTree').jqxTree({ source: records, allowDrop: false, allowDrag: false });
    $('#jqxGroupTree').jqxTree('selectItem', $("#jqxGroupTree").find('li:first')[0]);
    $('#jqxGroupTree').jqxTree('expandItem', $('#jqxGroupTree').jqxTree('selectedItem'));
}

function initTableData(groupId) {
	var source =
	    	{
	        dataFields: [
	            { name: 'username', type: 'string' }
	           ,{ name: 'realname', type: 'string' }
	        ],
	        dataType: "json",
	        id		: 'username',
	        url		: '/getDenyUser/'+groupId,
	};			
	if(groupId ==1){
		source.dataType = []; //빈 array
	}
    var denyAdapter = new $.jqx.dataAdapter(source);
 	$('#denyTable').jqxDataTable({source: denyAdapter});
 	  
	source.url = '/getAuthUser/'+ groupId;
    var authAdapter= new $.jqx.dataAdapter(source);
	$('#authTable').jqxDataTable({source: authAdapter});
}

function initEvent() {
	$("#addButton").click(function(){
		setAuth('denyTable');
	});
	$("#removeButton").click(function(){
		setAuth('authTable');
	});
	$('#jqxGroupTree').on('itemClick', selectedTree);
}
	
function selectedTree() {
	var item 	= $('#jqxGroupTree').jqxTree('getSelectedItem');
	var groupId = item.id;
	initTableData(groupId);
	return groupId;
}

function selectRow(selector){
	var selection = $('#' + selector).jqxDataTable('getSelection');
	var requestType  = null;
	if(selector == 'authTable'){
		requestType = 'D';
	}
	else{
		requestType = 'I';		
	}
    var data = {
		  userName: selection[0].username
		, requestType: requestType
    }
	return data;
}

function setAuth(selector){
	var rowData = selectRow(selector);
    var data 	= {
		  userName: rowData.userName
		, groupId: selectedTree()
		, requestType: rowData.requestType
    }
	$.ajax({
        url: '/setAuth'
        , type: "POST"
        , data: data
        , cache: false
        , success: function (response) {
			console.log(response);
			initTableData(data.groupId);
        }
    });	    
}
