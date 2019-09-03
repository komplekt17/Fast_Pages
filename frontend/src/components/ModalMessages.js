import React from 'react';
import $ from "jquery";

import '../styles/ModalMessages.css';

const AlertMessage = ({nameModal}) => {
	return(
		<div className="modal fade" id="modal-alert" tabIndex="-1" role="dialog" 
        aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header alert-danger">
            <h5 className="modal-title" id="exampleModalLongTitle">Message</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="alert">
              <p>{nameModal}</p>
            </div>
          </div>
          <div className="modal-footer alert-danger">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
	);
}

const SuccessMessage = () => {
	return(
		<div className="modal fade" id="modal-success" tabIndex="-1" role="dialog" 
	        aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header alert-success">
            <h5 className="modal-title" id="exampleModalLongTitle">Message</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="alert">
              Your changes sent success on server
            </div>
          </div>
          <div className="modal-footer alert-success">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
	);
}

const EditPageModal = (props) => {

  const { 
    nameModal, 
    categories, 
    pageDetails, 
    handlerInputsValue,
    updateEditPage,
    addNewPage } = props;

  const validateForm = (obj) => {
    
    // счётчик количества НЕкорректно заполненных полей
    let invalidCount = 0;

    for(var key in obj){

      if(obj[key] === null || obj[key] === ''){
        // document.getElementById(key).classList.remove("is-invalid", "is-valid");
        // document.getElementById(key).previousSibling.firstChild
        //   .classList.remove("text-danger", "text-success");
        
        // document.getElementById(key).classList.add("is-invalid");
        // document.getElementById(key).previousSibling.firstChild
        //   .classList.add("text-danger");

        invalidCount += 1;
      }
    }
      
    if(invalidCount === 0){
      // clear feilds
      $('#name').val('');
      $('#link').val('');
      $('#type').val('');
      $('#screen').val('');

      if(nameModal === 'Edit') updateEditPage(obj);// обновляем page
      else if(nameModal === 'Add') addNewPage(obj);
      

      // закрываем окно
      $("#modal-editpage").modal("hide")
    }
  } 

	let categoriesList;
  
	if(categories.length !== 0){
    categoriesList = categories.map((item, index)=>{
      	return(
	        <option
	        	key={index}
	        	className={item.catClass}
	        	value={item.catClass}>{item.catName}</option>
      	)
    });
	}

	return(
		<div className="modal fade" id="modal-editpage" tabIndex="-1" role="dialog" 
	        aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header alert-success">
            <h5 
            	className="modal-title" 
            	id="exampleModalLongTitle">
            	{nameModal+"ing"} Page
          	</h5>
            <button 
            	type="button" className="close" 
            	data-dismiss="modal" aria-label="Close">
            		<span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">

            <form className="form-signin">
						  <div className="form-label-group">
						    <input
                  onChange={(ev) => handlerInputsValue(ev.target.value, ev.target.id)}
                  value={pageDetails.name}
						    	type="text" id="name" className="form-control" 
						    	placeholder="enter Name Page" 
                  aria-describedby="editPage" />
						    <label htmlFor="name">Name Page</label>
						  </div>

						  <div className="form-label-group">
						    <input
                  onChange={(ev) => handlerInputsValue(ev.target.value, ev.target.id)}
                  value={pageDetails.link} 
						    	type="text" id="link" className="form-control" 
						    	placeholder="enter Link Page" 
                  aria-describedby="editPage" />
						    <label htmlFor="link">Link Page</label>
						  </div>

						  <div className="form-label-group">
						    <input
                  onChange={(ev) => handlerInputsValue(ev.target.value, ev.target.id)}
                  value={pageDetails.screen} 
						    	type="text" id="screen" 
						    	className="form-control" 
						    	placeholder="enter Link Preview Page" 
                  aria-describedby="editPage" />
						    <label htmlFor="screen">Link Preview Page</label>
						  </div>

						  <div className="form-label-group">
						  	<select
                  onChange={(ev) => {
                    handlerInputsValue(ev.target.value, ev.target.id)
                  }}
                  value={pageDetails.type} 
  					    	id="type" 
  					    	className="form-control">
					         {categoriesList}
				      	</select>
						    <label htmlFor="type">Select Cathegorie</label>
						  </div>
						  { nameModal === 'Edit' ?
              <button 
                id="editPage"
                className="btn btn-info btn-block" type="button"
                onClick={(ev)=>validateForm(
                  {
                    id: pageDetails.id,
                    name: pageDetails.name, 
                    link: pageDetails.link, 
                    type: pageDetails.type,
                    user: pageDetails.user, 
                    screen: pageDetails.screen,
                  }
                )}>
                {nameModal} Page
              </button>
              :
              <button 
                id="addPage"
                className="btn btn-info btn-block" type="button"
                onClick={(ev)=>validateForm(
                  {
                    name: $('#name').val(), 
                    link: $('#link').val(), 
                    type: $('#type').val(),
                    screen: $('#screen').val(),
                  }
                )}>
                {nameModal} Page
              </button>  
              }
						  
						</form>

          </div>
        </div>
      </div>
    </div>
	);
}

