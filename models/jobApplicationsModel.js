const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Job = require("./jobsModel");

const JobApplication = sequelize.define(
  "JobApplication",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    linkedin: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    github: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    portfolio: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    yearsOfExperience: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    currentJobTitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    resume: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    coverLetter: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM(
        "New",
        "Reviewing",
        "Interview",
        "Accepted",
        "Rejected"
      ),
      defaultValue: "New",
    },

    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    charset: "utf8",
    collate: "utf8_general_ci",
  }
);

Job.hasMany(JobApplication, {
  foreignKey: "jobId",
  onDelete: "CASCADE",
});

JobApplication.belongsTo(Job, {
  foreignKey: "jobId",
});

module.exports = JobApplication;