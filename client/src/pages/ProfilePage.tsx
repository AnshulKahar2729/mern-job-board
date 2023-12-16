import React from "react";
import UserHeader from "../components/UserHeader";

const ProfilePage = () => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted");
  };

  return (
    <>
      <UserHeader />
      <div className="bg-[#F6F7FA] h-[90vh] p-10 px-[13%]">
        <h1 className=" text-3xl font-bold text-gray-700">Profile Page</h1>
        <div className=" mt-10">
          <form className=" flex flex-col" onSubmit={onSubmit}>
            <div className=" flex flex-row gap-20">
              <div>
                <label
                  htmlFor="fname"
                  className=" block text-xl mb-2 text-gray-700"
                >
                  First Name
                </label>
                <input
                  className="w-96 py-2 px-2 border border-gray-300 rounded-md"
                  type="text"
                  id="fname"
                  placeholder="John"
                />
              </div>

              <div>
                <label
                  htmlFor="lname"
                  className=" block text-xl  mb-2 text-gray-700"
                >
                  Last Name
                </label>
                <input
                  className="w-96 py-2 px-2 border border-gray-300 rounded-md"
                  type="text"
                  id="lname"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className=" mt-3">
              <label
                htmlFor="email"
                className=" text-xl mb-2 block text-gray-700"
              >
                Email
              </label>
              <input
                className="w-96 py-2 px-2 border border-gray-300 rounded-md"
                type="email"
                id="email"
                placeholder="abc@example.com"
              />
            </div>

            <div className=" mt-3">
              {" "}
              <label
                htmlFor="resume"
                className="block text-xl mb-2 text-gray-700"
              >
                Upload Your Resume
              </label>
              <input type="file" id="resume" />
            </div>

            <div className=" flex flex-row gap-10 mt-3">
              <div>
                <label
                  htmlFor="city"
                  className=" block text-xl mb-2 text-gray-700"
                >
                  City
                </label>
                <input
                  className="w-96 py-2 px-2 border border-gray-300 rounded-md"
                  type="text"
                  id="city"
                  placeholder="New York"
                />
              </div>

              <div>
                <label
                  htmlFor="country"
                  className=" block text-xl  mb-2 text-gray-700"
                >
                  Country
                </label>
                <input
                  className="w-96 py-2 px-2 border border-gray-300 rounded-md"
                  type="text"
                  id="country"
                  placeholder="USA"
                />
              </div>
            </div>

            <div className=" mt-5">
              <button
                type="submit"
                className=" bg-[#2563EB] px-3 py-2 text-white rounded-lg"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
