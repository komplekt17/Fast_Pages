import React  from 'react';
import $ from "jquery";
import {
  ERROR_TEXT,
  FEEDBACK_EMAIL,
  FEEDBACK_PASS,
  FEEDBACK_LINK,
  FEEDBACK_TEXT,
  PATTERN_TEXT,
  PATTERN_LINK,
  PATTERN_EMAIL,
  PATTERN_PASS } from '../constants';

import '../styles/ModalMessages.css';

const AlertMessage = ({textModal}) => {
	return(
		<div className="modal fade" id="modal-alert" tabIndex="-1" role="dialog" 
        aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header alert-danger">
            <h5 className="modal-title">Alert Message</h5>
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
            <h5 className="modal-title">Success Message</h5>
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
    isValideField,
    validateForm,
    handlerInputsValue } = props;

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
            <h5 className="modal-title">Creating new Page</h5>
            <button 
              type="button" className="close" 
              data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">

            <form 
              id="addPage" 
              onSubmit={(e)=>e.preventDefault()} 
              className="needs-validation" noValidate >

              <div className="form-label-group">
                <label htmlFor="namePage">Name Page</label>
                <input 
                  onChange={(ev) => {
                    const pattern = PATTERN_TEXT;
                    isValideField(ev.target.id, pattern)
                    handlerInputsValue(ev.target.value, ev.target.id)
                  }}
                  type="text" id="namePage" className="form-control" 
                  placeholder="enter Name Page" 
                  aria-describedby="addPage" />
                  <div className="invalid-feedback">
                    {FEEDBACK_TEXT}
                  </div>
              </div>

              <div className="form-label-group">
                <label htmlFor="linkPage">Link Page</label>
                <input
                  onChange={(ev) => {
                    const pattern = PATTERN_LINK;
                    isValideField(ev.target.id, pattern)
                    handlerInputsValue(ev.target.value, ev.target.id)
                  }}
                  type="text" id="linkPage" className="form-control" 
                  placeholder="enter Link Page" 
                  aria-describedby="addPage" />
                <div className="invalid-feedback">
                  {FEEDBACK_LINK}
                </div>
              </div>

              <div className="form-label-group">
                <label htmlFor="screenPage">Link Preview Page</label>
                <input
                  onChange={(ev) => {
                    const pattern = PATTERN_LINK;
                    isValideField(ev.target.id, pattern)
                    handlerInputsValue(ev.target.value, ev.target.id)
                  }}
                  type="text" id="screenPage" 
                  className="form-control" 
                  placeholder="enter Link Preview Page" 
                  aria-describedby="addPage" />
                <div className="invalid-feedback">
                  {FEEDBACK_LINK}
                </div>
              </div>

              <div className="form-label-group">
                <label htmlFor="ctgrIdPage">Select Cathegorie</label>
                <select
                  id="ctgrIdPage" 
                  className="form-control" 
                  aria-describedby="addPage">
                   {categoriesList}
                </select>
                <div className="invalid-feedback">
                  Please select a page categorie
                </div>
              </div>

              <div className="form-label-group">
                <label htmlFor="orderPage">Order Page</label>
                <input
                  type="number" id="orderPage" 
                  className="form-control" 
                  placeholder={countPages+1}
                  aria-describedby="addPage" />
                <div className="invalid-feedback">
                  Please enter a page Order
                </div>
              </div>

              <button 
                name="addPage"
                className="btn btn-info btn-block mt-3" type="button"
                onClick={(ev)=>{
                  let orderNum = Number($('#orderPage').val());
                  // если автозаполнено 0, 
                  //то присваиваем значение длины pages[]
                  if(orderNum === 0) orderNum = countPages+1;
                  validateForm({
                    namePage: $('#namePage').val(), 
                    linkPage: $('#linkPage').val(), 
                    ctgrIdPage: $('#ctgrIdPage').val(),
                    userId: userID,
                    screenPage: $('#screenPage').val(),
                    orderNum: orderNum
                  }, ev.target.name);
                }}>
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
    isValideField,
    validateForm } = props;

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
		<div 
      className="modal fade" id="modal-editpage" 
      tabIndex="-1" role="dialog"
      aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header alert-success">
            <h5 className="modal-title">Editor Page</h5>
            <button 
            	type="button" className="close" 
            	data-dismiss="modal" aria-label="Close">
            		<span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">

            <form 
              id="editPage"
              onSubmit={(e)=>e.preventDefault()} 
              className="needs-validation" noValidate >

						  <div className="form-label-group">
                <label htmlFor="name">Name Page</label>
						    <input
                  value={pageDetails.name == null ? '' : pageDetails.name} 
                  onChange={(ev) => {
                    const pattern = PATTERN_TEXT;
                    isValideField(ev.target.id, pattern)
                    handlerInputsValue(ev.target.value, ev.target.id)
                  }}
						    	type="text" id="name" className="form-control" 
						    	placeholder="enter Name Page"
                  aria-describedby="editPage" />
                <div className="invalid-feedback">
                  {FEEDBACK_TEXT}
                </div>
						  </div>

						  <div className="form-label-group">
                <label htmlFor="link">Link Page</label>
						    <input
                  value={pageDetails.link == null ? '' : pageDetails.link} 
                  onChange={(ev) => {
                    const pattern = PATTERN_LINK
                    isValideField(ev.target.id, pattern)
                    handlerInputsValue(ev.target.value, ev.target.id)
                  }}
						    	type="text" id="link" className="form-control" 
						    	placeholder="enter Link Page"
                  aria-describedby="editPage" />
                <div className="invalid-feedback">
                  {FEEDBACK_LINK}
                </div>
						  </div>

						  <div className="form-label-group">
                <label htmlFor="screen">Link Preview Page</label>
						    <input
                  value={pageDetails.screen == null ? '' : pageDetails.screen} 
                  onChange={(ev) => {
                    const pattern = PATTERN_LINK
                    isValideField(ev.target.id, pattern)
                    handlerInputsValue(ev.target.value, ev.target.id)
                  }}
						    	type="text" id="screen" className="form-control" 
						    	placeholder="enter Link Preview Page"
                  aria-describedby="editPage" />
                <div className="invalid-feedback">
                  {FEEDBACK_LINK}
                </div>
						  </div>

						  <div className="form-label-group">
                <label htmlFor="type">Select Cathegorie</label>
						  	<select
                  value={pageDetails.ctgrId == null ? '' : pageDetails.ctgrId}
                  onChange={(ev) => handlerInputsValue(ev.target.value, ev.target.id)}
  					    	id="ctgrId" className="form-control"
                  aria-describedby="editPage" >
					         {categoriesList}
				      	</select>
                <div className="invalid-feedback">
                  Please select a page categorie
                </div>
						  </div>

              <div className="form-label-group">
                <label htmlFor="orderNum">Order Page</label>
                <input
                  value={pageDetails.orderNum == null ? '' : pageDetails.orderNum}
                  onChange={(ev) => handlerInputsValue(ev.target.value, ev.target.id)}
                  type="number" id="orderNum" 
                  className="form-control" 
                  placeholder="order page"
                  aria-describedby="editPage" />
                <div className="invalid-feedback">
                  Please enter a page Order
                </div>
              </div>

						  <button
                name="editPage"
                className="btn btn-info btn-block mt-3" type="button"
                onClick={(ev)=>validateForm({
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
                }, ev.target.name)}>
                Save Page Changes
              </button>
						</form>
          </div>
        </div>
      </div>
    </div>
	);
}

