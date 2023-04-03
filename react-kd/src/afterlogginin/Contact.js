import React from "react";
import Header from "./Header";

const Contact = () => {
  return (
    <>
      <Header />
      <div className="container ">
        <section id="contact" className="mb-4 m-5">
          <h2 className="h1-responsive font-weight-bold text-center my-4">
            Contact us
          </h2>
          <p className="text-center w-responsive mx-auto mb-5">
            Do you have any questions? Please do not hesitate to contact us
            directly. Our team will come back to you within a matter of hours to
            help you.
          </p>

          {/* first name and second name */}
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">Name and Mobile</span>
            </div>
            <input type="text" aria-label="Name" className="form-control"/>
            <input type="text" aria-label="Mobile" className="form-control"/>
          </div> <br/>
          {/* username input */}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">@</span>
            </div>
            <input type="text" className="form-control" placeholder="@email" aria-label="@email" aria-describedby="basic-addon1"/>
          </div>
        {/* text area */}
                  <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">Message</span>
          </div>
          <textarea className="form-control" aria-label="With textarea"></textarea>
        </div> <br/>
        <button type="button" className="btn btn-primary btn-lg btn-block">Submit</button>
        </section>
      </div>
      </>
    
  );
};

export default Contact;
