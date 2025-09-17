# 📑 Document Editor – Full Stack Project (React + Spring Boot Microservices)

A **collaborative Document Editing Platform** built with **React (frontend)** and **Spring Boot Microservices (backend)**.  
The system allows users to **create, edit, share, and collaborate** on documents in real time, with secure authentication and an API gateway for centralized access.

---

## 🌐 Project Overview

- **Frontend (React)**  
  - Built with React.js for a modern, responsive UI.  
  - Provides user-friendly interfaces for authentication, document editing, and real-time collaboration.  
  - Communicates with backend services through the **Gateway API**.  

- **Backend (Spring Boot Microservices)**  
  - Organized into 4 independent services:
    1. **User Service** → Manages authentication & profiles  
    2. **Document Service** → Handles document CRUD & storage  
    3. **Communication Service** → Enables real-time chat & notifications  
    4. **Gateway Server** → Central API Gateway for routing & security  

---
This repository represents the **backend microservices** for the **Document Editor System**.  
The system is built using **Spring Boot Microservices**, connected through **API Gateway** and enabling secure and scalable document collaboration.

---

## 🚀 Microservices Overview

The project follows a **microservices-based architecture**, with independent services handling specific features.

### 1️⃣ [User Service](https://github.com/RANJEETJ06/Document-Backend-User)🔗
- Handles user registration, authentication, and profile management.
- Implements **Spring Security + JWT Authentication**.
- Provides APIs for managing users and their access roles.

---

### 2️⃣ [Document Service](https://github.com/RANJEETJ06/Document-Backend-Document)🔗
- Manages document creation, storage, updates, and retrieval.
- Supports **CRUD operations** for documents.
- Integrates with file system / cloud storage for persistence.
- Handles metadata such as titles, authors, timestamps.

---

### 3️⃣ [Communication Service](https://github.com/RANJEETJ06/Document-Editor-Communication)🔗
- Enables **real-time communication** for collaborative document editing.
- Provides messaging and notification features.
- Uses **WebSocket / Messaging Queue** for live updates.
- Ensures smooth collaboration between multiple users.

---

### 4️⃣ [Gateway Server](https://github.com/RANJEETJ06/Document-Editor-GatewayServer)🔗
- Acts as the **API Gateway** for all microservices.
- Routes external requests to the respective services.
- Handles **load balancing, security, and centralized access control**.
- Provides a **single entry point** to the backend system.

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    Client[Frontend / API Consumer] --> Gateway[Gateway Server]
    Gateway --> UserService[User Service]
    Gateway --> DocumentService[Document Service]
    Gateway --> CommService[Communication Service]

