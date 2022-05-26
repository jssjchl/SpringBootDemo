$(document).ready(function () {
    initComponent();
});


function initComponent(type, text, duringDay) {
	var source =  setHistoryDataField(type, text, duringDay);

    $("#table").jqxDataTable(
        {
            width: '100%'
            , height: '100%'
            , showToolbar: true
            , source : source
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

                var checkBoxSource = ["ALL", "URL", "ID", "IP", "Param", "Result", "Reason"];
                $('#jqxDropDownList').jqxDropDownList({
                    dropDownVerticalAlignment: 'top'
                    , placeHolder: "Select Type"
                    , source: checkBoxSource
                    , dropDownHeight: 100
                    , width: '100px'
                    , height: '25px'
                });
	        inRendererEvent();
            }
            , pageSize: 20
            , pageable: true
            , sortable: true
            , altRows: true
            , columns: [
                { text: 'SEQ', editable: false, dataField: 'seq', width: '5%' }
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

function setHistoryDataField(coloumType, searchData, duringDay) {
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
}

function inRendererEvent(){
	var type = null;
	var duringDay = null;
	
    $('#dateInput').on('change', function (event) {
	console.log('dateInput event!!');
        var selection = $("#dateInput").jqxDateTimeInput('getRange');
        duringDay = getDateRangeData(selection.from.toLocaleDateString(), selection.to.toLocaleDateString());
   		console.log(duringDay);
   		console.log(duringDay[duringDay.length-1]);
    });
    
    $('#jqxDropDownList').on('select', function (event) {
        var args = event.args;
        if (args != undefined) {
            item = event.args.item;
            if (item != null) {
				type = item.value;
                console.log(item.value);
                switch(type){
					case 'ID':
						type = 'OPERATOR_ID';
						break;
					case 'IP':
						type = 'OPERATOR_IP';
						break;
					case 'ALL':
						type = null;
						break;
				}		
            }
        }
    });
    $("#searchButton").click(function () {
	    var text = $('#searchInput').val();
		var data = setHistoryDataField(type, text, duringDay);
		$("#table").jqxDataTable('source', data);
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

