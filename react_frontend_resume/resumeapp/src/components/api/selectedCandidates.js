// resumeApi.js

async function getAllSelectedResumes() {
  const response = await fetch("http://localhost:5000/resumes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

async function getSelectedResumeById(resumeId) {
  const response = await fetch(`http://localhost:5000/resumes/${resumeId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

async function updateSelectedResume(id, data) {
  try {
    console.log("Updating selected_resume ID:", id);
    console.log("Updated data:", data);

    const response = await fetch(`http://localhost:5000/resumes/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        candidate_name: data.candidate_name,
        email: data.email,
        contact_number: data.contact_number,
        skills: data.skills, // Send as comma-separated string or array depending on backend handling
        experience: data.experience,
        matching_score: data.matching_score,
        job_id: data.job_id,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error("Server error during update:", responseData);
      throw new Error(responseData.error || "Update failed");
    }

    return responseData;
  } catch (err) {
    console.error("updateSelectedResume error:", err.message);
    throw err;
  }
}

async function deleteSelectedResume(id) {
  const response = await fetch(`http://localhost:5000/resumes/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete selected resume");
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  }

  return { success: true };
}

module.exports = {
  getAllSelectedResumes,
  getSelectedResumeById,
  updateSelectedResume,
  deleteSelectedResume,
};