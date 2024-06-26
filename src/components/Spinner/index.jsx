import "./style.css";

const Spinner = () => {
  return (
    <div className="container-fluid pb-4 pt-4 padding">
      <div className="container padding">
        <div className="row mx-0">
          <div className="loading">Loading&#8230;</div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
