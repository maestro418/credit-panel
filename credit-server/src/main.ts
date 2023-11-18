import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Server, Socket } from "socket.io";

// External Modules
import { Routes } from "./Routes";
import config from "../config.json";
import setlog from "./utils/setlog";

// Get router
const router: express.Router = express.Router();
const app: express.Express = express();

const connectDatabase = async (mongoUrl: string) => {
	try {
		const options = {
			autoCreate: true,
			keepAlive: true,
			retryReads: true,
		} as mongoose.ConnectOptions;
		mongoose.set("strictQuery", true);
		const result = await mongoose.connect(mongoUrl, options);
		if (result) {
			setlog("MongoDB connected");
		}
	} catch (err) {
		setlog("ConnectDatabase", err);
	}
};

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", methods: ["POST", "GET"] }));
// app.use(limiter)
app.use(express.json());

// Frontend Render
// if (!config.debug) {
// 	app.use(express.static(__dirname + "/build"));
// 	app.get("/*", function (req, res) {
// 		res.sendFile(__dirname + "/build/index.html", function (err) {
// 			if (err) {
// 				res.status(500).send(err);
// 			}
// 		});
// 	});
// }

// API Router
Routes(router);
app.use("/api", router);

connectDatabase(config.DATABASE).then(() => {
	const serverApp = app.listen(config.PORT, () => {
		setlog(`Server listening on ${config.PORT} port`);
	});
	//socket.io
	const io = new Server(serverApp, {
		cors: { origin: "*", methods: ["GET", "POST"] },
	});

	io.on("connection", async (socket: Socket) => {
		console.log("connection")
		socket.on("join", (data: any) => {
			socket.join(data.username);
			console.log(data.username, 'joined')
		})
		socket.on("select", (data: any) => {
			const username = data.username;
			console.log(`${username} is selected as ${data.option} page`);
			io.to(username).emit('selected', {
				username: data.username,
				option: data.option
			})
		})
	});

	setlog(`Socket Server listening on ${config.PORT} port`);
}).catch((err: any) => {
	setlog(err);
});

export default app;