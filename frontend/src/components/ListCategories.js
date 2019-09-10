import React from 'react';
import {ERROR_TEXT} from '../constants';

const ListCategories = (props) => {

	const { 
		categories,
		updateEditCategorie,
    getNormalizeClass,
		handlerInputsValue } = props;

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

      updateEditCategorie(obj);
    }
  } 

  let categoriesTable = ERROR_TEXT;

  if(categories.length !== 0){

    categoriesTable = categories.map((item, index)=>{
      return(
        <tr key={index} id={item._id} className="text-center">
        <td className="text-left">
      		<div className="input-group input-group-sm">
            <input
              value={item.catName}
              onChange={(ev)=>{
              	// необходимо отправить 3 параметра,
              	// но принимается 2 параметра,
              	// поэтому первый параметр массив
              	handlerInputsValue([ev.target.value, item._id], ev.target.name);
          			// обновляем поле catClass
          			handlerInputsValue(
                  [getNormalizeClass(ev.target.value), item._id], 'catClass');
              }}
              name="catName" className="form-control"
              type="text"/>
      		</div>	
        </td>
        <td className="text-center">
            <div 
            	className="py-1" 
            	style={{backgroundColor: item.catBGC, color: item.catColor}}>
            	{item.catName}
            </div>
        </td>
        <td className="text-center">
      		<div className="input-group input-group-sm">
	          <input
              onChange={(ev)=>handlerInputsValue(
              		[ev.target.value, item._id], ev.target.name
            	)}
            	value={item.catColor}
	            type="color" 
	            name="catColor" className="form-control"/>
      		</div>	
        </td>
        <td className="text-center">
      		<div className="input-group input-group-sm">
	          <input 
              onChange={(ev)=>{
              	handlerInputsValue([ev.target.value, item._id], ev.target.name);
            	}}
            	value={item.catBGC}
	            type="color" 
	            name="catBGC" className="form-control"/>
      		</div>
        </td>
        <td className="text-center">
	        	<button 
	        		onClick={(ev)=>validateForm(
                {
                	_id: item._id,
                  catName: item.catName, 
                  catClass: item.catClass, 
                  catColor: item.catColor,
                  catBGC: item.catBGC,
                  userId: item.userId
                }
              )}
	        		type="button" className="btn btn-sm btn-success">
	        			Save
	      		</button>
        </td>
      </tr>
      )
    });
  }

	return(
		<div className="container">
      <h1 className="mt-2">Edit categories</h1>
      <table className="table table-hover table-dark table-sm">
        <thead>
          <tr>
            <th scope="col" className="text-left">Categorie Name</th>
            <th scope="col" className="text-center">Class Name</th>
            <th scope="col" className="text-center">Text Color</th>
            <th scope="col" className="text-center">Background</th>
            <th scope="col" className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>{categoriesTable}</tbody>
      </table>
    </div>
	);
}

export default ListCategories;