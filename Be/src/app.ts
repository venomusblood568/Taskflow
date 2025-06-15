import express from "express";
import cors from "cors";
import router from "./routes/routes";

const app = express();
app.use(cors())
app.use(express.json());

//taskroutes call here 
app.use("/api/tasks",router)


export default app;