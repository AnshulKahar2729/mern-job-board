import mongoose, { Schema, model } from "mongoose";
import { type } from "os";



const jobSchema = new Schema({
    jobTitle : {type : String, require : true},
    jobDescription : {type : String, require : true},
    jobRole : {type : String, require : true},
    jobLocation : {type : String, require : true},
    jobCompany : {type : String, require : true},
    jobType : {type : String, require : true},  // either Remote or Onsite
    jobMinExperience : {type : Number, require : true},
    jobMaxExperience : {type : Number, require : true},
    jobMinSalary : {type : Number, require : true},
    jobMaxSalary : {type : Number, require : true},
    jobPosted : {type : String, require : true},
    jobOpenings : {type : Number, require : true},
    jobSkills : {type : [String], require : true},
  });
  
const Job = mongoose.model("Job", jobSchema);
  
export default Job;