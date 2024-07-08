import React, { useState } from "react";
import { Link } from "react-router-dom";
import { navList } from "../data/Data";
import { FaGoogle, FaFacebookF, FaTwitter } from "react-icons/fa";

const Header = () => {
  const [navbarCollapse, setNavbarCollapse] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const handleMouseEnter = (itemId) => {
    setActiveDropdown(itemId);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    console.log("Search submitted:", searchQuery);
  };

  const toggleLanguageDropdown = () => {
    setLanguageDropdownOpen(!languageDropdownOpen);
  };

  const handleLanguageChange = (language) => {
    console.log(`Selected language: ${language}`);
    setLanguageDropdownOpen(false);
  };

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
    setShowRegistrationForm(false);
  };

  const showRegistration = () => {
    setShowRegistrationForm(true);
  };

  return (
    <>
      <div className="container-fluid bg-dark px-0">
        <div className="row gx-0">
          <div className="col-lg-3 bg-dark d-none d-lg-block">
            <Link
              to="/"
              className="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center"
            >
              <h1 className="m-0 text-primary text-uppercase">KIURA</h1>
            </Link>
          </div>
          <div className="col-lg-9">
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark p-3 p-lg-0">
              <Link to="/" className="navbar-brand d-block d-lg-none">
                <h1 className="m-0 text-primary text-uppercase">KIURA</h1>
              </Link>
              <button
                type="button"
                className="navbar-toggler"
                onClick={() => setNavbarCollapse(!navbarCollapse)}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className={
                  navbarCollapse
                    ? "navbar-collapse justify-content-around navbarCollapse"
                    : "collapse navbar-collapse justify-content-around"
                }
              >
                <div className="navbar-nav mr-auto py-0">
                  {navList.map((item, index) => (
                    <div key={index}>
                      {item.subItems ? (
                        <div
                          className="nav-item dropdown"
                          onMouseEnter={() => handleMouseEnter(item.id)}
                          onMouseLeave={handleMouseLeave}
                        >
                          <Link
                            className="nav-link dropdown-toggle"
                            to="#"
                            onClick={() => setActiveDropdown(item.id)}
                          >
                            {item.text}
                          </Link>
                          <div
                            className={`dropdown-menu rounded-0 m-0 ${
                              activeDropdown === item.id ? "show" : ""
                            }`}
                          >
                            {item.subItems.map((sub, subIndex) => (
                              <Link
                                key={subIndex}
                                to={sub.path}
                                className="dropdown-item"
                              >
                                {sub.text}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link to={item.path} className="nav-item nav-link">
                          {item.text}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
                <form
                  className="d-flex align-items-center"
                  onSubmit={handleSearchSubmit}
                >
                  <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <button type="submit" className="btn btn-primary">
                    <i className="fa fa-search"></i>
                  </button>
                </form>
                <div className="nav-item dropdown">
                  <button
                    className="btn btn-link nav-link dropdown-toggle"
                    type="button"
                    id="languageDropdown"
                    onClick={toggleLanguageDropdown}
                    aria-expanded={languageDropdownOpen ? "true" : "false"}
                  >
                    Language
                  </button>
                  <ul
                    className={`dropdown-menu ${
                      languageDropdownOpen ? "show" : ""
                    }`}
                    aria-labelledby="languageDropdown"
                  >
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleLanguageChange("English")}
                      >
                        English
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => handleLanguageChange("Georgian")}
                      >
                        Georgian
                      </button>
                    </li>
                    {/* Add more languages as needed */}
                  </ul>
                </div>
                <button className="btn btn-primary" onClick={toggleLoginModal}>
                  Login
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>

      {}
      <div
        className={`modal fade ${showLoginModal ? "show" : ""}`}
        style={{ display: showLoginModal ? "block" : "none" }}
        tabIndex="-1"
        aria-labelledby="loginModalLabel"
        aria-hidden={!showLoginModal}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel">
                {showRegistrationForm ? "Register" : "Login"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={toggleLoginModal}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {showRegistrationForm ? (
                <form className="registration-form">
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Full Name"
                  />
                  <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Email"
                  />
                  <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Password"
                  />
                  <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Confirm Password"
                  />
                  <button className="btn btn-primary w-100">Register</button>
                  <p className="message mt-3 text-center">
                    Already registered?{" "}
                    <a href="#" onClick={() => setShowRegistrationForm(false)}>
                      Sign In
                    </a>
                  </p>
                </form>
              ) : (
                <form className="login-form">
                  <a
                    href="https://accounts.google.com/signin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="login-action btn btn-danger mb-3"
                  >
                    <FaGoogle /> Login with Google
                  </a>
                  <a
                    href="https://www.facebook.com/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="login-action btn btn-primary mb-3"
                  >
                    <FaFacebookF /> Login with Facebook
                  </a>
                  <a
                    href="https://twitter.com/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="login-action btn btn-info mb-3"
                  >
                    <FaTwitter /> Login with Twitter
                  </a>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Username"
                  />
                  <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Password"
                  />
                  <button className="btn btn-primary w-100">Login</button>
                  <p className="message mt-3 text-center">
                    Not registered?{" "}
                    <a href="#" onClick={showRegistration}>
                      Create an account
                    </a>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      {showLoginModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default Header;
