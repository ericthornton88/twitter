$(function() {

	var User = {
    handle: '@bradwestfall',
    img: 'images/brad.png'
	}

	var renderTweet = function(User, message) {
  		var source = $('#template-tweet').html();
		var template = Handlebars.compile(source);

		var output = template({
			tweet: message,
			handle: User.handle,
			img: User.img
		});

		return output;
  	}

  	var renderCompose = function() {
  		var source = $('#template-compose').html();
		var template = Handlebars.compile(source);

		var output = template();

		return output;
  	}

  	var renderThread = function(User, message) {
  		var source = $('#template-thread').html();
		var template = Handlebars.compile(source);

		var output = template({
			tweet: renderTweet(User, message),
			compose: renderCompose()
		});

		return output;
  	}

  	/****************************************
  	  jQuery
  	*****************************************/
  	

	$('main').on('click', '.compose textarea', function() {
	  	$(this).parents('.compose').addClass('expand')
	})

	$('main').on('click', '.tweets button', function() {
	  	$(this).parents('.compose').toggleClass('expand')
	})

	$('main').on('submit', 'header form.compose', function(event) {
		event.preventDefault();
	  	var foo = $(this).parents('header').find('textarea')
	  	var foobar = foo.val()
	  	$('.tweets').append(renderThread(User, foobar))
	  	foo.val('')
	  	$(this).toggleClass('expand')
	})

	$('.tweets').on('click', '.tweet', function() {
	  	$(this).parent('.thread').toggleClass('expand')
	})

	$('.tweets').on('submit', 'form.compose', function() {
	  	event.preventDefault();
	  	var foo = $(this).parents('.replies').find('textarea')
	  	var foobar = foo.val()
	  	$(this).parents('.replies').append(renderTweet(User, foobar))
	  	foo.val('')
	  	$(this).parents('.compose').removeClass('expand')
	})

})