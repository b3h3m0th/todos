import { observable, action, makeAutoObservable } from "mobx";
import { ITodo } from "../types";
import { IStore } from "./interfaces";
import axios from "axios";

const todoService = axios.create({
  baseURL: "http://localhost:33058/api"
});

class TodoStore implements IStore {
  public storeKey = "todoStore" as const;

  constructor() {
    makeAutoObservable(this);
  }

  @observable todos: ITodo[] = [];

  @action setTodos(todos: ITodo[]) {
    this.todos = todos;
  }

  async fetchTodos() {
    try {
      const response = await todoService.get("/todos");
      const todos: ITodo[] = response.data;

      this.setTodos(
        todos.reduce((acc, curr) => {
          if (curr.erledigt) return [...acc, curr];
          return [curr, ...acc];
        }, [] as ITodo[])
      );
    } catch (error) {
      console.log(error);
    }
  }

  async addTodo(todo: any) {
    try {
      await todoService.post("/todos", {
        ...todo
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateTodo(id: number, todo: any) {
    try {
      const response = await todoService.put(`/todos/${id}`, {
        id,
        ...todo
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTodo(id: number) {
    try {
      const response = await todoService.delete(`/todos/${id}`);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
}

export const todoStore = new TodoStore();
