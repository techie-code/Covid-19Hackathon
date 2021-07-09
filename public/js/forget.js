
		$(document).ready(function(){

			$( "#form2" ).submit(function(event) {

				event.preventDefault();

				$.ajax({
					type: 'POST',
					url: '/forgetpass',
					data: $('#form2').serialize(),
					dataType: "json",
					success: function(response){
	
						$('#form2')[0].reset();

						document.getElementById("check").innerHTML=response.Success;

						setTimeout(function(){
							document.getElementById("check").innerHTML="";
						},3000);
						if (response.Success=="Password changed!") {
							document.getElementById("aa").click();
						};
					},
					error: function() {
					}
				})
			});

		});
