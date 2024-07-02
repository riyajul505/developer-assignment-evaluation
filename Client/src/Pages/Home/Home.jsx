import React from "react";
import FeatureSec from "./FeatureSec";
import Slider from "./Slider";

const Home = () => {
  return (
    <div>
      <div className="w-full mb-10">
        <Slider />
      </div>
      <h1 className="text-3xl font-bold flex justify-center items-center mt-10 mb-2">
        Features
      </h1>
      <FeatureSec />
      <h1 className="text-3xl font-bold flex justify-center items-center mt-10 mb-2">
        FAQ
      </h1>
      <div className="grid gap-2">
        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="my-accordion-3" defaultChecked />
          <div className="collapse-title text-xl font-medium">
            How do I create a new assignment?
          </div>
          <div className="collapse-content">
            <p>
              To create a new assignment, simply navigate to the "Create
              Assignment" page, where you'll be prompted to fill in details such
              as the assignment title, description, marking criteria, due date,
              and difficulty level. Once complete, click submit, and your
              assignment will be ready for students to access.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-medium">
            Can I delete an assignment I've created?
          </div>
          <div className="collapse-content">
            <p>
              Yes, you can delete assignments you've created. Simply locate the
              assignment on the "Assignments" page, click on the delete button,
              and confirm the action. Please note that only the creator of an
              assignment can delete it.
            </p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-medium">
            How do I submit an assignment?
          </div>
          <div className="collapse-content">
            <p>
              To submit an assignment, navigate to the "Submit Assignment" page,
              where you can upload your completed work. You'll be prompted to
              attach files or provide links, along with any additional notes or
              comments. Once submitted, your assignment will be sent for review
              by the instructor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
