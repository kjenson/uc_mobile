var page = 0;

$('#uc-content-type-page').on('pagebeforeshow', function() {
    $('#uc_content_list').html('');
});

$('#uc-content-type-page').on('pageshow', function() {
    $('#uc_content_list').html('');
    
	show_content_list(true);
});

$('#uc_content_list a').live('click',function(){
	drupalgap.node = {'nid':$(this).attr('id')};
});

$('#more-link a').live('click', function () {
    page = page + 1;
    show_content_list(false);
});

function show_content_list(first_init) {          
    drupalgap.views_datasource.call({
		'path':'drupalgap/views_datasource/drupalgap_content/' + content_type_id + '?page=' + page,                
		'success':function(data) {            
            
			$.each(data.nodes, function(index, object){
				$("#uc_content_list").append($("<li></li>",{ "html":"<a href='node.html' id='" + object.node.nid + "'>" + object.node.title + "</a>" }));
			});

            $('#main-header h1').html(content_types[content_type_id]);
            
            if(first_init) {
                $("#uc_content_list").listview('destroy').listview();
            } else {
                $("#uc_content_list").listview('refresh');
            }
            
            $('#more-link').show();
		}
	});
}
