import React from 'react';
import $ from "jquery";
import { Link } from "react-router-dom";
import '../styles/ModalMessages.css';

const AlertMessage = () => {
	return(
		<div className="modal fade" id="modal-alert" tabIndex="-1" role="dialog" 
        aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header alert-danger">
            <h5 className="modal-title" id="exampleModalLongTitle">Warning</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="alert">
              <p>You are going remove tab-page from database.</p>
              Click
              	<Link onClick={()=>alert('deleted')} to="/" className="alert-link">
               {" "}delete
               </Link>, please. 
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
    cathegories, 
    pageDetails, 
    handlerInputsValue,
    updateEditPage } = props;

  const validateForm = (name, obj) => {
    
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

      // обновляем page
      updateEditPage(obj);

      // закрываем окно
      $("#modal-editpage").modal("hide")
    }
  } 

  //id: 0, name: 'N-0', link: link, type: 'banking', user: 'komp', screen: img

	let cathegoriesList;
  
	if(cathegories.length !== 0){
    cathegoriesList = cathegories.map((item, index)=>{
      	return(
	        <option
	        	key={index}
	        	className={item.cathClass}
	        	value={item.cathClass}>{item.cathName}</option>
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
						    	placeholder="enter Name Page" />
						    <label htmlFor="name">Name Page</label>
						  </div>

						  <div className="form-label-group">
						    <input
                  onChange={(ev) => handlerInputsValue(ev.target.value, ev.target.id)}
                  value={pageDetails.link} 
						    	type="text" id="link" className="form-control" 
						    	placeholder="enter Link Page" />
						    <label htmlFor="link">Link Page</label>
						  </div>

						  <div className="form-label-group">
						    <input
                  onChange={(ev) => handlerInputsValue(ev.target.value, ev.target.id)}
                  value={pageDetails.screen} 
						    	type="text" id="screen" 
						    	className="form-control" 
						    	placeholder="enter Link Preview Page" />
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
					         {cathegoriesList}
				      	</select>
						    <label htmlFor="type">Select Cathegorie</label>
						  </div>
						  { nameModal === 'Edit' ?
              <button 
                name="editPage"
                className="btn btn-info btn-block" type="button"
                onClick={(ev)=>validateForm(ev.target.name,
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
                name="addPage"
                className="btn btn-info btn-block" type="button"
                onClick={(ev)=>validateForm(ev.target.name,
                  {
                    name: pageDetails.name, 
                    link: pageDetails.link, 
                    type: pageDetails.type,
                    screen: pageDetails.screen,
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

const AddNewUser = ({nameModal}) => {
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

            <form className="form-signin">
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
                className="btn btn-info btn-block" type="button"> 
                {/*data-dismiss="modal" aria-label="Close"*/}
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


export {AlertMessage, SuccessMessage, EditPageModal, AddNewUser};