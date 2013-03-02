<?php 
	$this->pageTitle=Yii::app()->name.' | Main';
?>
<?php $this->beginClip('script')?>
	<script type="text/javascript">
		$(document).ready(function(){
			$('#submit').click(function(){
				$.ajax({
					url : '/auth/login',
					type : 'POST',
					dataType : 'json',
					data : { LoginForm : { 
						email : $('input[name="email"]').val(), 
						password : $('input[name="password"]').val(), 
						rememberMe : true }},
					success : function(result){
						if (result.success){
							alert('success!');
						}
					} 
				});
			});	
		});
	</script>
<?php $this->endClip('script')?>
<fieldset>
	<h3>Simple Login Form</h3>
	<section>
		<input type="email" name="email"/>
	</section>
	<section>
		<input type="password" name="password"/>
	</section>
	<section>
		<button id="submit">Send</button>
	</section>
</fieldset>