$(document).ready(init);

function init(){
	$.ajax({
		method: 'GET',
		url: "http://localhost:3000",
		data: null,
		success: function(res){
			if(res.status == 200){
				loadRecords(res.response);
			}
			
		},
		error: function(error){
			console.log(error);
		}
	})
}

function loadRecords(record){
	console.log(record)
	let elements = ""
	for(let i=0; i<record.length; i++){
		elements += generateRecord(record[i]);
	}
	$("#box").html(elements)
}

function generateRecord(item){
	return 	`	<div class="col">
					<div class="card" style="width: 18rem;">
  					<div class="card-body">
   		 			<h5 class="card-title">${item.product_name}</h5>
    				<p class="card-text">
    				${item.product_price}<br>
    				${item.quantity}
    				</p>
  					</div>
					</div>
				</div>`
}

