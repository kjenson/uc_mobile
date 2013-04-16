$('#uc-content-type-page').on('pagebeforeshow', function() {
    $('#uc_content_list').html('');
});

$('#uc-content-type-page').on('pageshow', function(){
	drupalgap.views_datasource.call({
		'path':'drupalgap/views_datasource/drupalgap_content/' + content_type_id,
		'success':function(data) {
            $('#uc_content_list').html('');
            $('#uc_content_list').attr("data-filter","true");
            $('#uc_content_list').attr("data-filter-placeholder", "Search Title...");

			$.each(data.nodes, function(index, object){
				$("#uc_content_list").append($("<li></li>",{"html":"<a href='node.html' id='" + object.node.nid + "'>" + object.node.title + "</a>", "data-filtertext" : object.node.title}));
			});

            $('#main-header h1').html(content_types[content_type_id]);
			$("#uc_content_list").listview("destroy").listview();
		}
	});
});

$('#uc_content_list a').live('click',function(){
	drupalgap.node = {'nid':$(this).attr('id')};
});
