import { BrowserRouter as Router } from "react-router-dom"
import AppRoute from "./components/AppRoute";
function App() {

	return (
		<>
			<div className="w-screen h-screen">
				<Router>
					<AppRoute />
				</Router>
			</div>
		</>
	)
}

export default App
