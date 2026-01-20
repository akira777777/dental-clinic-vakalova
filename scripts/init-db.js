// Initialize SQLite database for development
const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

// Ensure prisma directory exists
const prismaDir = path.join(__dirname, '..', 'prisma');
if (!fs.existsSync(prismaDir)) {
  fs.mkdirSync(prismaDir, { recursive: true });
}

// Create database
const dbPath = path.join(prismaDir, 'dev.db');
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
  phone TEXT NOT NULL
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
  specialization TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  photo TEXT,
  bio TEXT,
  experience INTEGER NOT NULL DEFAULT 0,
  education TEXT,
  active INTEGER NOT NULL DEFAULT 1
);

-- Service table
CREATE TABLE IF NOT EXISTS Service (
  id TEXT PRIMARY KEY,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price REAL NOT NULL,
  duration INTEGER NOT NULL,
  category TEXT NOT NULL,
  active INTEGER NOT NULL DEFAULT 1
);

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
  FOREIGN KEY (doctorId) REFERENCES Doctor(id) ON DELETE RESTRICT,
  FOREIGN KEY (serviceId) REFERENCES Service(id) ON DELETE RESTRICT
);

CREATE INDEX IF NOT EXISTS Booking_patientId_idx ON Booking(patientId);
CREATE INDEX IF NOT EXISTS Booking_doctorId_idx ON Booking(doctorId);
CREATE INDEX IF NOT EXISTS Booking_serviceId_idx ON Booking(serviceId);
CREATE INDEX IF NOT EXISTS Booking_date_idx ON Booking(date);
CREATE INDEX IF NOT EXISTS Booking_status_idx ON Booking(status);

-- Contact table
CREATE TABLE IF NOT EXISTS Contact (
  id TEXT PRIMARY KEY,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
console.log('You can now run: npm run build');

db.close();
