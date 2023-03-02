import { deleteWebsite } from "../firebase/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function WebsiteCard({ link }) {
  const navigate = useNavigate();

  const onDeleteLink = async (id) => {
    if (window.confirm("are you sure you want to delete this link?")) {
      await deleteWebsite(id);
      toast("Link Removed Successfully", {
        type: "error",
        autoClose: 2000,
      });
      window.location.href = window.location.href;
    }
  };

  return (
    <div
      className="card mb-3 card-website"
      key={link.id}
      onClick={() => navigate(`/edit/${link.id}`)}
    >
      <div className="card-body">
        <div className="d-flex justify-content-between">


          <h4>
            {link.name}</h4>
            <br/>
            <br/>


          <button
            className="btn btn-danger btn-sm d-flex align-items-center"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteLink(link.id);
            }}
          >
            <i className="material-icons">close</i>
          </button>


        </div>
        <p>Dato 2: 
        <br/>
          {link.description}</p>
        <p href={link.url} target="_blank" rel="noopener noreferrer">
        Descripcion: <br/>
        {link.url}
        </p>
      </div>
    </div>
  );
}
