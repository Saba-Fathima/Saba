$(document).ready(init);
$('#logout').click(function(){
	localStorage.clear();
})
var userInfo = localStorage.getItem('user');
	userInfo = JSON.parse(userInfo)
	$('#userName').html(userInfo.name)
var currentId = null;
function init(){
	if(!validateToken()){
		window.location = 'login.html'
		return
	}

	getCategories();


	$("#saveCategory").click(function(evt){
		let props = {}
		props.category_name=$("#categoryName").val()
		props.narration=$("#narration").val()
		if(currentId == null){
		saveCategory(props);
	}else{
		props.id = currentId;
		updateCategory(props);
		currentId = null;
	}
		
	})
	
}
$("#addbtn").click(function(evt){
	$("#categoryName").val('')
	$("#narration").val('')
})

function validateToken(){
	let accToken = localStorage.getItem('access_token')
	if(!accToken){
		return false;
	}

	var userInfo = localStorage.getItem('user');
	userInfo = JSON.parse(userInfo)
	$('#userName').html(userInfo.full_name)
	return true;
	console.log(accToken)
}

function getCategories(){
	$.ajax({
		data:null,
		url:"http://localhost:3000/category/getall",
		method: 'GET',
		headers:{
			authorization: 'Bearer ' + localStorage.getItem('access_token')
		},
		success: function(res){
			if(res.status == 200){
				loadRecords(res.response);
			}
			
		},
		error: function(error){
			
		}
	})
}

function loadRecords(record){

	let elements = ""
	for(let i=0; i<record.length; i++){
		elements += generateRecord(record[i],i);
	}
	$("#table-box").html(elements)
	 
}

function generateRecord(item, index){
	return 	`<tr>
              <td>${index+1}</td>
              <td>${item.category_name}</td>
              <td>${item.narration}</td>
              <td><button type="button" class="btn btn-sm btn-warning mr-2" data-toggle="modal" data-target="#categoryModal" onclick = "editRecord(${item.id},'${item.category_name}','${item.narration}')">Edit</button>
              <button type="button" class="btn btn-sm btn-danger" onclick = "deleteRecord(${item.id})">Delete</button></td>
             
            </tr>`
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

function deleteRecord(ids){
	let props = {
		id:ids
	}
	$.ajax({
		method: 'POST',
		url:"http://localhost:3000/category/delete",
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		dataType:"json",
		async:false,
		data:props,
		
		success: function(res){
			if(res.status == 200){
				getCategories();
				alert("Category deleted successfully")
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

}

function editRecord(id, category_name, narration){
	currentId = id;
	$("#categoryName").val(category_name)
	$("#narration").val(narration)
	console.log(id);

}

function updateCategory(props){
		$.ajax({
		method: 'POST',
		url:"http://localhost:3000/category/update",
		contentType : "application/x-www-form-urlencoded; charset=utf-8",
		dataType:"json",
		async:false,
		data:props,
		
		success: function(res){
			if(res.status == 200){
				getCategories();
				alert("Category updated  successfully")
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

function logout(){

}