$(document).ready(function(){
	//handle saving articles
	$(".saveBtn").on("click",function(){
		var value = $(this).attr("value");
		var data = JSON.parse(value);
		$.ajax({
			method: "POST",
			url: "/save",
			data: data
		});
		$(this).addClass("hidden");
	});
	//handle opening notes div
	$(".noteBtn").on("click",function(){
		var id = $(this).attr("value");
		$("#noteBtn-"+id).addClass("hidden");
		$("#addNoteBtn-"+id).removeClass("hidden");
		$("#note"+id).removeClass("hidden");

	})
	//handle closing notes div
	$(".closeBtn").on("click",function(){
		var id = $(this).attr("value");
		$("#note"+id).addClass("hidden");
		$("#addNoteBtn-"+id).addClass("hidden");
		$("#noteBtn-"+id).removeClass("hidden");
	})
	//handle add note modal
	$(".addNoteBtn").on("click",function(){
		var id = $(this).attr("value");
		$("#modal"+id).modal("open");
	})
});