import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { saveWebsite, getWebsite, updateWebsite } from "../firebase/api";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
  url: "",
  name: "",
  description: "",
};
export const WebsiteForm = (props) => {
  const [website, setWebsite] = useState(initialState);
  const params = useParams();
  const navigate = useNavigate();

  const handleInputChange = ({ target: { name, value } }) =>
    setWebsite({ ...website, [name]: value });

/*   const validURL = (str) => {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  }; */

  const handleSubmit = async (e) => {
    e.preventDefault();
    
     if (!website.url || !website.name)
      return toast("Campo vacio", { type: "warning", autoClose: 3000 }); 

    if (!params.id) {
      await saveWebsite(website);
      toast("New Link Added", {
        type: "success",
      });
    } else {
      await updateWebsite(params.id, website);
      toast("Updated", {
        type: "success",
      });
    }

    // Clean Form
    setWebsite(initialState);
    navigate("/list");
  };

  const getLinkById = async (id) => {
    try {
      const doc = await getWebsite(id);
      setWebsite({ ...doc.data() });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (params.id) {
      getLinkById(params.id);
    }
  }, [params.id]);

  return (
    <div className="col-lg-6 offset-lg-3">

      <form onSubmit={handleSubmit} className="card card-body bg-primary">
      <br/>
        <label htmlFor="url">DATO 1</label>
        <div className="input-group mb-3">
       {/*    <div className="input-group-text bg-dark">
            <i className="material-icons">insert_link</i>
          </div> */}
          <input
            type="text"
            className="form-control"
            placeholder="dato 1"
            value={website.url}
            name="url"
            onChange={handleInputChange}
          />
        </div>
        <br/>
        <label htmlFor="name">DATO 2:</label>
        <div className="input-group">
       {/*    <div className="input-group-text bg-dark">
            <i className="material-icons">create</i>
          </div> */}
          <input
            type="text"
            value={website.name}
            name="name"
            placeholder="DATO 2"
            className="form-control mb-3"
            onChange={handleInputChange}
          />
        </div>
        <br/>

        <label htmlFor="description">Descripcion:</label>
        <textarea
          rows="3"
          className="form-control mb-3"
          placeholder="Descripcion"
          name="description"
          value={website.description}
          onChange={handleInputChange}
        ></textarea>
<br/>
        <button
          className="btn btn-secondary"
         /*  disabled={!website.url || !website.name} */
        >
         {/*  {props.currentId === "" ? "Save" : "Update"}  */}
      GUARDAR 
        </button>
        <br/>
      </form>
    </div>
  );
};
