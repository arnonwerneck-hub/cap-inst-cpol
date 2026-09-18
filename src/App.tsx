import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Procedimentos from "./pages/Procedimentos/Procedimentos";
import Calculadora from "./pages/Calculadora/Calculadora";
import Informacoes from "./pages/Informacoes/Informacoes";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <Routes>
            <Route path="/" element={<Procedimentos />} />
            <Route path="/procedimentos" element={<Procedimentos />} />
            <Route path="/calculadora" element={<Calculadora />} />
            <Route path="/informacoes" element={<Informacoes />} />
          </Routes>
        </main>
        <footer className="border-t border-slate-200 py-6 text-center text-xs text-slate-400">
          Base: Nota Técnica de Parametrização — SMS-Rio
        </footer>
      </div>
    </BrowserRouter>
  );
}
