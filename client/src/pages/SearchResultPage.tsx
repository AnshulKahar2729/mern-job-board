import React from 'react'
import {useLocation} from "react-router-dom"

const SearchResultPage = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const skillsParam = queryParams.get("skills");
    const experienceParam = queryParams.get("experience");
    const locationParam = queryParams.get("location");

    return (
        <div>
            {skillsParam} {experienceParam} {locationParam}
        <h1>Search Result Page</h1>
        </div>
    )
}

export default SearchResultPage