import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import http from "http";
import { v4 } from "uuid";

const app = express();

app.use(cors());
app.use(express.json());

const serverHttp = http.createServer(app);

const users: {
  username: string;
  name: string;
  id: string;
  todos: any[];
}[] = [];

function checksExistsUserAccount(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { username } = request.headers;

  const user = users.find((userp) => userp.username === username);

  if (!user) {
    return response.status(400).json({ error: "User not found." });
  }

  request.user = user;

  return next();
}

app.post("/users", (request: Request, response: Response) => {
  const { username, name } = request.body;
  const usersAlredyExists = users.find((user) => user.username === username); //verifica se existem 'username's existentes;

  if (usersAlredyExists) {
    return response.status(400).json({ error: "User alredy exists!" });
  }

  users.push({
    id: v4(),
    name,
    username,
    todos: [],
  });

  return response.status(201);
});

app.get(
  "/todos",
  checksExistsUserAccount,
  (request: Request, response: Response) => {
    const { user } = request;
    return response.json(user.todos);
  }
);

app.post(
  "/todos",
  checksExistsUserAccount,
  (request: Request, response: Response) => {
    const { title, deadline } = request.body;
    const { user } = request;

    const insertTodo = {
      id: v4(),
      title,
      done: false,
      deadline: new Date(deadline),
      created_at: new Date(),
    };

    user.todos.push(insertTodo);

    return response.status(201);
  }
);

app.put(
  "/todos/:id",
  checksExistsUserAccount,
  (request: Request, response: Response) => {
    const { title, deadline } = request.body;
    const { user } = request;
    const { id } = request.params;

    if (user.todos.id === id) {
      user.todos.title = title;
      user.todos.deadline = deadline;
    }

    return response.status(201);
  }
);

app.patch(
  "/todos/:id/done",
  checksExistsUserAccount,
  (request: Request, response: Response) => {
    const { user } = request;
    const { id } = request.params;

    const todo = user.todos.id === id;

    if (!todo) {
      return response.status(404).json({ error: "Todo not found" });
    }
    return response.status(201);
  }
);

app.delete(
  "/todos/:id",
  checksExistsUserAccount,
  (request: Request, response: Response) => {
    const { user } = request;
    const { id } = request.params;

    users.splice(user, 1);

    return response.status(204).json(users);
  }
);

app.listen(3333);

export default { serverHttp, app };
