# Database- Smart Clinic Management System


## MySQL Database Design
## MongoDB Collection Design

-----------
---Section-One-----

## MySQL Database Design

### Overview
This document contains the MySQL database schema for the Smart Clinic Management System. 
The schema includes tables for:

- Patients
- Doctors
- Appointments
- Admin Users
- Clinic Locations
- Payments

---


## Table: patients
- id: INT, Primary Key, Auto Increment
- first_name: VARCHAR(100), Not Null
- last_name: VARCHAR(100), Not Null
- email: VARCHAR(150), Unique
- phone_number: VARCHAR(20), Not Null
- date_of_birth: DATE
- gender: ENUM('Male', 'Female', 'Other')
- address: TEXT
- emergency_contact: VARCHAR(150)
- status: TINYINT (0 = Inactive, 1 = Active)
- created_at: TIMESTAMP, Default CURRENT_TIMESTAMP
- updated_at: TIMESTAMP, Default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

---

## Table: doctors
- id: INT, Primary Key, Auto Increment
- first_name: VARCHAR(100), Not Null
- last_name: VARCHAR(100), Not Null
- email: VARCHAR(150), Unique, Not Null
- phone_number: VARCHAR(20)
- specialization: VARCHAR(100), Not Null
- clinic_location_id: INT, Foreign Key -> clinic_locations(id)
- license_number: VARCHAR(100), Unique
- status: TINYINT (0 = Inactive, 1 = Active)
- created_at: TIMESTAMP, Default CURRENT_TIMESTAMP
- updated_at: TIMESTAMP, Default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

---

## Table: appointments
- id: INT, Primary Key, Auto Increment
- doctor_id: INT, Foreign Key -> doctors(id)
- patient_id: INT, Foreign Key -> patients(id)
- clinic_location_id: INT, Foreign Key -> clinic_locations(id)
- appointment_time: DATETIME, Not Null
- appointment_end_time: DATETIME
- reason_for_visit: TEXT
- status: TINYINT (0 = Scheduled, 1 = Completed, 2 = Cancelled, 3 = No Show)
- notes: TEXT
- created_by: INT, Foreign Key -> admin_users(id)
- created_at: TIMESTAMP, Default CURRENT_TIMESTAMP
- updated_at: TIMESTAMP, Default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

---

## Table: admin_users
- id: INT, Primary Key, Auto Increment
- full_name: VARCHAR(150), Not Null
- email: VARCHAR(150), Unique, Not Null
- password_hash: VARCHAR(255), Not Null
- role: ENUM('SuperAdmin', 'Manager', 'Receptionist')
- status: TINYINT (0 = Disabled, 1 = Active)
- last_login: DATETIME
- created_at: TIMESTAMP, Default CURRENT_TIMESTAMP
- updated_at: TIMESTAMP, Default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

---

## Table: clinic_locations
- id: INT, Primary Key, Auto Increment
- clinic_name: VARCHAR(150), Not Null
- address_line_1: VARCHAR(255), Not Null
- address_line_2: VARCHAR(255)
- city: VARCHAR(100), Not Null
- state: VARCHAR(100), Not Null
- postal_code: VARCHAR(20)
- country: VARCHAR(100), Not Null
- phone_number: VARCHAR(20)
- email: VARCHAR(150)
- status: TINYINT (0 = Closed, 1 = Active)
- created_at: TIMESTAMP, Default CURRENT_TIMESTAMP
- updated_at: TIMESTAMP, Default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

---

## Table: payments
- id: INT, Primary Key, Auto Increment
- appointment_id: INT, Foreign Key -> appointments(id)
- patient_id: INT, Foreign Key -> patients(id)
- amount: DECIMAL(10,2), Not Null
- payment_method: ENUM('Cash', 'Credit Card', 'Insurance', 'Online Transfer')
- transaction_reference: VARCHAR(255)
- payment_status: TINYINT (0 = Pending, 1 = Paid, 2 = Failed, 3 = Refunded)
- paid_at: DATETIME
- created_at: TIMESTAMP, Default CURRENT_TIMESTAMP
- updated_at: TIMESTAMP, Default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

