import "./config/env.config.js";
import httpServer from "./app.js";
import { ENVS } from "./config/env.config.js";



const PORT = ENVS.PORT || 8000;

const startServer = async () => {
	httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer().catch((e) => {
	console.error("Failed to start server:", e);
	process.exit(1);
});
