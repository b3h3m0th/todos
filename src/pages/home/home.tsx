import { useEffect } from "react";
import "./home.scss";
import { Nav, TodoCard } from "../../components";
import { inject, observer } from "mobx-react";
import { todoStore } from "../../stores";

export const Home: React.FC = inject(todoStore.storeKey)(
  observer(() => {
    useEffect(() => {
      (async () => {
        await todoStore.fetchTodos();
      })();
    }, []);

    return (
      <div className="home">
        <Nav />
        <div className="home__todos">
          {todoStore.todos.map(t => (
            <TodoCard todo={t} key={JSON.stringify(t)} />
          ))}
        </div>
      </div>
    );
  })
);
