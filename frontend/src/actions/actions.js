import axios from 'axios';

const port = 'http://localhost:5000';

// обработчик текста хедера модального окна
const getNameModalAction = (text) => {
  return {
      type: 'GET_NAME_MODAL_ACTION',
      text
  }
};

// получение юзера по логину
const getDataByUserLoginAction = (login) => {
  return dispatch => {
    dispatch({
      type: "LOAD_REQUESTED_DATA_ACTION"
    });
    axios.get(`${port}/users/${login}`)
      .then(response => {
        dispatch({
          type: "GET_DATA_BY_USER_LOGIN_ACTION",
          result: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_DATA_FAILURE_ACTION",
          error: error
        });
        console.log(error);
      })
  };
};

// добавление нового юзера
const addNewUserAction = (login, pass) => {
  return dispatch => {
    dispatch({
      type: "LOAD_REQUESTED_DATA_ACTION"
    });
    const user = {login: login, pass: pass}
    axios.post(`${port}/users/add`, user)
      .then(response => {
        //console.log(res.data.id);
        dispatch({
          type: "ADD_NEW_USER_ACTION",
          result: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_DATA_FAILURE_ACTION",
          error: error
        });
        console.log(error);
      })
  }
}

// обработчик статуса логина (залогинен или нет User)
const statusLogInAction = (status) => {
  return {
      type: 'STATUS_LOGIN_ACTION',
      status: status
  }
};

// обработчик input'ов формы
const handlerInputsValueAction = (value, nameInput) => {
  return {
      type: 'HANDLER_INPUTS_VALUE_ACTION',
      value, nameInput
  }
};

// обработчик фильтра pages
const handlerFilterAction = (categorie) => {
  return {
      type: 'HANDLER_FILTER_ACTION',
      categorie
  }
};

// получение всех юзеров с сервера
const getAllUsersAction = () => {
  return dispatch => {
    dispatch({
      type: "LOAD_REQUESTED_DATA_ACTION"
    });
    axios.get(`${port}/users/`)
      .then(response => {
        dispatch({
          type: "GET_ALL_USERS_ACTION",
          result: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_DATA_FAILURE_ACTION",
          error: error
        });
        console.log(error);
      })
  };
};

// получение всех pages с сервера по ID user'а
const getAllPagesAction = () => {
  return dispatch => {
    dispatch({
      type: "LOAD_REQUESTED_DATA_ACTION"
    });
    axios.get(`${port}/pages/`)
      .then(response => {
        dispatch({
          type: "GET_ALL_PAGES_ACTION",
          result: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_DATA_FAILURE_ACTION",
          error: error
        });
        console.log(error);
      })
  };
};

// получение всех categories с сервера по ID user'а
const getAllCategoriesAction = () => {
  return dispatch => {
    dispatch({
      type: "LOAD_REQUESTED_DATA_ACTION"
    });
    axios.get(`${port}/categories/`)
      .then(response => {
        dispatch({
          type: "GET_ALL_CATEGORIES_ACTION",
          result: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_DATA_FAILURE_ACTION",
          error: error
        });
        console.log(error);
      })
  };
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
  handlerFilterAction,
  getNameModalAction,
  getAllUsersAction,
  getAllPagesAction,
  getAllCategoriesAction,
  getDataByUserLoginAction,
  statusLogInAction,
  getEditablePageAction, 
  updateEditPageAction,
  addNewUserAction,
  addNewPageAction,
  deletePageAction
}