// React
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "components/Navbar/Navbar";
import ScrollToTop from "components/other/ScrollToTop";

// Pages
import MainPage from "components/MainPage/MainPage";
import ClientiPage from "components/ClientiPage/ClientiPage";
import PolizzePage from "components/PolizzePage/PolizzePage";
import VeicoliPage from "components/VeicoliPage/VeicoliPage";
import NuovoClientePage from "components/NuovoClientePage/NuovoClientePage";
import RicercaPage from "components/RicercaPage/RicercaPage";
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
					<Route path="/clienti" element={<ClientiPage />} />
					<Route path="/polizze" element={<PolizzePage />} />
					<Route path="/veicoli" element={<VeicoliPage />} />
					<Route path="/nuovo-cliente" element={<NuovoClientePage />} />
					<Route path="/ricerca" element={<RicercaPage />} />
					
					<Route path="/clienti/:idCliente" element={<ClienteDetailsPage />} />
					
					<Route path="*" element={<WrongPage />} />
					
				</Routes>
			</Router>
		</div>
	);
}

export default App;
