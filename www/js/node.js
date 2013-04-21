$('#drupalgap_node').on('pagebeforeshow', function(){
	$('#node_comments').hide();
	$('#comment_add').hide();
});

$('#drupalgap_node').on('pageshow', function(){
	drupalgap.services.node.retrieve.call({
		'nid':drupalgap.node.nid,
		'success':function(node){
			$('#node_type').html(content_types[content_type_id]);
			$('#node_title').html(node.title);
			$('#node_content').html(node.content);

            if(node.field_dreamland_mp3.length > 0 && drupalgap.user.uid) {
                if(node.field_dreamland_mp3[0].filepath)   {                                     
                    //initAudioPlayer(sitename + node.field_dreamland_mp3[0].filepath);
                    $('#audio-player audio').attr('src', sitename + node.field_dreamland_mp3[0].filepath);
                    $('#audio-player audio').load();
                    $('#audio-player').show();
                }
            }
            //if (node.uid == drupalgap.user.uid) {
			//	$('#node_edit').show();
			//}
			
			// Depending on the node's comment settings, set the appropriate
			// visibility on the comment button.
			// 1 = Closed, 2 = Open
			/*switch (node.comment) {
				case '1':
					if (node.comment_count > 0) { $('#node_comments').show(); }
					break;
				case '2':
					if (node.comment_count > 0) { $('#node_comments').show(); }
					$('#comment_add').show();
					break;
			}
			if ((node.comment == 1 || node.comment == 2) && node.comment_count > 0) {
				var view_comment_text = 'View ' + node.comment_count + ' ' + drupalgap_format_plural(node.comment_count, 'Comment', 'Comments');
				$('#node_comments span').html(view_comment_text);
			}*/
		}
	});
});

function initAudioPlayer(src) {
    $("#playaudio").live('tap', function() {        
        playAudio(src);
    });

    $("#pauseaudio").live('tap', function() {
        pauseAudio();
    });

    $("#stopaudio").live('tap', function() {
        stopAudio();
    });

    $('#audio-player').show();
}