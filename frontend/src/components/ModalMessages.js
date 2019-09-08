import React  from 'react';
import $ from "jquery";
import {ERROR_TEXT} from '../constants';

import '../styles/ModalMessages.css';

const AlertMessage = ({textModal}) => {
	return(
		<div className="modal fade" id="modal-alert" tabIndex="-1" role="dialog" 
        aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header alert-danger">
            <h5 className="modal-title" id="exampleModalLongTitle">Alert Message</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="alert">
              <p>{textModal}</p>
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

const SuccessMessage = ({textModal}) => {
	return(
		<div className="modal fade" id="modal-success" tabIndex="-1" role="dialog" 
	        aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header alert-success">
            <h5 className="modal-title" id="exampleModalLongTitle">Success Message</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="alert">
              {textModal}
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

const CreatePageModal = (props) => {

  const { 
    userID,
    countPages,
    categories,
    addNewPage } = props;

  const validateForm = (obj) => {

    // если автозаполнено 0, то присваиваем значение длины pages[]
    if(obj.orderNum === 0) obj.orderNum = countPages;

    // счётчик количества НЕкорректно заполненных полей
    let invalidCount = 0;

    for(var key in obj){

      if(obj[key] === null || obj[key] === ''){
        document.getElementById(key).classList.remove("is-invalid", "is-valid");
        // document.getElementById(key).previousSibling.firstChild
        //   .classList.remove("text-danger", "text-success");
        
        document.getElementById(key).classList.add("is-invalid");
        // document.getElementById(key).previousSibling.firstChild
        //   .classList.add("text-danger");

        invalidCount += 1;
      }
    }
      
    if(invalidCount === 0){
      // clear feilds
      $('#namePage').val(''); 
      $('#linkPage').val(''); 
      $('#ctgrIdPage').val('');
      $('#screenPage').val(''); 
      $('#orderPage').val('');

      console.log(obj)
      //addNewPage(obj);
      $("#modal-createpage").modal("hide"); // закрываем окно
    }
  } 

  let categoriesList = ERROR_TEXT;

  if(categories.length !== 0){
    categoriesList = categories.map((item, index)=>{
        return(
          <option
            key={index}
            className={item.catClass}
            value={item._id}>{item.catName}</option>
        )
    });
  }

  return(
    <div className="modal fade" id="modal-createpage" tabIndex="-1" role="dialog" 
          aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header alert-success">
            <h5 
              className="modal-title" 
              id="exampleModalLongTitle">
              Creating new Page
            </h5>
            <button 
              type="button" className="close" 
              data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">

            <form className="form-signin" onSubmit={(e)=>e.preventDefault()}>

                <label htmlFor="namePage">Name Page</label>
                <input
                  type="text" id="namePage" className="form-control" 
                  placeholder="enter Name Page" 
                  aria-describedby="addPage" />

                <label htmlFor="linkPage">Link Page</label>
                <input
                  type="text" id="linkPage" className="form-control" 
                  placeholder="enter Link Page" 
                  aria-describedby="addPage" />

                <label htmlFor="screenPage">Link Preview Page</label>
                <input
                  type="text" id="screenPage" 
                  className="form-control" 
                  placeholder="enter Link Preview Page" 
                  aria-describedby="addPage" />

                <label htmlFor="ctgrIdPage">Select Cathegorie</label>
                <select
                  id="ctgrIdPage" 
                  className="form-control" 
                  aria-describedby="addPage">
                   {categoriesList}
                </select>

                <label htmlFor="orderPage">Order Page</label>
                <input
                  type="number" id="orderPage" 
                  className="form-control" 
                  placeholder={countPages+1}
                  aria-describedby="addPage" />

              <button 
                id="addPage"
                className="btn btn-info btn-block mt-3" type="button"
                onClick={(ev)=>validateForm(
                  {
                    name: $('#namePage').val(), 
                    link: $('#linkPage').val(), 
                    ctgrId: $('#ctgrIdPage').val(),
                    userId: userID,
                    screen: $('#screenPage').val(),
                    orderNum: Number($('#orderPage').val())
                  }
                )}>
                Create Page
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const EditPageModal = (props) => {

  const { 
    categories, 
    pageDetails, 
    handlerInputsValue,
    updateEditPage } = props;

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

      updateEditPage(obj)
      $("#modal-editpage").modal("hide") // закрываем окно
    }
  } 

	let categoriesList = ERROR_TEXT;
  
	if(categories.length !== 0){
    categoriesList = categories.map((item, index)=>{

      	return(
          <option
            key={index}
            className={item.catClass}
            value={item._id}>{item.catName}</option>
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
            	Editor Page
          	</h5>
            <button 
            	type="button" className="close" 
            	data-dismiss="modal" aria-label="Close">
            		<span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">

            <form className="form-signin" onSubmit={(e)=>e.preventDefault()}>

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
                  value={pageDetails.link} 
                  onChange={(ev) => handlerInputsValue(ev.target.value, ev.target.id)}
						    	type="text" id="link" className="form-control" 
						    	placeholder="enter Link Page"
                  aria-describedby="editPage" />
						    <label htmlFor="link">Link Page</label>
						  </div>

						  <div className="form-label-group">
						    <input
                  value={pageDetails.screen} 
                  onChange={(ev) => handlerInputsValue(ev.target.value, ev.target.id)}
						    	type="text" id="screen" className="form-control" 
						    	placeholder="enter Link Preview Page"
                  aria-describedby="editPage" />
						    <label htmlFor="screen">Link Preview Page</label>
						  </div>

						  <div className="form-label-group">
						  	<select
                  value={pageDetails.ctgrId}
                  onChange={(ev) => handlerInputsValue(ev.target.value, ev.target.id)}
  					    	id="ctgrId" className="form-control"
                  aria-describedby="editPage" >
					         {categoriesList}
				      	</select>
						    <label htmlFor="type">Select Cathegorie</label>
						  </div>

              <div className="form-label-group">
                <input
                  value={pageDetails.orderNum}
                  onChange={(ev) => handlerInputsValue(ev.target.value, ev.target.id)}
                  type="number" id="orderNum" 
                  className="form-control" 
                  placeholder="order page"
                  aria-describedby="editPage" />
                <label htmlFor="orderNum">Order Page</label>
              </div>

						  <button 
                id="editPage"
                className="btn btn-info btn-block" type="button"
                onClick={(ev)=>validateForm(
                  {
                    _id: pageDetails._id,
                    name: pageDetails.name, 
                    link: pageDetails.link, 
                    ctgrId: pageDetails.ctgrId,
                    ctgrClass: pageDetails.ctgrClass,
                    ctgrColor: pageDetails.ctgrColor,
                    ctgrBGC: pageDetails.ctgrBGC,
                    userId: pageDetails.userId,
                    screen: pageDetails.screen,
                    orderNum: Number(pageDetails.orderNum)
                  }
                )}>
                Save Page Changes
              </button>
						</form>
          </div>
        </div>
      </div>
    </div>
	);
}

const CreateUserModal = ({addNewUser}) => {

	return(
		<div className="modal fade" id="modal-adduser" tabIndex="-1" role="dialog" 
	        aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header alert-danger">
            <h5 
            	className="modal-title" 
            	id="exampleModalLongTitle">
            	Registration
          	</h5>
            <button 
            	type="button" className="close" 
            	data-dismiss="modal" aria-label="Close">
            		<span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
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
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
	);
}

const EditUserModal = ({nameModal}) => {

  return(
    <div className="modal fade" id="modal-edituser" tabIndex="-1" role="dialog" 
          aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header alert-danger">
            <h5 
              className="modal-title" 
              id="exampleModalLongTitle">
              Editor User Profile
            </h5>
            <button 
              type="button" className="close" 
              data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
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
                onClick={()=>alert('Soon be')}
                className="btn btn-info btn-block" type="button"> 
                {/*data-dismiss="modal" aria-label="Close"*/}
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


export {
  AlertMessage, 
  SuccessMessage,
  CreatePageModal, 
  EditPageModal, 
  CreateUserModal, 
  EditUserModal
};