-- Complaint Service Database Setup
-- Run this script to create the database and tables for Complaint-Service

-- Create database (run this as superuser)
-- CREATE DATABASE Complaint_DB;

-- Connect to the database
-- \c Complaint_DB;

-- Create complaints table
CREATE TABLE IF NOT EXISTS complaints (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    priority VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    user_id BIGINT NOT NULL,
    location JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create complaint_photos table for storing photo URLs
CREATE TABLE IF NOT EXISTS complaint_photos (
    id BIGSERIAL PRIMARY KEY,
    complaint_id BIGINT REFERENCES complaints(id) ON DELETE CASCADE,
    photo_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create complaint_status_history table for tracking status changes
CREATE TABLE IF NOT EXISTS complaint_status_history (
    id BIGSERIAL PRIMARY KEY,
    complaint_id BIGINT REFERENCES complaints(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL,
    message TEXT,
    changed_by VARCHAR(100),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_complaints_user_id ON complaints(user_id);
CREATE INDEX IF NOT EXISTS idx_complaints_status ON complaints(status);
CREATE INDEX IF NOT EXISTS idx_complaints_category ON complaints(category);
CREATE INDEX IF NOT EXISTS idx_complaints_priority ON complaints(priority);
CREATE INDEX IF NOT EXISTS idx_complaints_created_at ON complaints(created_at);
CREATE INDEX IF NOT EXISTS idx_complaint_photos_complaint_id ON complaint_photos(complaint_id);
CREATE INDEX IF NOT EXISTS idx_complaint_status_history_complaint_id ON complaint_status_history(complaint_id);

-- Insert sample data for testing
INSERT INTO complaints (title, description, category, priority, status, user_id, location) VALUES
('Water Supply Issues', 'No water supply in my area for 2 days', 'water', 'high', 'pending', 1, '{"address": "Main Street, Village Center", "lat": 28.6139, "lng": 77.2090}'),
('Street Light Not Working', 'Street light in front of my house is not working', 'electricity', 'medium', 'in_progress', 1, '{"address": "Block A, Residential Area", "lat": 28.6140, "lng": 77.2091}'),
('Garbage Collection Problem', 'Garbage not being collected regularly', 'public-services', 'low', 'resolved', 2, '{"address": "Sector 2, Village", "lat": 28.6141, "lng": 77.2092}'),
('Road Potholes', 'There are many potholes on the main road', 'infrastructure', 'high', 'pending', 2, '{"address": "Main Road, Village", "lat": 28.6142, "lng": 77.2093}'),
('Drainage Problem', 'Drainage is blocked and causing water logging', 'water', 'medium', 'resolved', 3, '{"address": "Entire Village", "lat": 28.6143, "lng": 77.2094}');

-- Insert sample status history
INSERT INTO complaint_status_history (complaint_id, status, message, changed_by) VALUES
(1, 'pending', 'Complaint registered', 'System'),
(2, 'pending', 'Complaint registered', 'System'),
(2, 'in_progress', 'Work assigned to maintenance team', 'Admin'),
(3, 'pending', 'Complaint registered', 'System'),
(3, 'in_progress', 'Work assigned to sanitation team', 'Admin'),
(3, 'resolved', 'Issue resolved successfully', 'Admin'),
(4, 'pending', 'Complaint registered', 'System'),
(5, 'pending', 'Complaint registered', 'System'),
(5, 'in_progress', 'Work assigned to water department', 'Admin'),
(5, 'resolved', 'Drainage cleared successfully', 'Admin'); 