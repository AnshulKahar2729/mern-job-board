import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UserHeader from "../components/UserHeader";
import { userAtom } from "../store/atoms/user";
import { useRecoilState } from "recoil";
import IndexHeader from "../components/indexHeader";
import { createPortal } from "react-dom";
import OverlayModal from "../components/Overlay/OverlayModal";
import Login from "../Login";
import Signup from "../Signup";

interface JobType {
  jobTitle: string;
  jobDescription: string;
  jobRole: string;
  jobLocation: string;
  jobCompany: string;
  jobType: string;
  jobMinExperience: number;
  jobMaxExperience: number;
  jobMinSalary: number;
  jobMaxSalary: number;
  jobPosted: string;
  jobOpenings: number;
  jobSkills: [string];
}

const SearchResultPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [user, setUser] = useRecoilState(userAtom);

  const skillsParam = queryParams.get("skills");
  const experienceParam = Number(queryParams.get("experience"));
  const locationParam = queryParams.get("location");

  const [showModal, setShowModal] = useState<boolean>(false);
  const [loginModal, setLoginModal] = useState<boolean>(false);

  useEffect(() => {
    const getJobs = async () => {
      const { data } = await axios.get("http://localhost:4000/api/jobs");
      const jobsArray = data;
      jobsArray.map((job: JobType, index: number) => {
        if (skillsParam && experienceParam && locationParam) {
          if (
            (job.jobTitle.includes(skillsParam) ||
              job.jobDescription.includes(skillsParam) ||
              job.jobRole.includes(skillsParam) ||
              job.jobSkills.includes(skillsParam)) &&
            experienceParam >= job.jobMinExperience &&
            experienceParam <= job.jobMaxExperience &&
            job.jobLocation === locationParam
          ) {
            setJobs((prevJobs) => [...prevJobs, job]);
          }
        }
      });

      console.log(jobsArray);
    };

    getJobs();
  }, []);

  return (
    <div className=" bg-[#F6F7FA] ">
      {user.email ? (
        <UserHeader />
      ) : (
        <IndexHeader
          onSignUpClick={() => {
            setLoginModal(false);
            setShowModal(!showModal);
          }}
          onLoginClick={() => {
            setLoginModal(true);
            setShowModal(!showModal);
          }}
        />
      )}

      {showModal &&
        createPortal(
          <OverlayModal onClose={() => setShowModal(!showModal)}>
            {loginModal ? (
              <Login
                closeModal={() => {
                  setShowModal(!showModal);
                }}
              />
            ) : (
              <Signup
                closeModal={() => {
                  setShowModal(!showModal);
                }}
              />
            )}
          </OverlayModal>,
          document.getElementById("modal")!
        )}
    </div>
  );
};

export default SearchResultPage;
