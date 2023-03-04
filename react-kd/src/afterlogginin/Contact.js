import React from "react";
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

          {/* first name and second name */}
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">First and last name</span>
            </div>
            <input type="text" aria-label="First name" class="form-control"/>
            <input type="text" aria-label="Last name" class="form-control"/>
          </div> <br/>
          {/* username input */}
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">@</span>
            </div>
            <input type="text" class="form-control" placeholder="@email" aria-label="@email" aria-describedby="basic-addon1"/>
          </div>
        {/* text area */}
                  <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">With textarea</span>
          </div>
          <textarea class="form-control" aria-label="With textarea"></textarea>
        </div> <br/>
        <button type="button" class="btn btn-primary btn-lg btn-block">Submit</button>
        </section>
      </div>
      </>
    
  );
};

export default Contact;
