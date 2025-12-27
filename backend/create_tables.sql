-- Run this file against your MySQL server to create the necessary schema

CREATE DATABASE IF NOT EXISTS class_routine_db;
USE class_routine_db;

CREATE TABLE IF NOT EXISTS teachers (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  registeredAt DATETIME
);

CREATE TABLE IF NOT EXISTS students (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  studentId VARCHAR(64),
  registeredAt DATETIME
);

CREATE TABLE IF NOT EXISTS classes (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  course VARCHAR(100),
  courseName VARCHAR(255),
  semester VARCHAR(50),
  day VARCHAR(50),
  time VARCHAR(50),
  room VARCHAR(100),
  teacher VARCHAR(255),
  teacherEmail VARCHAR(255),
  status VARCHAR(50) DEFAULT 'scheduled'
);

CREATE TABLE IF NOT EXISTS notifications (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  message TEXT,
  time DATETIME DEFAULT CURRENT_TIMESTAMP,
  emailSent BOOLEAN DEFAULT FALSE,
  forAll BOOLEAN DEFAULT TRUE
);
