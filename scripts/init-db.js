// Initialize SQLite database for development
const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

// Ensure prisma directory exists
const prismaDir = path.join(__dirname, '..', 'prisma');
if (!fs.existsSync(prismaDir)) {
  fs.mkdirSync(prismaDir, { recursive: true });
}

// Create database (overwrite if exists by deleting first)
const dbPath = path.join(prismaDir, 'dev.db');
if (fs.existsSync(dbPath)) {
  try {
    fs.unlinkSync(dbPath);
    console.log('🗑️  Deleted existing database:', dbPath);
  } catch (e) {
    console.warn('⚠️  Could not delete existing database:', e.message);
  }
}

const db = new Database(dbPath);
console.log('✅ Database file created:', dbPath);

// Create tables based on schema
const schema = `
-- Patient table
CREATE TABLE IF NOT EXISTS Patient (
  id TEXT PRIMARY KEY,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  dateOfBirth DATETIME,
  allergies TEXT,
  medications TEXT,
  medicalHistory TEXT
);

CREATE INDEX IF NOT EXISTS Patient_email_idx ON Patient(email);
CREATE INDEX IF NOT EXISTS Patient_phone_idx ON Patient(phone);

-- Doctor table
CREATE TABLE IF NOT EXISTS Doctor (
  id TEXT PRIMARY KEY,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  photo TEXT,
  specialization TEXT NOT NULL,
  education TEXT NOT NULL, -- JSON array
  experience INTEGER NOT NULL,
  licenses TEXT NOT NULL, -- JSON array
  bio TEXT,
  workingDays TEXT NOT NULL, -- JSON array
  workingHours TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS Doctor_email_idx ON Doctor(email);
CREATE INDEX IF NOT EXISTS Doctor_specialization_idx ON Doctor(specialization);

-- Service table
CREATE TABLE IF NOT EXISTS Service (
  id TEXT PRIMARY KEY,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  price REAL NOT NULL,
  duration INTEGER NOT NULL,
  category TEXT NOT NULL,
  metaTitle TEXT,
  metaDescription TEXT
);

CREATE INDEX IF NOT EXISTS Service_slug_idx ON Service(slug);
CREATE INDEX IF NOT EXISTS Service_category_idx ON Service(category);

-- DoctorService table (Many-to-Many)
CREATE TABLE IF NOT EXISTS DoctorService (
  id TEXT PRIMARY KEY,
  doctorId TEXT NOT NULL,
  serviceId TEXT NOT NULL,
  FOREIGN KEY (doctorId) REFERENCES Doctor(id) ON DELETE CASCADE,
  FOREIGN KEY (serviceId) REFERENCES Service(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS DoctorService_doctorId_serviceId_key ON DoctorService(doctorId, serviceId);
CREATE INDEX IF NOT EXISTS DoctorService_doctorId_idx ON DoctorService(doctorId);
CREATE INDEX IF NOT EXISTS DoctorService_serviceId_idx ON DoctorService(serviceId);

-- Booking table
CREATE TABLE IF NOT EXISTS Booking (
  id TEXT PRIMARY KEY,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  date DATETIME NOT NULL,
  time TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING',
  notes TEXT,
  patientId TEXT NOT NULL,
  doctorId TEXT NOT NULL,
  serviceId TEXT NOT NULL,
  FOREIGN KEY (patientId) REFERENCES Patient(id) ON DELETE CASCADE,
  FOREIGN KEY (doctorId) REFERENCES Doctor(id) ON DELETE CASCADE,
  FOREIGN KEY (serviceId) REFERENCES Service(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS Booking_patientId_idx ON Booking(patientId);
CREATE INDEX IF NOT EXISTS Booking_doctorId_idx ON Booking(doctorId);
CREATE INDEX IF NOT EXISTS Booking_serviceId_idx ON Booking(serviceId);
CREATE INDEX IF NOT EXISTS Booking_date_idx ON Booking(date);
CREATE INDEX IF NOT EXISTS Booking_status_idx ON Booking(status);

-- Review table
CREATE TABLE IF NOT EXISTS Review (
  id TEXT PRIMARY KEY,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  rating INTEGER NOT NULL,
  comment TEXT NOT NULL,
  isPublished BOOLEAN NOT NULL DEFAULT 0,
  patientId TEXT NOT NULL,
  FOREIGN KEY (patientId) REFERENCES Patient(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS Review_patientId_idx ON Review(patientId);
CREATE INDEX IF NOT EXISTS Review_rating_idx ON Review(rating);
CREATE INDEX IF NOT EXISTS Review_isPublished_idx ON Review(isPublished);

-- Contact table
CREATE TABLE IF NOT EXISTS Contact (
  id TEXT PRIMARY KEY,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'NEW'
);

CREATE INDEX IF NOT EXISTS Contact_status_idx ON Contact(status);
CREATE INDEX IF NOT EXISTS Contact_createdAt_idx ON Contact(createdAt);
`;

// Execute schema
db.exec(schema);

console.log('✅ Database tables created successfully!');
console.log('');
console.log('Database is ready for use.');
