import { useCallback, useEffect } from "react";
import { TodoType } from "../types";
import { notification } from "antd";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { myTodosVar } from "../utils/cache";
import {
  MUTATION_ADD_TODO,
  MUTATION_CHANGE_TODO_STATUS,
  MUTATION_DELETE_TODO,
  QUERY_MY_TODOS,
} from "../utils/queries";

/**
 * React custom hook to management of todo list
 * @returns {object} Todo list and some functions to add, remove and check/uncheck funtionality
 */
export const useTodoList = () => {
  const myTodos = useReactiveVar(myTodosVar);

  const { data: myTodosData, error: myTodosDataError } =
    useQuery(QUERY_MY_TODOS);

  const [addTodoMutation, { data: newTodoData, error: newTodoDataError }] =
    useMutation(MUTATION_ADD_TODO);

  const [deleteTodoMutation] = useMutation(MUTATION_DELETE_TODO);

  const [checkTodoMutation] = useMutation(MUTATION_CHANGE_TODO_STATUS);

  const compareTodo = useCallback((todoA: TodoType, todoB: TodoType) => {
    return +todoA.creationTime < +todoB.creationTime ? -1 : 1;
  }, []);

  /**
   * Add new todo to the todo list
   * @description
   *  - Submits the new todo to the server
   *  - Saves the new todo in the state
   *  - If success,
   *    - Shows a success message
   *  - If fails,
   *    - Shows an error message
   * @param {string} title todo title which should be added
   */
  const addNewTodo = useCallback(
    (title: string) => {
      addTodoMutation({
        variables: {
          title,
        },
      });
    },
    [addTodoMutation]
  );

  /**
   * Remove todo by id from todo list
   * @description
   *  - Removes todo from server and state
   *  - If fails,
   *    - Shows an error message
   * @param {string} id Id of the todo which should be removed
   */
  const removeTodoById = useCallback(
    async (id: string) => {
      try {
        await deleteTodoMutation({
          variables: {
            id,
          },
        });

        myTodosVar(
          myTodosVar()
            .filter((todo) => todo.id !== id)
            .sort(compareTodo)
        );

        notification.success({
          message: "Todo deleted successfully",
          duration: 1,
          placement: "top",
        });
      } catch (error) {
        notification.error({
          message: `Failed to remove todo`,
          placement: "top",
        });
      }
    },
    [deleteTodoMutation, compareTodo]
  );

  /**
   * Change checked status of this todo by id
   * @description
   *  - Sends the todo status in server
   *  - Saves the checked or unchecked todo in the state.
   *  - If fails,
   *    - Shows an error message
   * @param {string} id Id of the todo which should be checked or unchecked
   * @param {boolean} isDone Flag to determine if the todo should be checked or unchecked
   */
  const changeTodoStatus = useCallback(
    async (id: string, isDone: boolean) => {
      try {
        const { data } = await checkTodoMutation({
          variables: {
            id,
            isDone,
          },
        });

        const { todo } = data;

        myTodosVar(
          myTodosVar()
            .map((item) =>
              item.id === todo.id
                ? { ...todo, creationTime: +todo.creationTime }
                : item
            )
            .sort(compareTodo)
        );
      } catch (error) {
        notification.error({
          message: `Failed to update todo status`,
          placement: "top",
        });
      }
    },
    [compareTodo, checkTodoMutation]
  );

  /**
   * Effect to fetch all todo from server
   * @description
   *  - Fetchs all todo from the server
   *  - Sets all todo to the state
   *  - If success,
   *    - Shows a success message
   *  - If error occurs
   *    - Shows fail notification
   */
  useEffect(() => {
    if (myTodosData) {
      const initialTodos = myTodosData?.me?.todos
        .slice()
        .map((item: TodoType) => ({
          ...item,
          creationTime: +item.creationTime,
        }));

      myTodosVar(initialTodos.sort(compareTodo));
    }
  }, [compareTodo, myTodosData]);

  useEffect(() => {
    if (myTodosDataError) {
      notification.error({
        message: `Failed to get todos from server`,
        placement: "top",
      });
    }
  }, [myTodosDataError]);

  useEffect(() => {
    if (newTodoData) {
      const { todo } = newTodoData;

      myTodosVar(
        [...myTodosVar(), { ...todo, creationTime: +todo.creationTime }].sort(
          compareTodo
        )
      );

      notification.success({
        message: "Todo added successfully",
        duration: 1,
        placement: "top",
      });
    }
  }, [newTodoData, compareTodo]);

  useEffect(() => {
    if (newTodoDataError) {
      notification.error({
        message: `Failed to add todo`,
        placement: "top",
      });
    }
  }, [newTodoDataError]);

  return { addNewTodo, myTodos, removeTodoById, changeTodoStatus };
};
