const pool = require('../config/db');

const JobModel = {
  
  async createJob(jobTitle, jobDescription, requiredSkills, experience, companyName, jobLocation) {
    try {
      const query = `
        INSERT INTO job_description 
        (job_title, job_description, required_skills, experience_required, company_name, location) 
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
      `;

      const values = [jobTitle, jobDescription, requiredSkills, experience, companyName, jobLocation];

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
  async getJobsWithFilters() {
    try {
      const query = 'SELECT * FROM job_description';
      const result = await pool.query(query);
      return result.rows;
    } catch (err) {
      console.error('Error fetching jobs with filters:', err);
      throw err;
    }
  },

  // Update a job description
  async updateJob(job_id, job_title, job_description, required_skills, experience_required, company_name, location) {
    try {
      const query = `
        UPDATE job_description 
        SET job_title = $2, job_description = $3, required_skills = $4, experience_required = $5, company_name = $6, location = $7 
        WHERE job_id = $1 RETURNING *`;
      const values = [job_id, job_title, job_description, required_skills, experience_required, company_name, location];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      console.error('Error updating job:', err);
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