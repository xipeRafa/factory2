import { WebsiteList } from "./components/WebsiteList";
import { WebsiteForm } from "./components/WebsiteForm";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout />}>
          <Route path="/list" element={<WebsiteList />} /> 
          <Route path="add" element={<WebsiteForm />} />
          <Route path="edit/:id" element={<WebsiteForm />} />
          <Route path="*"  element={<Navigate to="/add" />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
