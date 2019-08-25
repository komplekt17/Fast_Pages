
// обработчик текста хедера модального окна
const getNameModalAction = (text) => {
	//console.log('text',text)
  return {
      type: 'GET_NAME_MODAL_ACTION',
      text
  }
};

// обработчик input'ов формы
const handlerInputsValueAction = (value, id) => {
  return {
      type: 'HANDLER_INPUTS_VALUE_ACTION',
      value, id
  }
};

// обработчик статуса логина (залогинен или нет User)
const statusLogInAction = (status) => {
  return {
      type: 'STATUS_LOGIN_ACTION',
      status: status
  }
};

// обработчик для выборки pageDetails
const getEditablePageAction = (id) => {
  return {
      type: 'GET_EDITABLE_PAGE_ACTION',
      idPage: id
  }
};

// обработчик обновления редактируемой page
const updateEditPageAction = (obj) => {
  return {
      type: 'UPDATE_EDIT_PAGE_ACTION',
      obj
  }
};

// обработчик добавления новой page
const addNewPageAction = (obj) => {
  return {
      type: 'ADD_NEW_PAGE_ACTION',
      obj
  }
};

// обработчик обновления редактируемой page
const deletePageAction = (idx) => {
  return {
      type: 'DELETE_PAGE_ACTION',
      idx
  }
};


export {
  handlerInputsValueAction,
  getNameModalAction,
  statusLogInAction,
  getEditablePageAction, 
  updateEditPageAction,
  addNewPageAction,
  deletePageAction
}