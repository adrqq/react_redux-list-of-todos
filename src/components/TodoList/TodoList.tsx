/* eslint-disable max-len */
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Status } from '../../types/Status';
import { actions as currentTodoAction } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(state => state.todos);
  const filter = useAppSelector(state => state.filter);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const visiableTodos = useMemo(() => {
    switch (filter.status) {
      case Status.ALL:
        return todos.filter(todo => todo.title.includes(filter.query));
      case Status.ACTIVE:
        return todos.filter(todo => !todo.completed).filter(todo => todo.title.includes(filter.query));
      case Status.COMPLETED:
        return todos.filter(todo => todo.completed).filter(todo => todo.title.includes(filter.query));
      default:
        return todos;
    }
  }, [todos, filter.status, filter.query]);

  if (visiableTodos.length === 0) {
    return (
      <p className="notification is-warning">
        There are no todos matching current filter criteria
      </p>
    );
  }

  return (
    <>
      <table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>#</th>

            <th>
              <span className="icon">
                <i className="fas fa-check" />
              </span>
            </th>

            <th>Title</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {visiableTodos.map(todo => (
            <tr data-cy="todo">
              <td className="is-vcentered">{todo.id}</td>
              {todo.completed ? (
                <td className="is-vcentered">
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check" />
                  </span>
                </td>
              ) : (
                <td className="is-vcentered"> </td>
              )}

              <td className="is-vcentered is-expanded">
                <p className={todo.completed ? 'has-text-success' : 'has-text-danger'}>{todo.title}</p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => dispatch(currentTodoAction.setTodo(todo))}
                >
                  <span className="icon">
                    <i className={classNames(
                      'far',
                      { 'fa-eye': !currentTodo || todo.id !== currentTodo.id },
                      { 'fa-eye-slash': currentTodo && todo.id === currentTodo.id },
                    )}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
