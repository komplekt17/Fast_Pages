import React, {useState} from 'react';
import $ from "jquery";

const FormAddNewCategorie = (props) => {

	const { 
		userID,  
		addNewCategorie,
		getNormalizeClass } = props;

	// state for id="catClass"
	const [itemText, setText] = useState('cat Name');
	const [itemColor, setColor] = useState('#fff');
	const [itemBGC, setBGC] = useState('#000');

  const validateForm = (obj) => {
    
    // счётчик количества НЕкорректно заполненных полей
    let invalidCount = 0;

    for(var key in obj){

      if(obj[key] === null || obj[key] === ''){
        //document.getElementById(key).classList.remove("is-invalid", "is-valid");
        // document.getElementById(key).previousSibling.firstChild
        //   .classList.remove("text-danger", "text-success");
        
        //document.getElementById(key).classList.add("is-invalid");
        // document.getElementById(key).previousSibling.firstChild
        //   .classList.add("text-danger");

        invalidCount += 1;
      }
    }
    if(invalidCount === 0){
      // clear feilds
      $('#catName').val('');
      $('#catColor').val('');
      $('#catBGC').val('');
      
      //console.log(obj, invalidCount)
      addNewCategorie(obj);

    }else alert('Enter all fields');
  }

	return(
		<div className="container">
      <h1 className="mt-2">Add new Categorie</h1>
      <form onSubmit={(e)=>e.preventDefault()}>
				<table className="table table-hover table-dark table-sm">
	        <thead>
	          <tr>
	            <th scope="col" className="text-left">Categorie Name</th>
	            <th scope="col" className="text-center">Visible Name</th>
	            <th scope="col" className="text-center">Text Color</th>
	            <th scope="col" className="text-center">Background</th>
	            <th scope="col" className="text-center">Action</th>
	          </tr>
	        </thead>
	        <tbody>
	        	<tr className="text-center">
			        <td className="text-left">
			      		<div className="input-group input-group-sm">
			            <input
			            	onChange={(ev)=>setText(ev.target.value)}
			              id="catName" className="form-control"
			              type="text"/>
			      		</div>	
			        </td>
			        <td className="text-center">
			          <div 
			          	style={{backgroundColor: itemBGC, color: itemColor}}
			          	className="py-1" id="catClass">
			            {itemText}
			      		</div>	
			        </td>
			        <td className="text-center">
			      		<div className="input-group input-group-sm">
				          <input
			            	onChange={(ev)=>setColor(ev.target.value)}
				            type="color" 
				            id="catColor" className="form-control"/>
			      		</div>	
			        </td>
			        <td className="text-center">
			      		<div className="input-group input-group-sm">
				          <input
			            	onChange={(ev)=>setBGC(ev.target.value)}
				            type="color" 
				            id="catBGC" className="form-control"/>
			      		</div>
			        </td>
			        <td className="text-center">
				        	<button 
				        		onClick={(ev)=>validateForm(
		                  {
		                    catName: $('#catName').val(), 
		                    catClass: getNormalizeClass($('#catName').val()),
		                    catColor: $('#catColor').val(),
		                    catBGC: $('#catBGC').val(),
		                    userId: userID
		                  }
		                )}
				        		type="button" className="btn btn-sm btn-info">Add
				      		</button>
			        </td>
			      </tr>
	        </tbody>
	      </table>
      </form>
		</div>
	);
}

export default FormAddNewCategorie;