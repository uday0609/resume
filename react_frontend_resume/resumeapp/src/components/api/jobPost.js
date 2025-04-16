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

async function updateJobDescriptions(data,id){
    // console.log("Id is:",id);
    const response = await fetch(`http://localhost:5000/jobs/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
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
    deleteJobDescription
}