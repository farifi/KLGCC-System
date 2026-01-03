# 🏌🏽‍♂️🏌🏽‍♂️🏌🏽‍♂️ KLGCC GOLF BOOKING SYSTEM 🏌🏽‍♂️🏌🏽‍♂️🏌🏽‍♂️
**ICT502 DATABASE ENGINEERING – GROUP PROJECT**

---

## ⚡ About the Project

Welcome to **KLGCC Golf Booking System**! 🏌️‍♂️  
This is a simple, interactive system for **booking golf sessions** at KLGCC.  
Built with **Node.js + React.js**, it’s easy to set up and explore!  

---

## 🛠 Pre-requisites (Install these first 😊)

<details>
<summary>Click to expand ✅</summary>

- **Node.js (LTS version recommended)**  
👉🏽 [Node.js Download](https://nodejs.org/en/download)

- **Check installation in terminal:**

```bash
# Verify Node.js version
node -v   # Should print "v24.12.0"

# Verify npm version
npm -v    # Should print "11.6.2"
Git (optional, if you want to clone the project)

</details>
🚀 How to Run (Follow the arrows ➡️)
<details> <summary>Click to expand instructions 🏁</summary>
1️⃣ Open terminal

2️⃣ Navigate to project folder:

bash
Copy code
cd "KLGCC System"
3️⃣ Go to frontend folder:

bash
Copy code
cd Front_end
cd KLGCC
4️⃣ Install dependencies:

bash
Copy code
npm install
5️⃣ Start frontend server:

bash
Copy code
npm run dev
6️⃣ Open the website
Click the localhost link shown in terminal (usually http://localhost:5173)
```
⚠️ Tip: Always run npm install first if you just cloned the repo.

</details> 

📁 Project Structure (Treasure Map 🗺️)
<details>bash<summary>Click to expand folder structure 👇🏽</summary>
KLGCC System/
├── 🖥 frontend/
│   ├── 📦 node_modules/        # Node packages (⚠️ don’t touch!)
│   ├── 🌐 public/             # Public files like images
│   ├── 📝 src/                # Source code
│   │   ├── 🖼 assets/          # Images
│   │   ├── 🧩 Components/      # Sidebar, header, etc
│   │   ├── 📄 Pages/           # Dashboard, etc
│   │   ├── 🎨 CSS files        # Styling for App & main (no need to touch)
│   │   ├── 🔗 Api.jsx          # Connects to backend
│   │   ├── 🔑 AuthContext.jsx  # Login & Register functions
│   │   ├── ⚙️ App.jsx           # Router & navigation
│   │   └── 🚀 main.jsx          # Entry point (⚠️ don’t touch)
│   ├── .gitignore
│   ├── eslint.config
│   ├── index.html
│   ├── package.json
│   └── package-lock.json
├── 🗄 backend/                # Work in progress
└── 📖 README.md

</details>