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
    console.log("The data is",data);
    const response =await fetch('http://localhost:5000/jobs/create',
    {
        method: "POST",
        headers: {
            'Content-Type': 'application/json' // ✅ This is important!
        },
        body: JSON.stringify(data)
    }
    );
    console.log(response);
}
module.exports ={
    getAllResume,
    Add_Jobs_Description
}
