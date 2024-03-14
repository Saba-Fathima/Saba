$('.form-signin').submit(function(evt){
	evt.preventDefault()
})

$(document).ready(init);

	formValidation();

function init(){
	$('#registerBtn').click(function(){
		var error = $('#error');
		error.html('');
		let props ={
			name : $('#full_name').val(),
			phone : $('#phone').val(),
			email : $('#email').val(),
			password : $('#pass').val()
			
			
		}
		
		if(props.name.trim() && props.email && props.password.trim() && props.phone){
			let cpass = $('#cpass').val();
		if(props.password != cpass){
			error.html('Password does not match');
			setTimeout(function(){
				error.html('')
			},2000)
		}else{
			//save data
			saveUser(props);
		}
		}else{
			error.html('All feilds are required')
			setTimeout(function(){
				error.html('')
			},2000)
		}

	})

}

function formValidation(){
	$('#full_name').on('keyup', function(evt){
		let fullname = evt.target.value;
		if(!fullname.trim()){
			$('#nameError').html('Full Name is required')
		}else if(fullname.trim() && fullname.trim().length <=3){
			$('#nameError').html('Mininum 4 length is required')
		}else{
			$('#nameError').html('')
		}
	})

	$('#phone').on('keyup', function(evt){
		let phone = evt.target.value;
		if(!phone){
			$('#phoneError').html('Phone number is required')
		}else if(phone && phone.length <=9 || phone.length >10){
			$('#phoneError').html('Mininum 10 length is required')
		}else{
			$('#phoneError').html('')
		}
	})

	$('#email').on('keyup', function(evt){
		let email = evt.target.value;
		const re =
  			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		if(!email){
			$('#emailError').html('Email is required')
		}else if(email && re.test(email)){
			$('#emailError').html('')
			doesEmailExist({email},function(emailExist){
				if(emailExist){
					$('#emailError').html('Email already exist')
				}else{
					$('#emailError').html('')
				}
			})
		}else{
			$('#emailError').html('Add correct Email Id')
		}
	})

	$('#pass').on('keyup', function(evt){
		var passw = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
		let pass = evt.target.value;
		if(!pass){
			$('#passError').html('Password is required')
		}else if(pass && passw.test(pass)){
			$('#passError').html('')
		}else{
			$('#passError').html('strong password is required')
		}
	})
	$('#cpass').on('keyup', function(evt){
		let pass = $('#pass').val();
		let cpass = evt.target.value;
		if(!cpass){
			$('#passcError').html('Password is required')
		}else if(cpass == pass ){
			$('#passcError').html('')
		}else{
			$('#passcError').html('Password does not match')
		}
	})
}

function saveUser(props){
	console.log(props)
	$.ajax({
		method: 'POST',
		url:"http://localhost:3000/user/add",
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		dataType:"json",
		async:false,
		data:props,
		
		success: function(res){
			if(res.status == 200){
				alert("User registered successfully")
				window.location = "login.html"
			}else{
				alert("There is an error")
			}
			
		},
		error: function(error){
			
		}
	})
	console.log(props)
}

function doesEmailExist(props, callback){
	$.ajax({
		method: 'POST',
		url:"http://localhost:3000/user/email/exist",
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		dataType:"json",
		async:false,
		data:props,
		
		success: function(res){
			if(res.status == 200){
				return callback(false)
			}else if(res.status == 404){
				callback(true)
				
			}else{
				alert("There is an error")
				window.location.reload();
			}
			
		},
		error: function(error){
			
		}
	})
}