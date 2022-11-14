import { Todo } from '../types/Todo';

type SetTodoAction = {
  type: 'todos/ADD';
  payload: Todo[];
};

const setTodo = (todo: Todo[]): SetTodoAction => ({
  type: 'todos/ADD',
  payload: todo,
});

export const actions = { setTodo };

type State = Todo[];
type Action = SetTodoAction;

const todosReducer = (state: State = [], action: Action): State => {
  switch (action.type) {
    case 'todos/ADD':
      return action.payload;

    default:
      return state;
  }
};

export default todosReducer;
