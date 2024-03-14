$('.form-signin').submit(function(evt){
	evt.preventDefault()
})

$(document).ready(init);
	
	formValidation();
var error = $('#error');


function init(){
	$('#loginBtn').click(function(){
		
		error.html('');
		let props ={
			email : $('#email').val(),
			password : $('#pass').val(),
			
		}
		
		if(props.email && props.password.trim()){
			
			//save data
			processLogin(props);
		
		}else{
			error.html('All feilds are required')
			setTimeout(function(){
				error.html('')
			},2000)
		}

	})

}

function formValidation(){
	

	$('#email').on('keyup', function(evt){
		let email = evt.target.value;
		const re =
  			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		if(!email){
			$('#emailError').html('Email is required')
		}else if(email && re.test(email)){
			$('#emailError').html('')
			
		}else{
			$('#emailError').html('Add correct Email Id')
		}
	})

	$('#pass').on('keyup', function(evt){
		
		let pass = evt.target.value;
		if(!pass){
			$('#passError').html('Password is required')
		}else if(pass){
			$('#passError').html('')
		}else{
			$('#passError').html('strong password is required')
		}
	})
	
}

function processLogin(props){
	console.log(props)
	$.ajax({
		method: 'POST',
		url:"http://localhost:3000/user/login",
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		dataType:"json",
		async:false,
		data:props,
		
		success: function(res){
			if(res.status == 200){
				
				console.log(res.response)
				localStorage.setItem("access_token",res.response)
				let userPayload = jwt_decode(localStorage.getItem("access_token"));
				let stringifyPayload = JSON.stringify(userPayload)
				localStorage.setItem("user", stringifyPayload)
				window.location = "profile.html"
				//alert("Login successfull")
				
			}else{
				error.html('Invalid Credentials')
				
			}
			
		},
		error: function(error){
			throw new Error(error)
		}
	})
	console.log(props)
}

