declare namespace Express {
  export interface Request {
    user: { 
      username: string; 
      name: string; 
      id: string; 
      todos: any[];
    } | any;
  }
}
