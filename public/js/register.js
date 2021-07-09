
		$(document).ready(function(){

			$( "#form1" ).submit(function(event) {
				event.preventDefault();

				$.ajax({
					type: 'POST',
					url: '/register',
					data: $('#form1').serialize(),
					dataType: "json",
					success: function(response){

						$('#form1')[0].reset();

						document.getElementById("check").innerHTML=response.Success;

         					setTimeout(function(){
         						document.getElementById("check").innerHTML="";
         					},3000);
         					if (response.Success=="You are registered,You can login now.") {
         						document.getElementById("aa").click();
         					};
         				},
         				error: function() {
         				}
         			})
			});
		});