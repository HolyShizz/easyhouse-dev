


  $('.go_to').click( function(){
  var scroll_el = $(this).attr('href');
    if ($(scroll_el).length != 0) {
    $('html, body').animate({ scrollTop: $(scroll_el).offset().top - 50}, 800);
    }
    return false;
  });

	//Отправка почты ajax

	//кнопка отправки формы
  	
	$('body').on('click', '.send-btn', function(){
        $(this).parents('form').submit();
    });
	
	
		//валидация формы
	
	$('form').submit(function() {
        $(this).isCorrectRequest();
        return false;
    });
	
	(function($) {
		$.fn.isCorrectRequest = function() {
			this.find('input[type=text]').removeClass('correct error');

			var nameInput = $(this).find('[name = "name"]');
			var phoneInput = $(this).find('[name = "phone"]');
			var emailInput = $(this).find('[name = "email"]');
            var textInput = $(this).find('[name = "text"]');

			nameInput.val($.trim(nameInput.val()));
			phoneInput.val($.trim(phoneInput.val()));
			emailInput.val($.trim(emailInput.val()));
             textInput.val($.trim(textInput.val()));

			if(nameInput.val() != undefined){
				if(nameInput.val().length === 0)
				{
					nameInput.addClass('error');
					nameInput.focus();
					return false;
				}
			}

			if(emailInput.val() != undefined){
				var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
				if(emailInput.val().length === 0 || reg.test(emailInput.val()) == false)
				{
					emailInput.addClass('error');
					emailInput.focus();
					alert('Ошибка. Не верно заполнено поле Email.');
					return false;
				}
			}

			if(phoneInput.val() != undefined){
				var regt = /^\d[\d\(\)\ -]{4,14}\d$/;
				if(phoneInput.val().length === 0 || regt.test(phoneInput.val()) == false)
				{
					phoneInput.addClass('error');
					phoneInput.focus();
					alert('Ошибка. Не верно заполнен номер телефона.');
					return false;
				}
			}

			var form = $(this);
			var formData = new FormData($(this)[0]);
			var url = form.attr('action');
			$.ajax({
				type: 'POST',
				url: url,
				data: formData,
				cache: false,
				contentType: false,
				processData: false,
				async: false,
				success: function(data)
				{
					$('input').removeClass('error');
					$('input[type="text"]').val('');
					window.location.href = 'thanks.html';
				},
				error: function(answer)
				{
					alert('Ошибка. Не верно заполнено одно из полей.');
				}
			});
		};
	})(jQuery);