const CreateEditUser = ({nameModal, addNewUser}) => {

	return(
		<div className="modal fade" id="modal-adduser" tabIndex="-1" role="dialog" 
	        aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header alert-danger">
            <h5 
            	className="modal-title" 
            	id="exampleModalLongTitle">
            	{nameModal}
          	</h5>
            <button 
            	type="button" className="close" 
            	data-dismiss="modal" aria-label="Close">
            		<span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
          { 
            nameModal === 'Registration' ?

            <form className="form-signin" onSubmit={(e)=>e.preventDefault()}>
						  <div className="form-label-group">
						    <input 
						    	type="email" id="inputEmail" className="form-control" 
						    	placeholder="Email address" required autoFocus/>
						    <label htmlFor="inputEmail">Email address</label>
						  </div>

						  <div className="form-label-group">
						    <input 
						    	type="password" id="inputPassword" className="form-control" 
						    	placeholder="enter Password" required/>
						    <label htmlFor="inputPassword">enter Password</label>
						  </div>

						  <div className="form-label-group">
						    <input 
						    	type="password" id="repeatPassword" 
						    	className="form-control" 
						    	placeholder="repeat Password" required/>
						    <label htmlFor="repeatPassword">repeat Password</label>
						  </div>
              <button
                onClick={()=>{
                  let login = $('#inputEmail').val();
                  let pass = $('#inputPassword').val();
                  let repeat = $('#repeatPassword').val()
                  if(login !== '' && pass !== '' && pass === repeat){
                    addNewUser(login, pass);
                    $('#inputEmail').val('');
                    $('#inputPassword').val('');
                    $('#repeatPassword').val('');
                    $('#modal-adduser').modal('hide');
                  }else alert('complete all fields')
                }} 
                className="btn btn-info btn-block" type="button"> 
                {nameModal}
              </button>
            </form>
              :
            <form 
              className="form-signin needs-validation" 
              noValidate onSubmit={(ev)=>ev.preventDefault()}>
              <div className="form-label-group">
                <input 
                  type="password" id="inputOldPass" className="form-control" 
                  placeholder="enter Old Password" required autoFocus/>
                <label htmlFor="inputOldPass">enter Old Password</label>
              </div>

              <div className="form-label-group">
                <input 
                  type="password" id="inputNewPass" className="form-control" 
                  placeholder="enter New Password" required/>
                <label htmlFor="inputNewPass">enter New Password</label>
              </div>

              <div className="form-label-group">
                <input 
                  type="password" id="repeatNewPass" 
                  className="form-control" 
                  placeholder="repeat New Password" required/>
                <label htmlFor="repeatNewPass">repeat New Password</label>
              </div>
						  <button 
						  	className="btn btn-info btn-block" type="submit"> 
            		{/*data-dismiss="modal" aria-label="Close"*/}
						  	{nameModal}
						  </button>
						</form>
          } 

          </div>
        </div>
      </div>
    </div>
	);
}


export {AlertMessage, SuccessMessage, EditPageModal, CreateEditUser};