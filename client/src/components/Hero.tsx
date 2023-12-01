import axios from "axios";
import { userAtom } from "../store/atoms/user";
import SearchIcon from "./icons/SearchIcon";
import React, {
  useRef,
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
} from "react";
import { redirect, useNavigate } from "react-router-dom";

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

const Hero: React.FC = () => {
  const [skills, setSkills] = useState<string>("");
  const skillsRef = useRef<HTMLInputElement>(null);
  const [experience, setExperience] = useState<number |  undefined>(undefined);
  const [location, setLocation] = useState<string>("");
  const locationRef = useRef<HTMLInputElement>(null);
  const [skillsArray, setSkillsArray] = useState<string[]>([]);
  const [locationArray, setLocationArray] = useState<string[]>([]);
  const [expArray, setExpArray] = useState<number[]>([]);
  const [showSkillSuggestion, setShowSkillSuggestion] =
    useState<boolean>(false);
  const [showLocationSuggestion, setShowLocationSuggestion] =
    useState<boolean>(false);
  const [showExpSuggestion, setShowExpSuggestion] = useState<boolean>(false);

  const navigate = useNavigate();

  const makeSuggestion = (value: string, dataArray: string[]): string[] => {
    const suggestions = dataArray.filter((suggestion, index) => {
      const lowerCaseSuggestion = suggestion.toLowerCase();
      console.log(lowerCaseSuggestion.includes(value), index);
      return lowerCaseSuggestion.includes(value);
    });

    const sortedSuggestions = suggestions.sort((a, b) => {
      const aIndex = a.toLowerCase().indexOf(value);
      const bIndex = b.toLowerCase().indexOf(value);

      if (aIndex === -1 && bIndex === -1) {
        return 0;
      } else if (aIndex === -1) {
        return 1;
      } else if (bIndex === -1) {
        return -1;
      } else {
        return aIndex - bIndex;
      }
    });

    return sortedSuggestions;
  };

  const onSkillsChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSkills(event.target.value);
    const value = event.target.value.toLowerCase();

    const skillsSuggestion = makeSuggestion(value, skillsArray);

    console.log(skillsSuggestion);

    setSkillsArray(skillsSuggestion);
  };

  const onLocationChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
    const value = event.target.value.toLowerCase();

    const locationSuggestion = makeSuggestion(value, locationArray);

    console.log(locationSuggestion);
    setLocationArray(locationSuggestion);
  };

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(skills, experience, location);
    navigate(`/jobs?skills=${skills}&experience=${experience}&location=${location}`);
  };

  useEffect(() => {
    const getJobs = async () => {
      const { data } = await axios.get("http://localhost:4000/api/jobs");
      const jobsArray : [JobType] = data;
      console.log(jobsArray);

      const skillsArrWithDup : string[] = jobsArray.map((job: JobType) => job.jobSkills).flat()
      const skillsArrWithoutDup : string[] = skillsArrWithDup.filter((skill, index, self) => {
        return index === self.indexOf(skill);
      })
      const sortedSkillsArrWithoutDup : string[] = skillsArrWithoutDup.sort();

      const titleArrWithDup : string[] = jobsArray.map((job: JobType) => job.jobTitle)
      const titleArrWithoutDup : string[] = titleArrWithDup.filter((title, index, self) => {
        return index === self.indexOf(title);
      })
      const sortedTitleArrWithoutDup : string[] = titleArrWithoutDup.sort();

      const skillsAndTitleArrWithDup : string[] = sortedSkillsArrWithoutDup.concat(sortedTitleArrWithoutDup);
      setSkillsArray(skillsAndTitleArrWithDup);

      const locationArrWithDup : string[] = jobsArray.map((job: JobType) => job.jobLocation)
      const locationArrWithoutDup : string[] = locationArrWithDup.filter((location, index, self) => {
        return index === self.indexOf(location);
      })
      const sortedLocationArrWithoutDup : string[] = locationArrWithoutDup.sort();
      setLocationArray(sortedLocationArrWithoutDup);

      const minExpArr : number[] = jobsArray.map((job: JobType) => job.jobMinExperience);
      const maxExpArr : number[] = jobsArray.map((job: JobType) => job.jobMaxExperience);

      const expArrayWithDup : number[] = minExpArr.concat(maxExpArr);
      const expArrayWithoutDup : number[] = expArrayWithDup.filter((exp, index, self) => {
        return index === self.indexOf(exp);
      })
      const sortedExpArrWithoutDup : number[] = expArrayWithoutDup.sort((a, b) => a - b);
      

      setExpArray(sortedExpArrWithoutDup);
    };

    getJobs();
  }, []);

  return (
    <div className=" px-[12.5%] pt-20">
      <h1 className=" text-center text-4xl font-bold mb-4">
        Get your dream jobs at JobLelo
      </h1>
      <p className="text-center font-medium mb-10">
        5 lakh+ jobs for you to explore
      </p>

      <form
        onSubmit={submitHandler}
        className="  w-[75%] bg-white mx-auto rounded-full flex items-center shadow-lg"
      >
        <div className=" py-5 px-2 w-full flex text-lg">
          <SearchIcon />
          <div className=" w-full ml-2">
            <input
              ref={skillsRef}
              onChange={onSkillsChangeHandler}
              value={skills}
              type="text"
              onFocus={() => {
                console.log("focus");
                setShowSkillSuggestion(true);
              }}
              onBlur={() => {
                console.log("blur");
                setTimeout(() => {
                  console.log(" blur timeout");
                  setShowSkillSuggestion(false);
                }, 250);
              }}
              className=" h-full pr-20 text-lg placeholder: font-normal focus:outline-none "
              placeholder="Enter skills / designations"
            />
          </div>
          <div className=" w-full ml-2">
            <input
              value={experience}
              type="text"
              onFocus={() => {
                setShowExpSuggestion(true);
              }}
              onBlur={() => {
                // Delay hiding the suggestions container to allow time for onClick event
                setTimeout(() => {
                  setShowExpSuggestion(false);
                }, 250); // You can adjust the delay as needed
              }}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setExperience(Number(event.target.value));
              }}
              className=" h-full w-full text-lg placeholder: font-normal focus:outline-none "
              placeholder="Select experience"
            />
          </div>
          <div className=" w-full ml-2">
            <input
              ref={locationRef}
              value={location}
              onChange={onLocationChangeHandler}
              type="text"
              onFocus={() => {
                setShowLocationSuggestion(true);
              }}
              onBlur={() => {
                setTimeout(() => {
                  setShowLocationSuggestion(false);
                }, 250);
              }}
              className=" h-full w-full text-lg placeholder: font-normal focus:outline-none "
              placeholder="Enter location"
            />
          </div>

          <div className=" mr-2">
            <button
              type="submit"
              className=" bg-[#2563EB] px-7 py-1 rounded-full text-white"
            >
              Search
            </button>
          </div>
        </div>
      </form>

      {skills !== "" && showSkillSuggestion && (
        <div className=" font-medium flex flex-col bg-white text-black rounded-xl absolute top-[360px] left-[370px] w-[280px] h-auto max-h-[248px] overflow-y-auto suggestions-container ">
          {skillsArray.map((skill, index) => (
            <div
              key={index}
              onClick={() => {
                console.log("clicked");
                setSkills(`${skill}`);
                setTimeout(() => {
                  skillsRef.current?.focus();
                  setSkillsArray(skillsArray);
                }, 250);
              }}
              className={` ${index === 0 ? "pt-2" : ""} ${
                index === skillsArray.length - 1 ? "pb-2" : ""
              } w-full cursor-pointer pl-3 py-1 hover:bg-gray-100 hover:pl-3 hover:mr-0`}
            >
              {skill}
            </div>
          ))}
        </div>
      )}

      {showExpSuggestion && (
        <div className=" font-medium flex flex-col bg-white text-black rounded-xl absolute top-[360px] right-[660px] w-[200px] h-auto max-h-[248px] overflow-y-auto suggestions-container">
          {expArray.map((exp, index) => (
            <div
              key={index}
              onClick={() => {
                console.log(exp);
                setExperience(Number(exp));
              }}
              className={` ${index === 0 ? "pt-2" : ""} ${
                index === expArray.length - 1 ? "pb-2" : ""
              } w-full cursor-pointer pl-3 py-1 hover:bg-gray-100 hover:pl-3 hover:mr-0`}
            >
              {exp}
            </div>
          ))}
        </div>
      )}

      {location !== "" && showLocationSuggestion && (
        <div className=" font-medium flex flex-col bg-white text-black rounded-xl absolute top-[360px] right-[370px] w-[280px] h-auto max-h-[248px] overflow-y-auto suggestions-container">
          {locationArray.map((location, index) => (
            <div
              key={index}
              onClick={() => {
                setLocation(location);
                setTimeout(() => {
                  locationRef.current?.focus();
                  setLocationArray(locationArray);
                }, 250);
              }}
              className={` ${index === 0 ? "pt-2" : ""} ${
                index === locationArray.length - 1 ? "pb-2" : ""
              } w-full cursor-pointer pl-3 py-1 hover:bg-gray-100 hover:pl-3 hover:mr-0`}
            >
              {location}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Hero;
