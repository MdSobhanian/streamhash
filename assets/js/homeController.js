//drop-content

	$('.arrow').on('click', function(){
	    $parent_box = $(this).closest('.slide-area');

	    $silde_box = $(this).closest('.slide-box');

	    $silde_box.addClass('active_img');

	    $parent_box.siblings().find('.video-drop').hide();

	    $parent_box.find('.video-drop').toggle();
	});



				
	$('.video-box').hover(function() {

	 	for(var i = 0; i < 6; i++) {

	 		$("#"+i).removeClass('active_img');

	 	}

	 	console.log("ddd");

		var id_val = $(this).attr('id');

		var video_drop = $(".video-drop").is(":visible");

		if (!video_drop) {

			$(this).addClass('transition-class');

		} else {

			$(this).addClass('active_img');
		}

		// $scope.callRoute(id_val);

	}, function() {

	    $(this).removeClass('transition-class');

	    var video_drop = $(".video-drop").is(":visible");


	});