export const initialStore=()=>{
  return{
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      },
    ],
      
    contacts: [],
      
    imgPerson: "https://wallpapers.com/images/hd/placeholder-profile-icon-8qmjk1094ijhbem9.jpg",
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
 
    case 'load_contacts':
      return {
        ...store,
        contacts: action.payload || []
      };

    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    default:
      return store;
  }    
}
