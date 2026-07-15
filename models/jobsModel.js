const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Job = sequelize.define(
  "Job",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    shortDescription: {
      type: DataTypes.STRING(300),
      allowNull: true,
    },

    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    workType: {
      type: DataTypes.ENUM("Onsite", "Hybrid", "Remote"),
      defaultValue: "Onsite",
    },

    employmentType: {
      type: DataTypes.ENUM(
        "Full-time",
        "Part-time",
        "Internship",
        "Contract"
      ),
      defaultValue: "Full-time",
    },

    experienceLevel: {
      type: DataTypes.ENUM("Junior", "Mid", "Senior", "Lead"),
      defaultValue: "Junior",
    },

    description: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },

    requirements: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },

    benefits: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM("Draft", "Published", "Closed"),
      defaultValue: "Draft",
    },

    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    seo: {
      type: DataTypes.JSON,
      allowNull: true
    }
  },
  {
    timestamps: true,
    charset: "utf8",
    collate: "utf8_general_ci",
  }
);

module.exports = Job;