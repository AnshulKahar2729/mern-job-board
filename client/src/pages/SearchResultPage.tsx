import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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
    <div>
      {/* {skillsParam} {experienceParam} {locationParam} */}
      {jobs.map((job: JobType, index: number) => (
        <div key={index}>
          <h1>Title :  {job.jobTitle}</h1>
          <h2> Company : {job.jobCompany}</h2>
          <h3> Location : {job.jobLocation}</h3>
          <h4> Type :  {job.jobType}</h4>
          <h5> MinExp : {job.jobMinExperience}</h5>
          <h6> MaxExp : {job.jobMaxExperience}</h6>
          <p> JobDescp : {job.jobDescription}</p>
          <p> JobRole : {job.jobRole}</p>
          <p> JobOpenings : {job.jobOpenings}</p>
          <p> JobSkills : {job.jobSkills}</p>
          <p> JobPosted :  {job.jobPosted}</p>
          <p> MinSalary : {job.jobMinSalary}</p>
          <p> MaxSalary : {job.jobMaxSalary}</p>
          <br />
        </div>
        
      ))}
      <h1>Search Result Page</h1>
    </div>
  );
};

export default SearchResultPage;
