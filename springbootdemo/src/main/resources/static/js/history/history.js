$(document).ready(function () {
    initComponent();
    initData();
});


function initComponent() {
    $("#table").jqxDataTable(
        {
            width: '100%'
            , height: '100%'
            , showToolbar: true
            , renderToolbar: function (toolbar) {
				if( $('#datatable-toolbar').length  > 0){
					return;
				}
                var container = $("<div id='datatable-toolbar' style='margin: 5px;'></div>");
                var span = $("<span style='float: left; margin-top: 5px; margin-right: 4px;'>Search:</span>");
                var dateInput = $("<div id='dateInput' style='height: 20px; margin-right: 4px; float: left;' />");
                var input = $("<input id='searchInput' style='height: 20px; margin-right: 4px; float: left;' />");
                var dropdownInput = $("<div id='jqxDropDownList' style=' margin-right: 4px; float: left;' />");
                var button = $("<input id='searchButton' type='button' value ='Search' style=' float: left;'/>");
                toolbar.append(container);
                container.append(span);
                container.append(dateInput);
                container.append(dropdownInput);
                container.append(input);
                container.append(button);
                $('#searchButton').jqxButton({ width: '100px', height: '25px' });
                $('#searchInput').jqxInput({ width: '200px', height: '25px' });
                $('#dateInput').jqxDateTimeInput({ width: '200px', height: '25px', selectionMode: 'range' });

                var today = new Date();
                var yesterday = new Date(today.setDate(today.getDate() - 1));
                today = new Date();
                $('#dateInput').jqxDateTimeInput('setRange', today, yesterday);

                var typeSource = ["URL", "ID", "IP", "Param", "Result", "Reason"];
                $('#jqxDropDownList').jqxDropDownList({

                    dropDownVerticalAlignment: 'top'
                    , placeHolder: "Select Type"
                    , source: typeSource
                    , dropDownHeight: 100
                    , width: '100px'
                    , height: '25px'
                });
	        	inRendererEvent();
            }
            , pageSize: 20
            , serverProcessing: true
            , pageable: true
            , sortable: true
            , altRows: true
            , columns: [
                { text: 'NO', editable: false, dataField: 'rn', width: '5%' }
                , { text: 'Event Time', dataField: 'eventTime', cellsformat: 'dd-MMMM-yyyy', width: '20%' }
                , { text: 'URL', editable: false, dataField: 'url', width: '10%' }
                , { text: 'ID', dataField: 'operatorId', editable: false, width: '10%' }
                , { text: 'IP', dataField: 'operatorIp', editable: false, width: '10%' }
                , { text: 'Param', dataField: 'param', editable: false }
                , { text: 'Result', dataField: 'result', editable: false, width: '5%' }
                , { text: 'Reason', dataField: 'reason', editable: false, width: '5%' }
            ]
        });
}

function initData(coloumType, searchData){
	var date =  $("#dateInput").jqxDateTimeInput('getRange');
	var source =
	    {
	        dataFields: [
	            { name: 'rn', type: 'int' }
	            , { name: 'url', type: 'String' }
	            , { name: 'eventTime', type: 'String' }
	            , { name: 'operatorId', type: 'String' }
	            , { name: 'operatorIp', type: 'String' }
	            , { name: 'param', type: 'String' }
	            , { name: 'result', type: 'String' }
	            , { name: 'reason', type: 'String' }
	        ]
	        , dataType: 'json'
	        , id: 'seq'
	        , url: '/getHistoryList'
    	};
    	
        dataAdapter = new $.jqx.dataAdapter(source,
        	{ downloadComplete: function (data) {
                source.totalrecords = data.totalCount;
        	}
        	, formatData: function(data) {

				data['coloumType'] = coloumType;
				data['searchData'] = searchData;
				data['startDate'] = date.from;
				data['endDate'] = date.to;
				data['offset'] = data.pagenum * data.pagesize;
				console.log(data);
                return data;
            }
        });
	 	$("#table").jqxDataTable('goToPage', 0);
	 	$("#table").jqxDataTable('source', dataAdapter);
}

function inRendererEvent(){
    $("#searchButton").click(function () {
	    var searchData = $('#searchInput').val();
		var coloumType = $("#jqxDropDownList").jqxDropDownList('getSelectedItem');
		if(coloumType != null){
			type = coloumType.label;
		}
		else{
			type =null;
		}
		initData(type, searchData);
	 });
}
























function goAjax(coloumType, searchData, duringDay){
		if(duringDay != null && duringDay[0] != duringDay[duringDay.length]){
				var startDate = duringDay[0];
				var endDate = duringDay[duringDay.length-1];
			}
		var url = searchData != null && coloumType != null ? '/searchHistory/' : '/getHistory';
		
		var data ={
              coloumType : coloumType
            , searchData : searchData
            , startDate : startDate
            , endDate : endDate
        }
		$.ajax({	
              type: 'GET'
            , url: url
            , data : data
            , error: function () {
                alert('FAIL');
            }
            , success: function (response) {
				console.log(response);
				gettableData(response);
       		 }
        });	
}


function getDateRangeData(param1, param2) {
    var duringDay = [];
    var startDay = new Date(param1);
    var endDay = new Date(param2);
    while (startDay.getTime() <= endDay.getTime()) {
        console.log(startDay.getMonth());
        var month = (startDay.getMonth() + 1);
        month = month < 10 ? '0' + month : month;
        var day = startDay.getDate();
        day = day < 10 ? '0' + day : day;
        duringDay.push(startDay.getFullYear() + '-' + month + '-' + day);
        startDay.setDate(startDay.getDate() + 1);
    }
    return duringDay;
}




/*function setHistoryDataField(coloumType, searchData, duringDay) {
	if(duringDay != null && duringDay[0] != duringDay[duringDay.length]){
		var startDate = duringDay[0];
		var endDate = duringDay[duringDay.length-1];
	}
	var url = searchData != null && coloumType != null ? '/searchHistory/' + coloumType + '/' + searchData + '/' + startDate + '/' + endDate 
	: '/getHistory';
    var source =
    {
        dataFields: [
            { name: 'seq', type: 'int' }
            , { name: 'url', type: 'String' }
            , { name: 'eventTime', type: 'String' }
            , { name: 'operatorId', type: 'String' }
            , { name: 'operatorIp', type: 'String' }
            , { name: 'param', type: 'String' }
            , { name: 'result', type: 'String' }
            , { name: 'reason', type: 'String' }
        ]
        , dataType: 'json'
        , id: 'seq'
        , url: url
    };
     var dataAdapter = new $.jqx.dataAdapter(source, {
        loadComplete: function () {
        }
    });
    return dataAdapter;
}*/