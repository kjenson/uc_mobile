$('#drupalgap_dashboard').on('pagebeforeshow',function(){
	try {	
        $('#logout-btn, #login-btn').hide();
        
		if (drupalgap.user.uid) {
			$('#login-btn').hide();
			$('#logout-btn').show();
        	$('#main-header h1').html("Hi, " + drupalgap.user.name);
        }
        else {
        	$('#login-btn').show();
			$('#logout-btn').hide();
        }		
	}
	catch (error) {
		alert("drupalgap_dashboard - " + error);
	}
});


$('.uc-content-selector').live('click', function () {
    content_type_id = $(this).attr('content-type');
});

$('#logout-btn').on('click', function(){
	drupalgap.services.user.logout.call({
		'success':function(data){
			drupalgap.services.system.connect.call({
				'success':function(result){
					$.mobile.changePage(drupalgap.settings.front, {reloadPage:true});
				}
			});
		}
	});
});