---


# Relationships Summary

| Table | Relationship |
|---|---|
| doctors | belongs to clinic_locations |
| appointments | belongs to doctors |
| appointments | belongs to patients |
| appointments | belongs to clinic_locations |
| appointments | created by admin_users |
| payments | belongs to appointments |
| payments | belongs to patients |

---
-------------------------
--Section-Two----

## MongoDB Collection Design

### Overview
This document describes the MongoDB collection design for the Smart Clinic Management System.

The schema includes collections for:

- Prescriptions
- Feedback
- Logs## MongoDB Collection Design
- Messages


[MongoDB collections use flexible JSON-like document structures and support nested objects and arrays where appropriate.]

---

## Collection: prescriptions

```json
{
"_id": "ObjectId('6658b454e9f12c001ab34567')",
"appointmentId": 23,
"patient": {
"patientId": 105,
"fullName": "Bob Fay",
"dateOfBirth": "1992-04-12"
},
"doctor": {
"doctorId": 12,
"fullName": "Dr. Sarah Wilson",
"specialization": "General Medicine"
},
"medications": [
{
"medication": "Tylenol",
"dosage": "300mg",
"frequency": "Every 8 hours",
"durationDays": 5,
"refillCount": 1
},
{
"medication": "Vitamin C",
"dosage": "500mg",
"frequency": "Once Daily",
"durationDays": 14,
"refillCount": 0
}
],
"doctorsNotes": "Take medications after meals.",
"pharmacy": {
"name": "CVS Pharmacy",
"location": "East Avenue",
"contactNumber": "+1-555-223-8899"
},
"status": "Active",
"createdAt": "2026-05-16T10:45:00Z",
"updatedAt": "2026-05-16T11:15:00Z"
}
```

---

## Collection: feedback

```json
{
"_id": "ObjectId('6658b454e9f12c001ab35111')",
"appointmentId": 23,
"patient": {
"patientId": 105,
"fullName": "Bob Fay"
},
"doctor": {
"doctorId": 12,
"fullName": "Dr. Sarah Wilson"
},
"ratings": {
"overall": 5,
"communication": 5,
"cleanliness": 4,
"waitTime": 3
},
"comments": "Doctor was very professional and helpful.",
"wouldRecommend": true,
"submittedAt": "2026-05-16T14:30:00Z",
"status": "Published"
}
```

---

## Collection: logs

```json
{
"_id": "ObjectId('6658b454e9f12c001ab35999')",
"eventType": "LOGIN",
"severity": "INFO",
"user": {
"userId": 1,
"role": "Admin",
"name": "System Administrator"
},
"activity": {
"action": "User Login",
"description": "Admin user logged into the dashboard successfully."
},
"request": {
"ipAddress": "192.168.1.20",
"device": "Chrome Browser",
"operatingSystem": "Windows 11"
},
"status": "Success",
"createdAt": "2026-05-16T15:10:00Z"
}
```

---

## Collection: messages

```json
{
"_id": "ObjectId('6658b454e9f12c001ab34991')",
"conversationId": "CONV-1001",
"sender": {
"userId": 12,
"role": "Doctor",
"name": "Dr. Sarah Wilson"
},
"receiver": {
"userId": 105,
"role": "Patient",
"name": "Bob Fay"
},
"message": {
"text": "Please remember to take your medication twice daily.",
"attachments": [
{
"fileName": "prescription.pdf",
"fileUrl": "/uploads/prescription.pdf",
"fileType": "application/pdf"
}
]
},
"isRead": true,
"readAt": "2026-05-16T13:00:00Z",
"sentAt": "2026-05-16T12:55:00Z"
}
```

---

# Collection Relationships Summary

| Collection | Related Entities |
|---|---|
| prescriptions | appointments, patients, doctors |
| messages | doctors, patients, admin users |
| feedback | appointments, patients, doctors |
| logs | admin users, doctors, patients |

---
----------------------------------








