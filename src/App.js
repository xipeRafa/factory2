import { WebsiteList } from "./components/WebsiteList";
import { WebsiteForm } from "./components/WebsiteForm";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Layout />}>
          <Route path="/factory2" element={<WebsiteList />} /> 
          <Route path="factory2/add" element={<WebsiteForm />} />
          <Route path="factory2/edit/:id" element={<WebsiteForm />} />
          <Route path="*"  element={<Navigate to="/factory2" />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
