const pool = require('../config/db');
const bcrypt = require('bcrypt');

const UserModel = {
  // Register a new user
  async registerUser(username, email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
      const query = `
        INSERT INTO Users (username, email, password) 
        VALUES ($1, $2, $3) 
        RETURNING *`;
      const values = [username, email, hashedPassword];
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  },

  // Login user by email
  async loginUser(email, password) {
    try {
      const query = `
        SELECT * FROM Users
        WHERE email = $1`;
      const result = await pool.query(query, [email]);
      const user = result.rows[0];

      if (user && await bcrypt.compare(password, user.password)) {
        return user; // Returns user details if password matches
      } else {
        return null; // Returns null if user not found or password doesn't match
      }
    } catch (error) {
      console.error('Error logging in user:', error);
      throw error;
    }
  },

  // Fetch all users
  async getAllUsers() {
    try {
      const query = `
        SELECT * FROM Users`;
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw error;
    }
  },

  // Fetch a specific user by ID
  async getUserById(user_id) {
    try {
      const query = `
        SELECT * FROM Users 
        WHERE user_id = $1`;
      const result = await pool.query(query, [user_id]);
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw error;
    }
  },

  // Fetch a specific user by email
  async getUserByEmail(email) {
    try {
      const query = `
        SELECT * FROM Users 
        WHERE email = $1`;
      const result = await pool.query(query, [email]);
      return result.rows[0];
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw error;
    }
  },

  // Update a user's details
  async updateUser(user_id, username, email, password) {
    try {
      let query, values;

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the new password
        query = `
          UPDATE Users 
          SET username = $1, email = $2, password = $3 
          WHERE user_id = $4 
          RETURNING *`;
        values = [username, email, hashedPassword, user_id];
      } else {
        query = `
          UPDATE Users 
          SET username = $1, email = $2 
          WHERE user_id = $3 
          RETURNING *`;
        values = [username, email, user_id];
      }

      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  // Delete a user by ID
  async deleteUser(user_id) {
    try {
      const query = `
        DELETE FROM Users 
        WHERE user_id = $1 
        RETURNING *`;
      const result = await pool.query(query, [user_id]);
      return result.rows[0]; // Returns deleted user details
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
};

module.exports = UserModel;