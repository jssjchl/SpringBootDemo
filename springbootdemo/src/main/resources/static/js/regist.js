$(document).ready(function () {
    initComponent();
    initEvent();
});

function initComponent() {

    $('#title, #register').jqxInput({
        width: "100%"
    });
    $('#editor').jqxEditor({
        height: "400px",
        width: "100%"
    });
    $('#save, #cancel').jqxButton({
        width: 91, height: 30
    });
    $('#attachedFile').jqxFileUpload({ width: "100%", uploadUrl: "/fileUpload", fileInputName: "file" });

    $('#valid').jqxValidator({
        rules: [
            { input: '#title', message: '제목을 입력해주세요.', action: 'keyup, blur', rule: 'required' },
            { input: '#register', message: '사용자명을 입력해주세요', action: 'keyup, blur', rule: 'required' },
            { input: '#editor', message: '내용을 입력하세요!', action: 'keyup, blur', rule: function (input, commit) {
                    if (input.val().trim().length > 12) {//<div></div>
                        return true;
                    }
                    return false;
                }
            }
        ]
    });
}

function initEvent() {
    var fileName = null;

    $('#attachedFile').on('select', function (event) {
        var args = event.args;
        fileName = args.file;
        var fileSize = args.size;
        console.log(fileName);
        console.log(fileSize);
    });

    $("#save").click(function () {
        $('#valid').jqxValidator('validate');
    });
    $('#valid').on('validationSuccess', function () {
        if (fileName != null) {
            $('#attachedFile').jqxFileUpload('uploadAll', 1);
        }
        else {
            sendData();
        }
    });

    $('#attachedFile').on('uploadEnd', function (event) {
        var args = event.args;
        var fileName = args.file;
        var serverResponce = args.response;
        sendData(serverResponce.replace(/(<([^>]+)>)/gi, ''));
    });

    $('#valid').on('validationError', function () {
        alert("올바르지 않은 작동입니다.");
    });

    $("#cancel").click(function () {
        location.href = "/boardTable";
    });
}

function sendData(response) {
    var data = {
        title: $('#title').val()
        , register: $('#register').val()
        , content: $('#editor').val()
        , fileId: null
    }
    if (response) {
        data['fileId'] = response;
    }

    $.ajax({
        url: "/registBoard"
        , type: "POST"
        , data: data
        , cache: false
        , success: function (response) {
			console.log("success");
            location.href = "/boardTable";
        }
    });
}