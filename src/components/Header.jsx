import { NavLink } from "react-router-dom";
import "./../App.css";

// eslint-disable-next-line react/prop-types
function Header({ active, setActive, user, handleLogout }) {
  // eslint-disable-next-line react/prop-types
  const userId = user?.uid;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid bg-faded padding-media">
        <div className="container padding-media">
          <nav className="navbar navbar-toggleable-md navbar-light">
            <button
              className="navbar-toggler mt-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              data-bs-parent="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="true"
              aria-label="Toggle Navigation"
            >
              button
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul
                className="navbar-nav me-auto mb-2 mb-lg-0"
                style={{ display: "flex" }}
              >
                <NavLink to="/" style={{ textDecoration: "none" }}>
                  <li
                    className={`nav-item nav-link ${
                      active === "home" ? "active" : ""
                    }`}
                    onClick={() => setActive("home")}
                  >
                    Главная
                  </li>
                </NavLink>

                {userId && (
                  <NavLink to="/create" style={{ textDecoration: "none" }}>
                    <li
                      className={`nav-item nav-link ${
                        active === "create" ? "active" : ""
                      }`}
                      onClick={() => setActive("create")}
                    >
                      Создать блог
                    </li>
                  </NavLink>
                )}

                <NavLink to="/about" style={{ textDecoration: "none" }}>
                  <li
                    className={`nav-item nav-link ${
                      active === "about" ? "active" : ""
                    }`}
                    onClick={() => setActive("about")}
                  >
                    О блоге
                  </li>
                </NavLink>
              </ul>
              <div className="row g-3">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  {userId ? (
                    <>
                      <div className="profile-logo">
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                          alt="logo"
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            marginTop: "12px",
                          }}
                        />
                      </div>
                      <p style={{ marginTop: "12px", marginLeft: "5px" }}>
                        {user?.displayName}
                      </p>
                      <li className="nav-item nav-link" onClick={handleLogout}>
                        Выход
                      </li>
                    </>
                  ) : (
                    <NavLink to="/auth" style={{ textDecoration: "none" }}>
                      <li
                        className={`nav-item nav-link ${
                          active === "login" ? "active" : ""
                        }`}
                        onClick={() => setActive("login")}
                      >
                        Вход
                      </li>
                    </NavLink>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </nav>
  );
}

export default Header;
