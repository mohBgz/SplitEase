# SplitEase

## Table of Contents

1. [📖 Introduction](#-introduction)
2. [🚀 Getting Started](#-getting-started)
3. [📋 Prerequisites](#-prerequisites)
4. [🛠️ Installation & Setup](#️-installation--setup)
    - [🔄 Option 1: Start with Docker (Recommended)](#-option-1-start-with-docker-recommended)
    - [🧰 Option 2: Manual Installation (Node.js Environment)](#-option-2-manual-installation-nodejs-environment)
5. [🧪 Using the Application](#-using-the-application)

---

## 📖 Introduction

**SplitEase** is a web application designed to simplify splitting bills among friends sharing the same receipt. It is a full-stack solution built with **Vite + React** on the frontend and **Node.js** on the backend, fully containerized using **Docker** for local development.

> **⚠️ Note:** The application is still under development and not fully functional. Some features may be incomplete or subject to change.

---

## 🚀 Getting Started

You can run the project in two ways:

- ✅ **Recommended**: With Docker (containerized dev setup)
- 🔧 **Manual Installation** (for direct Node.js + React dev setup)

---

## 📋 Prerequisites

Ensure the following tools are installed on your system:

- 🐳 **Docker**: [Get Docker](https://www.docker.com/get-started)
- 🛠️ **Docker Compose**: Included with Docker Desktop

> For manual setup:
- 🟢 **Node.js (v18+) & npm**: [Get Node.js](https://nodejs.org)

---

## 🛠️ Installation & Setup

### 🔄 Option 1: Start with Docker (Recommended)

#### Step 1: Clone the Repository

```bash
git clone https://github.com/mohBgz/SplitEase.git
cd SplitEase
```

#### Step 2: Start the Development Environment

```bash
docker-compose -f docker-compose.dev.yml up --build
```

#### Access the Application

- 🌐 **Frontend**: [http://localhost:5173](http://localhost:5173)
- 🔌 **Backend**: [http://localhost:5000](http://localhost:5000)


---

### 🧰 Option 2: Manual Installation (Node.js Environment)

#### Step 1: Clone the Repository

```bash
git clone https://github.com/mohBgz/SplitEase.git
cd SplitEase
```

#### Step 2: Install Frontend Dependencies

```bash
cd frontend
npm install
npm run dev
```

> 🖥️ Frontend will run at [http://localhost:5173](http://localhost:5173)

#### Step 3: Install Backend Dependencies

Open a new terminal:

```bash
cd backend
npm install
npm run dev
```

> 🖥️ Backend will run at [http://localhost:5000](http://localhost:5000)

---

## 🧪 Using the Application

You can test the app in two ways:

1. 📁 Use sample bills from `./backend/tests/data/`
2. 📤 Upload your own `.json` bills via:
     - 🌐 The web interface
     - 🛠️ Tools like Postman

> **💡 Note**: Both Docker and manual setups are optimized for development. Hot reload is supported in both environments✅.
