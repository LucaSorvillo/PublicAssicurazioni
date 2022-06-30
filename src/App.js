// React
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "components/Navbar/Navbar";
import ScrollToTop from "components/other/ScrollToTop";

// Pages
import MainPage from "components/MainPage/MainPage";
import ClienteDetailsPage from "components/ClienteDetailsPage/ClienteDetailsPage";
import WrongPage from "components/WrongPage";

// Styles
import "./App.css";

function App() {
	return (
		<div className="App">
			<Router>
				<Navbar />
				<ScrollToTop />
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/clienti/:id" element={<ClienteDetailsPage />} />
					<Route path="*" element={<WrongPage />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
