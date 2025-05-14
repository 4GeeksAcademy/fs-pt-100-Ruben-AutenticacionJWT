export const initialStore=()=>{
  return{
    user: JSON.parse(localStorage.getItem('user'))? JSON.parse(localStorage.getItem('user')): null
  }
}
export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'login/register':
      return {
        ...store,
        user: action.payload.user
      }
      case 'get_info':
        return {
          ...store, 
          user: action.payload
        }
      case 'logout':
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        return {
          ...store, 
          user: null
        }
    
    default:
      throw Error('Unknown action.');
  }    
}