const CreateUserModal = (props) => {

  const {
    isValideField,
    validateForm,
    handlerInputsValue } = props;

	return(
		<div className="modal fade" id="modal-adduser" tabIndex="-1" role="dialog" 
	        aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header alert-danger">
            <h5 className="modal-title"> Registration</h5>
            <button 
            	type="button" className="close" 
            	data-dismiss="modal" aria-label="Close">
            		<span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">

            <form 
              id="addUser" 
              className="form-signin needs-validation" 
              noValidate onSubmit={(ev)=>ev.preventDefault()}>

              <div className="form-label-group">
                <label htmlFor="inputEmail">Email address</label>
                <input 
                  onChange={(ev) => {
                    const pattern = PATTERN_EMAIL
                    isValideField(ev.target.id, pattern)
                    handlerInputsValue(ev.target.value, ev.target.id)
                  }}   
                  type="email" id="inputEmail" className="form-control" 
                  placeholder="Email address" required autoFocus/>
                <div className="invalid-feedback">
                  {FEEDBACK_EMAIL}
                </div>
              </div>

              <div className="form-label-group">
                <label htmlFor="inputPassword">enter Password</label>
                <input 
                  onChange={(ev) => {
                    const pattern = PATTERN_PASS
                    isValideField(ev.target.id, pattern)
                    handlerInputsValue(ev.target.value, ev.target.id)
                  }}  
                  type="password" id="inputPassword" className="form-control" 
                  placeholder="enter Password" required/>
                <div className="invalid-feedback">
                  {FEEDBACK_PASS}
                </div>
              </div>

              <div className="form-label-group">
                <label htmlFor="repeatPassword">repeat Password</label>
                <input 
                  onChange={(ev) => {
                    const pattern = PATTERN_PASS
                    isValideField(ev.target.id, pattern)
                    handlerInputsValue(ev.target.value, ev.target.id)
                  }}  
                  type="password" id="repeatPassword" 
                  className="form-control" 
                  placeholder="repeat Password" required/>
                <div className="invalid-feedback">
                  {FEEDBACK_PASS}
                </div>
              </div>

              <button
                name="addUser"
                onClick={(ev)=>{
                  let login = $('#inputEmail').val();
                  let pass = $('#inputPassword').val();
                  let repeat = $('#repeatPassword').val()
                  if(login !== '' && pass !== '' && pass === repeat){
                    const objUser = {
                      inputEmail: login, 
                      inputPassword: pass,
                      repeatPassword: repeat
                    }
                    validateForm(objUser, ev.target.name);
                  }
                }} 
                className="btn btn-info btn-block mt-3" type="button"> 
                Save
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
	);
}

