const pool = require('../config/db');

const JobModel = {
  
  async createJob(
    jobTitle,
    jobDescription,
    requiredSkills,
    experience,
    companyName,
    jobLocation,
    jobType,
    applicationDeadline,
    openings,
    maxApplications
  ) {
    try {
      // Convert inputs to proper formats
      const skillsArray = Array.isArray(requiredSkills)
        ? requiredSkills
        : requiredSkills.split(',').map(skill => skill.trim());

      const jobTypeArray = Array.isArray(jobType) ? jobType : [jobType];

      const query = `
        INSERT INTO job_description 
        (job_title, job_description, required_skills, experience_required, company_name, location, job_type, application_deadline, openings, max_applications) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *;
      `;

      const values = [
        jobTitle,
        jobDescription,
        skillsArray,         // text[]
        experience,
        companyName,
        jobLocation,
        jobTypeArray,        // character varying(255)[]
        applicationDeadline,
        openings,
        maxApplications
      ];

      console.log("VALUES TO INSERT:", values);

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      console.error('Error in createJob:', err);
      throw err;
    }
  },

  // Get all job descriptions
  async getJobDescriptions() {
    try {
      const query = 'SELECT * FROM job_description';
      const result = await pool.query(query);
      return result.rows;
    } catch (err) {
      console.error('Error fetching job descriptions:', err);
      throw err;
    }
  },

  // Get jobs with filters (placeholder for future implementation)
  async getJobById(job_id) {
    try {
      const query = 'SELECT * FROM job_description WHERE job_id = $1';
      const result = await pool.query(query, [job_id]);

      if (result.rows.length > 0) {
        const job = result.rows[0];

        // Log the raw value of required_skills
        console.log("Raw required_skills:", job.required_skills);

        // Handle the invalid JSON format (fixing it)
        if (job.required_skills) {
          // Check if required_skills is in the wrong format (e.g., {"HTML","CSS",...})
          if (job.required_skills[0] === '{' && job.required_skills[job.required_skills.length - 1] === '}') {
            // Remove the curly braces and split by comma
            job.required_skills = job.required_skills
              .slice(1, -1) // Remove the surrounding curly braces
              .split(',')  // Split by comma
              .map(item => item.trim().replace(/"/g, ''));  // Clean up extra spaces or quotes
          }
        }

        console.log("Fixed required_skills:", job.required_skills);  // To verify the fix

        return job;
      } else {
        throw new Error('Job not found');
      }
    } catch (err) {
      console.error('Error fetching job by ID:', err);
      throw err;
    }
  },

  // Update a job description
  async updateJob(
    job_id,
    job_title,
    job_description,
    required_skills,
    experience_required,
    company_name,
    location,
    job_type,               // ✅ Changed from jobType
    deadline,               // ✅ Changed from applicationDeadline
    openings,
    max_applications        // ✅ Changed from maxApplications
  ) {
    try {
      console.log("🟡 updateJob() called with:");
      console.log({
        job_id,
        job_title,
        job_description,
        required_skills,
        experience_required,
        company_name,
        location,
        job_type,
        deadline,
        openings,
        max_applications
      });

      if (!Array.isArray(job_type)) {
        console.warn("⚠️ job_type is not an array:", job_type);
        throw new Error("job_type must be an array");
      }

      const query = `
        UPDATE job_description 
        SET 
          job_title = $2,
          job_description = $3,
          required_skills = $4,
          experience_required = $5,
          company_name = $6,
          location = $7,
          job_type = $8,
          application_deadline = $9,
          openings = $10,
          max_applications = $11
        WHERE job_id = $1
        RETURNING *;
      `;

      const values = [
        job_id,
        job_title,
        job_description,
        required_skills,
        experience_required,
        company_name,
        location,
        job_type,
        deadline,
        openings,
        max_applications
      ];

      const result = await pool.query(query, values);

      console.log("🔵 PostgreSQL result.rowCount:", result.rowCount);
      console.log("🔵 PostgreSQL updated row:", result.rows[0]);

      if (result.rowCount === 0) {
        console.warn("⚠️ No job found with this job_id:", job_id);
        return null;
      }

      return result.rows[0];

    } catch (err) {
      console.error('❌ Error updating job in DB:', err.message);
      throw err;
    }
  },

  // Delete a job description
  async deleteJob(job_id) {
    try {
      const query = 'DELETE FROM job_description WHERE job_id = $1 RETURNING *';
      const result = await pool.query(query, [job_id]);
      return result.rows[0];
    } catch (err) {
      console.error('Error deleting job:', err);
      throw err;
    }
  },
};

module.exports = JobModel;