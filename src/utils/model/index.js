const db = require("../db");

class Model {
  constructor(name) {
    this.name = name;
  }

  async run(query) {
    try {
      const response = await db.query(query);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async find(fields, conjunction = "AND") {
    if (!fields || Object.values(fields).length === 0) {
      const query = `SELECT * FROM ${this.name}`;
      const response = await this.run(query);
      return response;
    } else {
      const entries = Object.entries(fields);
      const whereClause = `${entries
        .map(([key, value]) => `${key}='${value}'`)
        .join(` ${conjunction} `)}`;
      const query = `SELECT * FROM ${this.name} WHERE ${whereClause}`;
      const response = await this.run(query);
      return response;
    }
  }

  async findById(id, fields = "*") {
    if (!id) {
      throw new Error("We need that ID bro...");
    } else {
      if (fields !== "*") {
        fields = `${fields.map((column) => column).join(",")}`;
      }
      const query = `SELECT ${fields} FROM ${this.name} WHERE id=${parseInt(
        id
      )}`;
      const response = await this.run(query);
      return response;
    }
  }

  async save(fields) {
    if (!fields || Object.values(fields).length === 0) {
      throw new Error("Give us those damn values bro...");
    } else {
      console.log(fields);
      const columns = Object.keys(fields);
      const values = Object.values(fields);
      const query = `INSERT INTO ${this.name} (${columns.join(
        ","
      )}) VALUES (${values.map((v) => `'${v}'`).join(",")})`;
      const response = await this.run(query);
      return response;
    }
  }

  async findByIdAndUpdate(id, fields) {
    if (!id) {
      throw new Error("Come on we need that ID dont you get it bro...");
    } else {
      const entries = Object.entries(fields);
      const query = `UPDATE ${this.name} SET ${entries
        .map(([key, value]) => `${key}='${value}'`)
        .join(",")} WHERE id=${parseInt(id)}`;
      const response = this.run(query);
      return response;
    }
  }

  async findByIdAndDelete(id) {
    if (!id) {
      throw new Error("Come on we need that ID dont you get it bro...");
    } else {
      const query = `DELETE FROM ${this.name} WHERE id=${parseInt(id)}`;
      const response = this.run(query);
      return response;
    }
  }
}

module.exports = Model;