const EditUserModal = (props) => {

  const {
    user,
    handlerInputsValue,
    isValideField,
    validateForm } = props;

  return(
    <div className="modal fade" id="modal-edituser" tabIndex="-1" role="dialog" 
          aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header alert-danger">
            <h5 className="modal-title"> Editor User Profile</h5>
            <button 
              type="button" className="close" 
              data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form 
              id="editUser" 
              className="form-signin needs-validation" 
              noValidate onSubmit={(ev)=>ev.preventDefault()}>

              <div className="form-label-group">
                <label htmlFor="inputOldPass">enter Old Password</label>
                <input 
                  onChange={(ev) => {
                    //const pattern = PATTERN_PASS
                    //isValideField(ev.target.id, pattern)
                    handlerInputsValue(ev.target.value, ev.target.id)
                  }} 
                  type="password" id="inputOldPass" className="form-control" 
                  placeholder="enter Old Password" required autoFocus/>
                <div className="invalid-feedback">
                  {FEEDBACK_PASS}
                </div>
              </div>

              <div className="form-label-group">
                <label htmlFor="inputNewPass">enter New Password</label>
                <input 
                  onChange={(ev) => {
                    const pattern = PATTERN_PASS
                    isValideField(ev.target.id, pattern)
                    handlerInputsValue(ev.target.value, ev.target.id)
                  }}  
                  type="password" id="inputNewPass" className="form-control" 
                  placeholder="enter New Password" required/>
                <div className="invalid-feedback">
                  {FEEDBACK_PASS}
                </div>
              </div>

              <div className="form-label-group">
                <label htmlFor="repeatNewPass">repeat New Password</label>
                <input 
                  onChange={(ev) => {
                    const pattern = PATTERN_PASS
                    isValideField(ev.target.id, pattern)
                    handlerInputsValue(ev.target.value, ev.target.id)
                  }}  
                  type="password" id="repeatNewPass" 
                  className="form-control" 
                  placeholder="repeat New Password" required/>
                <div className="invalid-feedback">
                  {FEEDBACK_PASS}
                </div>
              </div>

              <button 
                name="editUser"
                onClick={(ev)=>{
                  let oldPass = $('#inputOldPass').val();
                  let newPass = $('#inputNewPass').val();
                  let repeat = $('#repeatNewPass').val();
                  if(oldPass !== '' && newPass !== '' && newPass === repeat){
                    const objUser = {
                      _id: user.userID, 
                      inputOldPass: oldPass, 
                      inputNewPass: newPass,
                      repeatNewPass: repeat
                    };
                    validateForm(objUser, ev.target.name);
                  }
                }} 
                className="btn btn-info btn-block mt-3" type="button">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const ResetPasswordModal = (props) =>{

	const {
		validateForm,
		isValideField,
    handlerInputsValue } = props;

	return(
    <div className="modal fade" id="modal-reset" tabIndex="-1" role="dialog" 
          aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header alert-danger">
            <h5 className="modal-title">Reset Password</h5>
            <button 
              type="button" className="close" 
              data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form 
              id="resetPass" 
              className="form-signin needs-validation" 
              noValidate onSubmit={(ev)=>ev.preventDefault()}>

              <div className="form-label-group">
                <label htmlFor="inputLogin">enter your Email</label>
                <input 
                  onChange={(ev) => {
                    const pattern = PATTERN_EMAIL
                    isValideField(ev.target.id, pattern)
                    handlerInputsValue(ev.target.value, ev.target.id)
                  }} 
                  type="text" id="inputLogin" className="form-control" 
                  placeholder="your@mail.ru" required autoFocus/>
                <div className="invalid-feedback">
                  {FEEDBACK_EMAIL}
                </div>
              </div>

              <button 
                name="resetPass"
                onClick={(ev)=>{
                  let inputLogin = $('#inputLogin').val();
                  if(inputLogin !== ''){
                    const objUser = {
                      inputLogin: inputLogin
                    };
                    validateForm(objUser, ev.target.name);
                  }
                }} 
                className="btn btn-info btn-block mt-3" type="button">
                Reset Password
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
  EditUserModal,
  ResetPasswordModal
};