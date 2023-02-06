

function toggleExcel(element) {
    let other = "upload_excel"
    if (element === "upload_excel"){
        other = "template_excel"
    }
    if($("#" + element).css("display") === "none"){
        $("#" + element).css("display", "block");
    } else {
        $("#" + element).css("display", "none");
        $("#" + other).css("display", "block");
    }
}

function togglePdf(element) {
    let other = "upload_excel_pdf"
    if (element === "upload_excel_pdf"){
        other = "template_pdf"
    }
    $("#label-no-content").css("display", "none");
    $("#label-upload").css("display", "block");
    if($("#" + element).css("display") === "none"){
        $("#" + element).css("display", "block");
    } else {
        $("#" + element).css("display", "none");
        $("#" + other).css("display", "block");
    }
}

function toggleModal(cardNumber) {
    $('#card-popup-pdf' + cardNumber).modal('hide');
}

function toggleTooltip() {
    $('.tooltip_example').hide();
}

function showTooltipMb(origin, content) {
    $('#tooltip-content').html(content);
    if(origin == 'wp') {
        $('#tooltip_example').css('top', 50);
    } else if(origin == 'pdf') {
        $('#tooltip_example').css('top', 115);
    } else {
        $('#tooltip_example').css('top', 180);
    }
    $('#tooltip_example').show();
    return false;
}

function buttonHover(id) {
    console.log(id);
}

function showTooltip(origin, content, id) {
    if($('#tooltip_example_' + id).is(':hidden')) {
        $('#tooltip-content-' + id).html(content);
        if(origin == 'wp') {
            $('#tooltip_example_' + id).css('top', 50);
        } else if(origin == 'pdf') {
            $('#tooltip_example_' + id).css('top', 115);
        } else {
            $('#tooltip_example_' + id).css('top', 180);
        }
        $('#tooltip_example_' + id).show();
    } else {
        $('#tooltip-content-' + id).html('');
        $('#tooltip_example_' + id).hide();
    }
    return false;
}

function showCustomLogo(id, origin){
    if($('#custom-logo-file-div-' + origin + '-' + id).is(':hidden')) {
        $('#custom-logo-file-div-' + origin + '-' + id).show();
    } else {
        $("#custom-logo-file-div-" + origin + '-' + id).hide();
        $("#custom_logo_file_" + origin + '_' + id).val("");
    }
}

function showTemplatesDiv(id, origin) {
    if($('#templates-div-' + origin + '-' + id).is(':hidden')) {
        $('#templates-div-' + origin + '-' + id).show();
    } else {
        $("#templates-div-" + origin + '-' + id).hide();
        $("#custom_logo_file_" + origin + '_' + id).val("");
        $('#div_plant_sel').css('display', 'none');
        $('#span_plant_sel').html('');
        $('#templateSelected').val('default');
    }
}

function showCC(id, origin){
    if($('#cc-field-div-' + origin + '-' + id).is(':hidden')) {
        $('#cc-field-div-' + origin + '-' + id).show();
    } else {
        $("#cc-field-div-" + origin + '-' + id).hide();
        $("#cc-mail" + '-' + id).val('');
    }
}

function showCustomSend(id, origin){
    if($('#customSend-wp-div-' + id).is(':hidden')) {
        $('#customSend-wp-div-' + id).show();
    } else {
        $('#customSend-wp-div-' + id).hide();
        $('#customSend-wp-' + id).val("");
        $('input[name="delivery_date_wp"]').flatpickr(
            {
                altInput     : true,
                altFormat    : "F j, Y - H:i",
                enableTime   : true,
                dateFormat   : "Y-m-d H:i",
                locale       : "es",
                altInputClass: "form-control h-auto mb-3 bg-transparent",
                minDate      : Date.now()
            }
        );
    }
}

