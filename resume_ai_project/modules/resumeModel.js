const pool = require('../config/db');

const resumeModel = {
  // Save selected resume
  saveSelectedResume: async (resume) => {
    try {
      const query = `
        INSERT INTO selected_resume (candidate_name, email, contact_number, skills, experience, job_id, matching_score)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
      const values = [
        resume.name, // Consistent naming
        resume.email,
        resume.contact_number,
        JSON.stringify(resume.skills),
        resume.experience,
        resume.job_id,
        resume.matching_score,
      ];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      console.error('Error saving resume:', err.message);
      throw new Error('Failed to save resume. Please try again.');
    }
  },

  // Get all resumes
  getAllResumes: async () => {
    try {
      const query = 'SELECT * FROM selected_resume';
      const result = await pool.query(query);
      return result.rows;
    } catch (err) {
      console.error('Error fetching resumes:', err.message);
      throw new Error('Failed to fetch resumes. Please try again.');
    }
  },

  // Get resume by ID
  getResumeById: async (id) => {
    try {
      const query = 'SELECT * FROM selected_resume WHERE id = $1';
      const values = [id];
      const result = await pool.query(query, values);
      if (result.rows.length === 0) {
        throw new Error('Resume not found.');
      }
      return result.rows[0];
    } catch (err) {
      console.error('Error fetching resume by ID:', err.message);
      throw new Error('Failed to fetch resume by ID. Please try again.');
    }
  },

  // Update resume
  updateResume: async (id, resume) => {
    try {
      const query = `
        UPDATE selected_resume
        SET candidate_name = $1, email = $2, contact_number = $3, skills = $4, experience = $5, job_id = $6, matching_score = $7
        WHERE id = $8 RETURNING *`;
      const values = [
        resume.candidate_name,
        resume.email,
        resume.contact_number,
        JSON.stringify(resume.skills),
        resume.experience,
        resume.job_id,
        resume.matching_score,
        id,
      ];
      const result = await pool.query(query, values);
      if (result.rows.length === 0) {
        throw new Error('Resume not found for update.');
      }
      return result.rows[0];
    } catch (err) {
      console.error('Error updating resume:', err.message);
      throw new Error('Failed to update resume. Please try again.');
    }
  },

  // Delete resume
  deleteResume: async (id) => {
    try {
      const query = 'DELETE FROM selected_resume WHERE id = $1 RETURNING *';
      const values = [id];
      const result = await pool.query(query, values);
      if (result.rows.length === 0) {
        throw new Error('Resume not found for deletion.');
      }
      return result.rows[0];
    } catch (err) {
      console.error('Error deleting resume:', err.message);
      throw new Error('Failed to delete resume. Please try again.');
    }
  },
};

module.exports = resumeModel;