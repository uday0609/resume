const { BodyText } = require("react-bootstrap-icons");

async function getAllResume(params) {
    const response = await fetch('http://localhost:5000/jobs',
        {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        }
    );
    return response.json();
}

async function Add_Jobs_Description(data){
    // console.log("The data is",data);
    const response =await fetch('http://localhost:5000/jobs/create',
    {
        method: "POST",
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data)
    }
    );
    console.log(response);
}

async function getJobById(row) {
    // console.log("The parameter is:",row);
    const response = await fetch(`http://localhost:5000/jobs/${row.job_id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    // console.log("The response is",response);
    return response.json();
}

async function updateJobDescriptions(id, data) {
  try {
    console.log("Sending update request for job ID:", id);
    console.log("Payload being sent:", JSON.stringify(data));

    // Format required_skills as a string with the same format used in DB ({"HTML","CSS",...})
    const requiredSkillsFormatted = `{"${data.required_skills.join('","')}"}`;

    const response = await fetch(`http://localhost:5000/jobs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        required_skills: requiredSkillsFormatted,  // Use the formatted required_skills
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error("Error from server:", responseData);
      throw new Error(responseData.error || "Something went wrong");
    }

    return responseData;
  } catch (err) {
    console.error("updateJobDescriptions error:", err.message);
    throw err;
  }
}

async function deleteJobDescription(id){
    const response = await fetch(`http://localhost:5000/jobs/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.json();
}

module.exports ={
    getAllResume,
    Add_Jobs_Description,
    getJobById,
    updateJobDescriptions,
    deleteJobDescription,
}