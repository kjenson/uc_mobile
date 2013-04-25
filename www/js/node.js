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
            
            if(node.field_dreamland_stream.length > 0 && drupalgap.user.uid) {                
                if(node.field_dreamland_stream[0].value) {
                    var src = node.field_dreamland_stream[0].value;
                    
                    initAudioPlayer(src);                    
                }
            }
            
            if(node.field_dreamland_mp3 != null &&  node.field_dreamland_mp3.length > 0 && drupalgap.user.uid) {
                if(node.field_dreamland_mp3[0].filepath) {
                    $('#high-quality-mp3').attr('href', sitename + node.field_dreamland_mp3[0].filepath);
                } else {
                    $('#high-quality-mp3').hide();
                }
            } else {
                $('#high-quality-mp3').hide();
            }

            if(node.field_dreamland_mp3_low != null && node.field_dreamland_mp3_low.length > 0 && drupalgap.user.uid) {
                if(node.field_dreamland_mp3_low[0].filepath) {
                    $('#low-quality-mp3').attr('href', sitename + node.field_dreamland_mp3_low[0].filepath);                    
                } else {
                    $('#low-quality-mp3').hide();
                }
            } else {
                $('#low-quality-mp3').hide();
            }

            $('#node-mp3-files').show();
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
}