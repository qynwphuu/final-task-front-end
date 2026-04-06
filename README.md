# Personal Trainer REST API

This project provides a REST API for managing personal training customers and their training sessions. It supports full CRUD operations for both **customers** and **trainings**, making it suitable for fitness applications, coaching platforms, or educational projects.

## 📌 Overview

The API is built around two main resources:

### **Customers**

* Represents individuals receiving personal training.
* Includes basic information such as name and contact details.

### **Trainings**

* Represents training sessions linked to a specific customer.
* Includes details such as:

  * Date & time
  * Duration
  * Exercises performed
* Each customer can have **multiple** training sessions (one-to-many relationship).

## 🌐 Base URL

```
https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api
```

Use this as the root for all API requests.

## 🔄 Resetting the Database

You can reset the database to its original demo state using:

```
POST https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/reset
```

**Successful response:**

* Status: `200 OK`
* Body: `DB reset done`

If the reset fails, the API returns an appropriate error status and message.

## 📖 Documentation

This API documentation is generated using **MkDocs** with the *Read the Docs* theme.
