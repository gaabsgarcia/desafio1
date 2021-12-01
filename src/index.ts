import express, { Request, Response, NextFunction } from 'express';
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

export const app = express();

app.use(cors());
app.use(express.json());

const users: { username: string; name: string; id: string; todos: any[]; }[] = [];

function checksExistsUserAccount(request: Request, response: Response, next: NextFunction) {
  // Complete aqui
}

app.post('/users', (request: Request, response: Response) => {
  // Complete aqui
});

app.get('/todos', checksExistsUserAccount, (request: Request, response: Response) => {
  // Complete aqui
});

app.post('/todos', checksExistsUserAccount, (request: Request, response: Response) => {
  // Complete aqui
});

app.put('/todos/:id', checksExistsUserAccount, (request: Request, response: Response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request: Request, response: Response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request: Request, response: Response) => {
  // Complete aqui
});

