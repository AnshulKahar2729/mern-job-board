import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FilterLogic from "../components/filterSection/filterLogic";
import ProfileHeader

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

  const skillsParam = queryParams.get("skills");
  const experienceParam = Number(queryParams.get("experience"));
  const locationParam = queryParams.get("location");

  useEffect(() => {
    const getJobs = async () => {
      const { data } = await axios.get("http://localhost:4000/api/jobs");
      const jobsArray = data;
      jobsArray.map((job: JobType, index: number) => {
        if (skillsParam && experienceParam && locationParam) {
          if (
            job.jobTitle.includes(skillsParam) &&
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
    <>
    <ProfileHeader/>
    </>
  );
};

export default SearchResultPage;
