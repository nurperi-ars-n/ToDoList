import {ADD_TODO,DELETE_TODO,EDIT_TODO,TOGGLE_TODO,SET_FILTER,ALL} from "../actions";

const initialState = {
    todos:[],
    filter:ALL,
    nextTodoId: 0,
    }

    const toSave = (obj) => {
        localStorage.setItem('state', JSON.stringify(obj))
    }
    const localData= JSON.parse(localStorage.getItem('state'));

export const rootReducer = (
    state=localData ? localData : initialState,action ) => {

  switch(action.type) {
      case ADD_TODO:
          let obj = {
              ...state,
        todos:[
            ...state.todos,
    {
        id:state.nextTodoId++,
        text:action.text,
        deadline:action.date,
        checked:false
    },
],
    nextTodoId:state.nextTodoId++
    }
    toSave(obj)
    return obj;
    case DELETE_TODO:
        let obj1 = {
            ...state,
            todos:state.todos.filter((el) => el.id !== action.id),
        }
        toSave(obj1)
        return obj1;
        case TOGGLE_TODO:
            let obj2 ={
                ...state,
                todos: state.todos.map((todo,id) => {
                   return todo.id === action.id 
                   ? {...todo,checked : action.value} 
                   : todo
                })
            }
            toSave(obj2)
            return obj2;
            case EDIT_TODO:
                let obj3 = {
                    ...state,
                    todos: state.todos.map((todo,id) => {
                       return todo.id === action.id 
                       ? {...todo,text : action.text} 
                       : todo
                    })
                }
                toSave(obj3)
                return obj3;
        case SET_FILTER:
               let obj4 = {
                    ...state,
                    filter: action.filter
                }
                toSave(obj4)
                return obj4;
     default:
       return state;

    }
}