function changeCustomLogo(id, origin){
    const element = $("#customFile-" + origin + '-' + id);
    const object = $("#custom_logo_file_" + origin + '_' + id)[0].files[0];
    element.val(object.name);
    if(object.type !== 'image/jpeg' && object.type !== 'image/png') {
        $("#" + id + origin + "-alert").html('<br><div class="alert alert-warning"><strong>El formato de la imagen debe ser .jpg o .png</strong></div>');
        $("#custom_logo_file_" + origin + '_' + id).val("");
        element.val("");
        setTimeout(()=>{
            $("#" + id + origin + "-alert").html('');
            if(object.size > 307200) {
                $("#" + id + origin + "-alert").html('<br><div  class="alert alert-warning"><strong>El tamaño de la imagen no debe ser mayor a 300Kb</strong></div>');
                setTimeout(()=>{$("#" + id + origin + "-alert").html('')}, 2000);
                $("#custom_logo_file_" + origin + '_' + id).val("");
                element.val("");
            }
        }, 2000);
        return false;
    }
    if(object.size > 307200) {
        $("#" + id + origin + "-alert").html('<br><div class="alert alert-warning"><strong>El tamaño de la imagen no debe ser mayor a 300Kb</strong></div>');
        setTimeout(() => {
            $("#" + id + origin + "-alert").html('')
        }, 2000);
        $("#custom_logo_file_" + origin + '_' + id).val("");
        element.val("");
    }

}

function setSpinner(id, origin){
    $(".custom-logo").removeAttr("checked");
    $("#submit_" + origin + id).html('<i style=" font-size:16px" class="fa fa-refresh fa-spin"></i>&nbsp;ENVIANDO')
}

function validateType(id){
    const object = $("#" + id)[0].files[0];
    if(object.name.substring((object.name).length - 4) !== "xlsx"){
        $("#masivo-excel-ms-alert").html('<br><div class="alert alert-warning"><strong>El archivo debe ser con extensión xlsx</strong></div>');
        setTimeout(() => {
            $("#masivo-excel-ms-alert").html('')
        }, 3000);
        $("#upload-template").val("");
    }
}

function validateTypeForPdf(id){
    const object = $("#" + id)[0].files[0];
    $("#masivo-excel-pdf-alert").html('')
    if(object.name.substring((object.name).length - 8) !== "pdf.xlsx"){
        $("#masivo-excel-pdf-alert").html('<br><div class="alert alert-warning"><strong>El archivo debe ser del formato XXXX_pdf.xlsx</strong></div>');
        setTimeout(() => {
            $("#masivo-excel-pdf-alert").html('')
        }, 3000);
        $("#" + id).val("");
    }
}
$(document).ready(function() {
    var a = navigator.userAgent;
    var agents = new Array("iPhone", "iPad", "Android", "SymbianOS", "Windows Phone", "iPod");
    var flag = true;
    for(var i = 0; i < agents.length; i++) {
        if(a.indexOf(agents[i]) > 0) {
            flag = false;
            break;
        }
    }
    if(flag) {
    } else {
        $(".button-mail").prop("onmouseover", null);
        $(".button-wp").prop("onmouseover", null);
        $(".button-pdf").prop("onmouseover", null);
    }

    $(".custom-logo").removeAttr("checked");
    $(".custom-logo-pdf").removeAttr("checked");
    $(".custom-send").removeAttr("checked");

    $('#card-popup-masiveDl').on('hidden.bs.modal', function () {
        $("#upload_excel").css("display", "none");
        $("#template_excel").css("display", "block");
        $("#upload-template").val("");
    });

    $("#card-popup-masiveDl").on("hidden.bs.modal", function () {
        location.reload()
    });
    $("#card-popup-masive-pdf").on("hidden.bs.modal", function () {
        location.reload()
    });

});

function trimZero(input) {
    if(input.substr(0, 1) === '0') {
        let result = input.substr(1);
        $("#WPphone").val(result);
    }
}

$(function() {
    $('input[name="delivery_date"]').flatpickr(
        {
            altInput     : true,
            altFormat    : "F j, Y - H:i",
            enableTime   : true,
            dateFormat   : "Y-m-d H:i",
            locale       : "es",
            altInputClass: "form-control h-auto mb-3 bg-transparent",
            minDate      : Date.now()
        }
    );
});
$(function() {
    $('input[name="delivery_date_wp"]').flatpickr(
        {
            altInput     : true,
            altFormat    : "F j, Y - H:i",
            enableTime   : true,
            dateFormat   : "Y-m-d H:i",
            locale       : "es",
            altInputClass: "form-control h-auto mb-3 bg-transparent",
            minDate      : Date.now()
        }
    );
});
