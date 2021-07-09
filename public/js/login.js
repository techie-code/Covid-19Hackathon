$(document).ready(function(){

			$( "#form" ).submit(function(event) {
				event.preventDefault();

				$.ajax({
					type: 'POST',
					url: '/login',
					data: $('#form').serialize(),
					dataType: "json",
					success: function(response){

						$('#form')[0].reset();

						document.getElementById("check").innerHTML=response.Success;

         					setTimeout(function(){
         						document.getElementById("check").innerHTML="";
         					},3000);
         					if (response.Success=="Success!") {
         						document.getElementById("aa").click();
         					};
         				},
         				error: function() {
         				}
         			})
			});

		});
