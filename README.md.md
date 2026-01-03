# 🏌🏽‍♂️🏌🏽‍♂️🏌🏽‍♂️ KLGCC GOLF BOOKING SYSTEM 🏌🏽‍♂️🏌🏽‍♂️🏌🏽‍♂️

## ICT502 DATABASE ENGINEERING – GROUP PROJECT

---

### Pre requisite (Kena install before boleh run 😊)

* **Download node from this website, LTS version untuk stability** 
👉🏽 https://nodejs.org/en/download


* **Then, open terminal** 

&nbsp;	# Verify the Node.js version:

&nbsp;	node -v # Should print "v24.12.0".

&nbsp;	# Verify npm version:

&nbsp;	npm -v # Should print "11.6.2".


* **Git (optional kalau nak)**


**🚀 How to Run**

&nbsp;  1. open terminal

&nbsp;  2. cd "KLGCC System"

&nbsp;  3. cd Front_end

&nbsp;  4. cd KLGCC

&nbsp;  5. Run 'npm install' to install dependencies

&nbsp;  6. Run 'npm run dev' to start the frontend server

&nbsp;  7. click localhost link to open the website



### \## 📁 Project Structure 👇🏽👇🏽

KLGCC System/
├── 🖥 frontend/
│   ├── 📦 node_modules/         # Node packages (⚠️ don’t touch!)
│   ├── 🌐 public/               # Public files like images
│   ├── 📝 src/                  # Source code
│   │   ├── 🖼 assets/            # Images
│   │   ├── 🧩 Components/       # Sidebar, header, etc
│   │   ├── 📄 Pages/            # Dashboard, etc
│   │   ├── 🎨 CSS files         # Styling for App & main (no need to touch)
│   │   ├── 🔗 Api.jsx           # Connects to backend
│   │   ├── 🔑 AuthContext.jsx   # Login & Register functions
│   │   ├── ⚙️ App.jsx           # Router & navigation
│   │   └── 🚀 main.jsx          # Entry point (⚠️ don’t touch)
│   ├── .gitignore
│   ├── eslint.config
│   ├── index.html
│   ├── package.json
│   └── package-lock.json
│
├── 🗄 backend/                # Work in progress
└── 📖 README.md