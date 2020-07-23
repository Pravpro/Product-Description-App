var topsForm = $("#tops").html();
var bottomsForm = $("#bottoms").html();

var genderMap = {
	"female" : "Women's",
	"male" : "Men's",
	"youth" : "Youth's"
}

var sizeMap = {
	"xs" : "XS",
	"s" : "Small",
	"m" : "Medium",
	"l" : "Large",
	"xl" : "XL",
	"2xl" : "XXL",
	"3xl" : "XXXL",
}

$("#tops").html("");
$("#bottoms").html("");

$("input[name='type-selection']").change(function(){
	var radioValue = $("input[name='type-selection']:checked").val();
	if (radioValue === "tops") {
		$("#bottoms").html("");
		$("#tops").html(topsForm);
	}
	else {
		$("#tops").html("");
		$("#bottoms").html(bottomsForm);
	}
	$("#copy-btn").popover();
});

$(document).on("click", "#clear-btn", function(){
	var radioValue = $("input[name='type-selection']:checked").val();
	radioValue === "tops" ? $("#tops").html(topsForm) : $("#bottoms").html(bottomsForm);
});;

$(document).on('click', '#generate-btn', function(){
	generateDescription($("textarea"));
});

$(document).on('change', '#same-size', function(){
	// Need to fill this
	// Select the same options as size on label
	var labelGender = $("input[name=label-gender]:checked");
	var labelSize = $("input[name=label-size]:checked");
	if(labelGender.length > 0) {$("input[name=recommended-gender][value=" + labelGender.val() + "]").prop('checked', true)}
	if(labelSize.length > 0) {$("input[name=recommended-size][value=" + labelSize.val() + "]").prop('checked', true)}
	// disable recommended gender/size radio buttons
});

$(document).on('change', '#no-label', function() {
	var labelInputs = $("input[name=label-gender], input[name=label-size]");
	if($(this).prop("checked") === true) {
		labelInputs.prop("disabled", true);
		$("#same-size").prop("checked", false);
		$("#same-size").prop("disabled", true);
	}
	else {
		labelInputs.prop("disabled", false);
		$("#same-size").prop("disabled", false);
	}
});

$(document).on('change', 'input[name=recommended-size], input[name=recommended-gender]', function(){
	$("#same-size").prop("checked", false);
});

$(document).on('click', '#flaws-reset', function() {
	$("#flaws-group select").val("none");
})

$(document).on('click', '#copy-btn', function(event) {
	$("textarea").select();
    document.execCommand('copy');
    $(".popover-body").text('Copied!');
    $('#copy-btn').popover('update');

});
$(document).on('hidden.bs.popover', "#copy-btn", function () {
	$("#copy-btn").attr("data-content", "Copy to clipboard");
})

function generateDescription(el) {
	var desc = "Title:" + getTitle() + "\n\nSize On Label: " + getSizeOnLabel() + 
		"\n\nRecommended Size: " + getRecommendedSize() + "\n\nMeasurements:\n" + getMeasurements() + 
		getFlaws() + "\n\nBrand: " + $("#brand").val() + "\n\nPrice: $" + $("#price").val();
	el.text(desc);
}

function getTitle() {
	var title = "";
	if($("#vintage")[0].checked) {title += " Vintage"};
	for (var i = 0; i < $("#title-group>input").length; i++) {
		var input = $("#title-group>input")[i];
		if(input.value != "") title += " " + input.value;
	}
	title += " - " + getRecommendedSize();
	return title;
}

function getRecommendedSize() {
	var gender = genderMap[$("input[name=recommended-gender]:checked").val()];
	var size = sizeMap[$("input[name=recommended-size]:checked").val()];
	var recommendedSize = "";
	if(gender != undefined) recommendedSize += gender;
	if(size != undefined) recommendedSize += " " + size;

	return recommendedSize;
}

function getSizeOnLabel() {
	if($("#no-label").prop("checked") === true) { return "N/A"; }

	var gender = genderMap[$("input[name=label-gender]:checked").val()];
	var size = sizeMap[$("input[name=label-size]:checked").val()];
	var labelSize = "";
	if(gender != undefined) labelSize += gender;
	if(size != undefined) labelSize += " " + size;

	return labelSize;
}

function getMeasurements() {
	return "Pit-to-Pit: " + $("#pit-to-pit").val() + "\"\nLength: " + $("#length").val() + "\"";
}

function getFlaws(){
	var flawString = "";
	var flawType = $("#flaw-type").val();
	var flaw = $("#flaws").val();

	if(flawType !== "none") { flawString += flawType + " "; }
	if(flaw !== "none") { flawString += flaw + ", please check additional picture(s) for more info"; }
	
	if (flawString.length > 0) {
		flawString = flawString.charAt(0) + flawString.slice(1).toLowerCase();
		flawString = "\n*" + flawString;
	}

	return flawString;
}