import cors from "cors";

const corsMiddleware = (app) => {

app.use(
    cors({
     // origin: process.env.FRONTEND_URL || "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowedHeaders: [
        "Content-Type", 
        "Authorization", 
        "X-Requested-With",
        "Accept"
      ],
      credentials: true,
      maxAge: 86400
    })
  );
}

export default corsMiddleware;