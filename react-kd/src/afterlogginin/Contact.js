import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

const Contact = () => {
  return (
    <>
      <Header />
      <div className="container ">
        <section className="mb-4 m-5">
          <h2 className="h1-responsive font-weight-bold text-center my-4">
            Contact us
          </h2>
          <p className="text-center w-responsive mx-auto mb-5">
            Do you have any questions? Please do not hesitate to contact us
            directly. Our team will come back to you within a matter of hours to
            help you.
          </p>

          <div className="row">
            <div className="col-md-9 mb-md-0 mb-5">
              <form>
                <div className="row">
                  <div className="col-md-12">
                    <div className="md-form mb-0">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="md-form mb-0">
                      <input
                        type="text"
                        id="email"
                        name="email"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="md-form mb-0">
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        className="form-control"
                      />
                     
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="md-form">
                      <textarea
                        type="text"
                        id="message"
                        name="message"
                        rows="2"
                        className="form-control md-textarea"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </form>

              <div className="text-center text-md-left">
                <Link className="btn btn-primary" to='/'>Send</Link>
              </div>
            </div>

            <div className="col-md-3 text-center">
              <ul className="list-unstyled mb-0">
                <li>
                  <p>Hyderabad, Himayath Nagar, 500029</p>
                </li>

                <li>
                  <p>+91 955 004 9382</p>
                </li>

                <li>
                  <p>yamakalyan6@.com</p>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
      </>
    
  );
};

export default Contact;
