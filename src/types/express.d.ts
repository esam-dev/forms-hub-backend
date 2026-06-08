declare global {
  namespace Express {
    interface Request {
      user?: { id: string; email: string };
      project?: {
        id: string;
        name: string;
        apiKey: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
      };
    }
  }
}

export {};
