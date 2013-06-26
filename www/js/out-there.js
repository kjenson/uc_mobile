$('body').append("<div class='ui-loader-background'> </div>");

$('#node_submit').on('click', function () {	
	var url = $('#source').val();
	var email = $('#email').val();
	var errors = '';
	//var url_pattern = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/;  
	var email_pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if(!ValidUrl(url)) {
		errors += "Please enter a valid URL. \r\n";	    
	}
	
	if(email != '' && !email_pattern.test(email)) {
		errors += "Please enter a valid email address.";
	} 
	
	if(errors != '') {
		alert(errors);		
		return false;
	}
	$('body').addClass('ui-loading');
    $.mobile.showPageLoadingMsg("b", "Sending request...", false);
    
	$.ajax({
		cache: false,
		async: true,
		type: 'POST',
		url : sitename + 'outthere.php',
		dataType: 'json',
		timeout: 30000,
		data: {
			name : $('#name').val(),
			email_address : email,
			link_source : url,
			additional_details : $('#add_details').val(),
			uid : drupalgap.user.uid	
		},
		success: function(response) {	
			$('body').removeClass('ui-loading');
			$.mobile.hidePageLoadingMsg();	
			
			//$.mobile.changePage( "#dialogPage", { role: "dialog" } );
			if($.trim(response.message) == 'Success') {
				$('.alert-message').html('Out There Story submitted');			
			} else {
				$('.alert-message').html('Error processing request.');
			}
			
			$('#popupDialog').popup('open');			
			
		},
		error: function() {
			$('.alert-message').html('Error in processing request.');
		}
	});
});

$("#popupDialog").on("popupafterclose", function( event, ui ) {
	$.mobile.changePage('dashboard.html');
});

function ValidUrl(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  if(!pattern.test(str)) {
    return false;
  } else {
    return true;
  }
}