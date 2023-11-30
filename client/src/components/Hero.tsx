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

const backendSkillArray = [
  "JavaScript",
  "React",
  "Node.js",
  "Express",
  "HTML",
  "CSS",
  "MongoDB",
  "SQL",
  "Git",
  "TypeScript",
  "Redux",
  "Vue.js",
  "Angular",
  "Python",
  "Django",
  "Flask",
  "Java",
  "Spring Boot",
  "C#",
  ".NET",
  "PHP",
  "Laravel",
  "Ruby",
  "Ruby on Rails",
  "GraphQL",
  "RESTful API",
  "Responsive Design",
  "Webpack",
  "Jest",
  "Testing Library",
];

const backendLocationArray = [
  "Ahmedabad",
  "Ajmer",
  "Allahabad",
  "Amritsar",
  "Aurangabad",
  "Bareilly",
  "Belgaum",
  "Bhavnagar",
  "Bhopal",
  "Bhubaneswar",
  "Calcutta",
  "Chandigarh",
  "Coimbatore",
  "Cuttack",
  "Davangere",
  "Dharwad",
  "Durgapur",
  "Ernakulam",
  "Faridabad",
  "Ghaziabad",
  "New York City",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Phoenix",
  "Philadelphia",
  "San Antonio",
  "San Diego",
  "Dallas",
  "San Jose",
  "Austin",
  "Jacksonville",
  "Columbus",
  "Fort Worth",
  "Charlotte",
  "Detroit",
  "Indianapolis",
  "San Francisco",
  "Seattle",
  "Denver",
  "Portland",
  "Milwaukee",
  "Boston",
  "Washington, D.C.",
  "Memphis",
  "Louisville",
  "Baltimore",
  "Raleigh",
  "Las Vegas",
  "Oklahoma City",
  "Tucson",
  "Albuquerque",
  "Long Beach",
  "Atlanta",
  "Minneapolis",
  "Miami",
  "Cleveland",
  "Kansas City",
  "Omaha",
  "Tulsa",
  "Wichita",
  "Nashville",
  "New Orleans",
  "El Paso",
  "Colorado Springs",
  "St. Louis",
  "Sacramento",
  "Oakland",
];

const backendExpArray = [
  "1 year",
  "2 years",
  "3 years",
  "4 years",
  "5 years",
  "6 years",
  "7 years",
  "8 years",
  "9 years",
  "10 years",
  "11 years",
  "12 years",
  "13 years",
  "14 years",
  "15 years",
  "16 years",
  "17 years",
  "18 years",
  "19 years",
  "20 years",
  "21 years",
  "22 years",
  "23 years",
  "24 years",
  "25 years",
  "26 years",
  "27 years",
  "28 years",
  "29 years",
  "30 years",
];
const Hero: React.FC = () => {
  const [skills, setSkills] = useState<string>("");
  const skillsRef = useRef<HTMLInputElement>(null);
  const [experience, setExperience] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const locationRef = useRef<HTMLInputElement>(null);
  const [skillsArray, setSkillsArray] = useState<string[]>([]);
  const [locationArray, setLocationArray] = useState<string[]>([]);
  const [expArray, setExpArray] = useState<string[]>([]);
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

    const skillsSuggestion = makeSuggestion(value, backendSkillArray);

    console.log(skillsSuggestion);

    setSkillsArray(skillsSuggestion);
  };

  const onLocationChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
    const value = event.target.value.toLowerCase();

    const locationSuggestion = makeSuggestion(value, backendLocationArray);

    console.log(locationSuggestion);
    setLocationArray(locationSuggestion);
  };

  const submitHandler = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const exp : string = experience.split(" ")[0];
    navigate(`/jobs?skills=${skills}&experience=${exp}&location=${location}`);
  };

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
                setExperience(event.target.value);
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
                  setSkillsArray(backendSkillArray);
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
          {backendExpArray.map((exp, index) => (
            <div
              key={index}
              onClick={() => {
                console.log(exp);
                setExperience(exp);
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
                  setLocationArray(backendLocationArray);
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
