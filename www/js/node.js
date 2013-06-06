$('#drupalgap_node').on('pagebeforeshow', function(){
	$('#node_comments').hide();
	$('#comment_add').hide();
});

$('#drupalgap_node').on('pageshow', function(){
	drupalgap.services.node.retrieve.call({
		'nid':drupalgap.node.nid,
		'success':function(node){
			//$('#node_type').html(content_types[content_type_id]);
			$('#node_title').html(node.title);
			$('#node_content').html(node.content);
            
            switch (node.comment) {
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
			}
			
            if(node.field_dreamland_stream != null && node.field_dreamland_stream.length > 0 && drupalgap.user.uid) {
                if(node.field_dreamland_stream[0].value) {
                    //var src = node.field_dreamland_stream[0].value;
                    var src = 'http://www.strieber.com/streaming/042613.mp3';
                   
                    initAudioPlayer(src);                         
                }
            }
            /*
            if(node.field_dreamland_mp3 != null &&  node.field_dreamland_mp3.length > 0 && drupalgap.user.uid) {
                if(node.field_dreamland_mp3[0].filepath) {
                    $('#high-quality-mp3').attr('download-url', sitename + node.field_dreamland_mp3[0].filepath);
                    $('#high-quality-mp3').attr('filename', node.field_dreamland_mp3[0].filename);
                } else {
                    $('#high-quality-mp3').hide();
                }
            } else {
                $('#high-quality-mp3').hide();
            }

            if(node.field_dreamland_mp3_low != null && node.field_dreamland_mp3_low.length > 0 && drupalgap.user.uid) {
                if(node.field_dreamland_mp3_low[0].filepath) {
                    $('#low-quality-mp3').attr('download-url', sitename + node.field_dreamland_mp3_low[0].filepath);
                    $('#low-quality-mp3').attr('filename', node.field_dreamland_mp3_low[0].filename);
                } else {
                    $('#low-quality-mp3').hide();
                }
            } else {
                $('#low-quality-mp3').hide();
            }

            $('#node-mp3-files').show(); */
		}
	});
    /*
    $('.download-file').live('click', function () {
        var src = $(this).attr('download-url');
        var filename = $(this).attr('filename');

        window.requestFileSystem(
                 LocalFileSystem.PERSISTENT, 0,
                 function onFileSystemSuccess(fileSystem) {
                 fileSystem.root.getFile(
                             "dummy.html", {create: true, exclusive: false},
                             function gotFileEntry(fileEntry){
                             var sPath = fileEntry.fullPath.replace("dummy.html","");
                             var fileTransfer = new FileTransfer();
                             fileEntry.remove();

                             fileTransfer.download(
                                       src,
                                       sPath + filename,
                                       function(theFile) {
                                           console.log("download complete: " + theFile.toURI());
                                           //showLink(theFile.toURI());
                                       },
                                       function(error) {
                                           console.log("download error source " + error.source);
                                           console.log("download error target " + error.target);
                                           console.log("upload error code: " + error.code);
                                       }
                                       );
                             },
                             fail);
                 },
                 fail);

    }); */
    
    $('#node_comments').on('click', function(){
		$.mobile.changePage('node_comments.html');
		return false;
	});
	
	$('#comment_add').on('click', function(){
		$.mobile.changePage('comment_edit.html');
		return false;
	});
});

function fail(evt) {
    console.log(evt.target.error.code);
}

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

