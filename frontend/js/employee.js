var userInfo = localStorage.getItem('user');
	userInfo = JSON.parse(userInfo)
	$('#userName').html(userInfo.name)


    $(document).ready(init);

var currentId = null;
function init(){
	getEmployee();

	$("#saveEmployee").click(function(evt){
		let props = {}
		props.f_name= $('#nam').val()
		props.f_email=$("#email").val()
		props.f_mobile=$("#phone").val()
		props.f_designation=$("#desg").val()
		props.f_gender=$("#gen:checked").val()
        props.f_course=$("#cour:checked").val()
		if(f_id == null){
		saveEmployee(props);
	}else{
		props.f_id = currentId;
		update(props);
		currentId = null;
	}
		
	})
}


function getEmployee(){
		$.ajax({
		data:null,
		url:"http://localhost:3000/employee/getall",
		method: 'GET',
		
		success: function(res){
			if(res.status == 200){
				loadRecords(res.response);
			}
			
		},
		error: function(error){
			console.error(error);
		}
	})
}

function loadRecords(props){
	let elements = ""
	for(let i=0; i<props.length; i++){
		elements += generateRecord(props[i]);
	}
	$("#blocks").html(elements)
}

function generateRecord(item){
	return 	`
				<div class="card" style="width: 18rem;">
        		<img src="C:/Users/HP/Desktop/crud/image.jpg" class="card-img-top" alt="...">
          		<div class="card-body">
           		 <h5 class="card-title text-center">${item.product_name}</h5>
            <p class="card-text text-center">${item.product_price}</p>
            <a href="#" class="btn btn-primary ">BUY</a>
            
            </div>
          </div>`
}

function saveEmployee(props){
		$.ajax({
		method: 'POST',
		url:"http://localhost:3000/employee/add",
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		dataType:"json",
		async:false,
		data:props,
		
		success: function(res){
			if(res.status == 200){
				getEmployee();
				alert("Product added successfully")
				$("#closeProduct").click();
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