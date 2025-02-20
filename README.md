# 🖨️ CardPrint - E-Card Generator

CardPrint is a web-based application that allows users to create and print custom e-cards easily.  

## 📌 Features  
✅ Generate customizable e-cards  
✅ Print and download your e-card  
✅ Firebase authentication and database  
✅ Modern UI built with React and TailwindCSS  

---

## 🛠️ Tech Stack  

<p align="left">
  <img src="https://skillicons.dev/icons?i=js,ts,react,vite,tailwind,firebase,git" />
</p>

---

## 📥 Installation Guide  

### 🔹 Prerequisites  
Ensure you have the following installed before proceeding:  

- [Node.js](https://nodejs.org/) (LTS version recommended)  
- [Firebase CLI](https://firebase.google.com/docs/cli)  

To install Firebase CLI globally, run:  
```bash
npm install -g firebase-tools
```

Then, clone the repository, install dependencies, configure environment variables, and start the development server:
```bash
git clone https://github.com/daamleon/cardprint.git && cd cardprint
npm install
cp .env.example .env
```

Set up Firebase environment variables in .env (replace with your actual credentials):
```bash
echo "VITE_FIREBASE_API_KEY=your_api_key"
echo "VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain"
echo "VITE_FIREBASE_PROJECT_ID=your_project_id"
echo "VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket"
echo "VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id"
echo "VITE_FIREBASE_APP_ID=your_app_id"
```

Start your project
```bash
npm run dev
```
