$(document).ready(init);
var currentId = null;
function init(){
	if(!validateToken()){
		window.location = 'login.html'
		return
	}




	
	
}
$("#addbtn").click(function(evt){
	$("#name").val('')
	$("#phone").val('')
	$("#email").val('')
})

function validateToken(){
	let accToken = localStorage.getItem('access_token')
	if(!accToken){
		return false;
	}

	var userInfo = localStorage.getItem('user');
	userInfo = JSON.parse(userInfo)
	$('#userName').html(userInfo.name)

	let elements = `<div class="col-md-8 align-items-center">
        <!-- Column -->
        <div class="card"> <img class="card-img-top" src="https://imgur.com/FUsyxR5.jpg" alt="Card image cap">
            <div class="card-body little-profile text-center">
                <div class="pro-img"><img src="https://imgur.com/AJQrMa3.jpg" alt="user"></div>
                <h3 class="m-b-0">${userInfo.name}</h3>
                <p>${userInfo.phone}</p> 
                <p>${userInfo.email}</p>
                <a href="javascript:void(0)" class="m-t-10 waves-effect waves-dark btn btn-primary btn-md btn-rounded" data-abc="true" data-toggle="modal" data-target="#categoryModal" id="addbtn">Edit Profile</a>
              
            </div>
        </div>
    </div>` 
	
	$("#table-box").html(elements)




	$("#saveProduct").click(function(evt){
		let props = {}
		props.id = userInfo.id
		props.name=$("#name").val()
		props.phone=$("#phone").val()
		props.email=$("#email").val()

		updateProduct(props);
		

		
	})
	return true;

	
		
	console.log(userInfo)
}

function saveCategory(props){
		$.ajax({
		method: 'POST',
		url:"http://localhost:3000/category/add",
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		dataType:"json",
		async:false,
		data:props,
		
		success: function(res){
			if(res.status == 200){
				getCategories();
				alert("Category added successfully")
				$("#closeCategory").click();
			}else{
				alert("There is an error")
			}
			
		},
		error: function(error){
			throw new error(error)
			console.error(error);
		}
	})
		console.log(props)
}


function updateProduct(props){
		$.ajax({
		method: 'POST',
		url:"http://localhost:3000/user/update",
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		dataType:"json",
		async:false,
		data:props,
		
		success: function(res){
			if(res.status == 200){
				validateToken();
				alert("Details updated  successfully")
				$("#closeCategory").click();
			}else{
				alert("There is an error")
			}
			
		},
		error: function(error){
			throw new error(error)
			console.error(error);
		}
	})
		console.log(props)
}


$('#logout').click(function(){
	localStorage.clear();
})