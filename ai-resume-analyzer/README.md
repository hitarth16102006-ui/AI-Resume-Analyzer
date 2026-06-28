<div align="center">
  <br/>
  <h1>AI Resume Analyzer</h1>
  <p>
    <strong>Smart AI-powered resume analysis and ATS optimization platform</strong>
  </p>
  <br/>
</div>

<p align="center">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express.js"/>
  <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=googlebard&logoColor=fff" alt="Google Gemini"/>
  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS"/>
</p>

## Overview

AI Resume Analyzer is a full-stack web application that helps job seekers optimize their resumes using artificial intelligence. Users upload their resumes (PDF or DOCX), and the platform leverages Google Gemini AI to perform comprehensive analysis including ATS compatibility scoring, grammar checking, formatting evaluation, keyword optimization, and personalized improvement suggestions.

## Features

- **AI Resume Analysis** — Deep analysis powered by Google Gemini AI across 10+ dimensions
- **ATS Compatibility Score** — Evaluate how well your resume passes Applicant Tracking Systems
- **Resume Parsing** — Automatic extraction of text from PDF and DOCX files
- **Skills Detection** — Identify skills present in your resume automatically
- **Missing Keywords** — Discover important keywords your resume is missing
- **Grammar & Spelling Check** — Catch errors and improve writing quality
- **Formatting Evaluation** — Ensure professional layout and consistent styling
- **Structure Analysis** — Evaluate section organization and content flow
- **Readability Assessment** — Measure how easily your resume can be read
- **Interview Readiness** — Assess preparedness based on resume content
- **Personalized Suggestions** — Receive actionable improvement recommendations
- **User Authentication** — Secure JWT-based registration and login
- **Dashboard** — Central hub to manage all uploaded resumes and analysis results
- **Detail Analysis View** — Deep dive into individual resume analysis with scores
- **Responsive Design** — Fully responsive UI built with Tailwind CSS
- **File Upload** — Drag-and-drop upload with support for PDF, DOC, DOCX
- **Modern Animations** — Smooth transitions and animations powered by Framer Motion

## Screenshots

### Landing Page

*(Add screenshot here)*

### Authentication

*(Add screenshot here)*

### Dashboard

*(Add screenshot here)*

### Resume Analysis Detail

*(Add screenshot here)*

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| [React 18](https://reactjs.org/) | UI library |
| [Vite 5](https://vitejs.dev/) | Build tool and dev server |
| [Tailwind CSS 3](https://tailwindcss.com/) | Utility-first styling |
| [React Router 6](https://reactrouter.com/) | Client-side routing |
| [Framer Motion 11](https://www.framer.com/motion/) | Animations and transitions |
| [Axios](https://axios-http.com/) | HTTP client for API calls |
| [Recharts](https://recharts.org/) | Charting and data visualization |
| [Zustand](https://github.com/pmndrs/zustand) | State management (available for future use) |
| [React Hot Toast](https://react-hot-toast.com/) | Toast notifications |
| [React Dropzone](https://react-dropzone.js.org/) | File upload drag-and-drop |
| [React Icons](https://react-icons.github.io/react-icons/) | Icon library |

### Backend

| Technology | Purpose |
|---|---|
| [Node.js](https://nodejs.org/) | Runtime environment |
| [Express 5](https://expressjs.com/) | Web framework |
| [Mongoose 9](https://mongoosejs.com/) | MongoDB ODM |
| [JWT (jsonwebtoken)](https://jwt.io/) | Authentication tokens |
| [bcrypt](https://github.com/kelektiv/node.bcrypt.js) | Password hashing |
| [Google Generative AI](https://ai.google.dev/) | AI analysis engine |
| [Multer](https://github.com/expressjs/multer) | File upload handling |
| [pdf-parse](https://www.npmjs.com/package/pdf-parse) | PDF text extraction |
| [Mammoth](https://github.com/mwilliamson/mammoth.js) | DOCX text extraction |
| [Helmet](https://helmetjs.github.io/) | Security headers |
| [CORS](https://github.com/expressjs/cors) | Cross-origin resource sharing |
| [Morgan](https://github.com/expressjs/morgan) | HTTP request logging |
| [express-validator](https://express-validator.github.io/) | Input validation |
| [cookie-parser](https://github.com/expressjs/cookie-parser) | Cookie parsing |
| [dotenv](https://github.com/motdotla/dotenv) | Environment variable management |

### Database

| Technology | Purpose |
|---|---|
| [MongoDB Atlas](https://www.mongodb.com/atlas) | Cloud database |

## Project Structure

```
ai-resume-analyzer/
│
├── backend/                          # Express API server
│   ├── src/
│   │   ├── server.js                 # Entry point
│   │   ├── app.js                    # Express app configuration
│   │   ├── config/
│   │   │   ├── cors.js               # CORS configuration
│   │   │   └── db.js                 # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.js     # Auth logic (register, login, profile)
│   │   │   ├── resumeController.js   # Resume CRUD and analysis
│   │   │   └── userController.js     # User profile management
│   │   ├── middleware/
│   │   │   ├── auth.js               # JWT authentication middleware
│   │   │   └── upload.js             # Multer file upload configuration
│   │   ├── models/
│   │   │   ├── User.js               # User schema (name, email, password)
│   │   │   └── Resume.js             # Resume schema (file, analysis data)
│   │   ├── routes/
│   │   │   ├── index.js              # Route aggregator
│   │   │   ├── auth.js               # Auth routes
│   │   │   ├── resume.js             # Resume routes
│   │   │   └── user.js               # User routes
│   │   ├── services/
│   │   │   └── aiService.js          # Google Gemini AI integration
│   │   ├── utils/
│   │   │   └── AppError.js           # Custom error class
│   │   └── validators/
│   │       ├── auth.js               # Auth input validation rules
│   │       └── resume.js             # Resume ID validation
│   ├── uploads/                      # Uploaded resume files
│   ├── .env.example                  # Environment variable template
│   └── package.json
│
├── frontend/                         # React client
│   ├── public/
│   ├── src/
│   │   ├── main.jsx                  # Entry point
│   │   ├── App.jsx                   # Root component
│   │   ├── index.css                 # Global styles
│   │   ├── components/
│   │   │   ├── common/               # Navbar, Footer, ScrollToTop
│   │   │   ├── forms/                # AuthForm, ResumeUploadForm
│   │   │   ├── layout/               # MainLayout
│   │   │   └── ui/                   # Button, Input, Badge, etc.
│   │   ├── context/
│   │   │   ├── AuthContext.jsx       # Auth context definition
│   │   │   └── AuthProvider.jsx      # Auth state management
│   │   ├── hooks/
│   │   │   └── useAuth.js            # Auth hook
│   │   ├── pages/
│   │   │   ├── landing/              # Landing page with features, FAQ
│   │   │   ├── auth/                 # Login/Register page
│   │   │   ├── dashboard/            # User dashboard
│   │   │   ├── pricing/              # Pricing plans
│   │   │   ├── demo/                 # Demo/How it works
│   │   │   └── resume/Detail.jsx     # Resume analysis detail
│   │   ├── routes/
│   │   │   └── index.jsx             # Route definitions
│   │   ├── services/
│   │   │   └── api.js                # Axios instance and API methods
│   │   └── utils/
│   │       └── cn.js                 # Classname utility
│   ├── .env.example                  # Environment variable template
│   ├── vite.config.js                # Vite configuration
│   ├── tailwind.config.js            # Tailwind CSS configuration
│   └── package.json
│
├── .gitignore
└── README.md
```

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (or local MongoDB instance)
- [Google Gemini API Key](https://ai.google.dev/)

### Clone the Repository

```bash
git clone https://github.com/yourusername/ai-resume-analyzer.git
cd ai-resume-analyzer
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Install Frontend Dependencies

```bash
cd frontend
npm install
```

## Environment Variables

### Backend (`backend/.env`)

Create a `.env` file in the `backend/` directory by copying the template:

```bash
cp backend/.env.example backend/.env
```

| Variable | Required | Description |
|---|---|---|
| `PORT` | No | Server port (default: 5000) |
| `NODE_ENV` | No | Environment mode (`development` / `production`) |
| `MONGODB_URI` | **Yes** | MongoDB connection string from Atlas |
| `JWT_SECRET` | **Yes** | Secret key for JWT signing (min 32 chars) |
| `JWT_EXPIRES_IN` | No | JWT token expiration (default: `15m`) |
| `REFRESH_TOKEN_SECRET` | No | Secret for refresh tokens |
| `REFRESH_TOKEN_EXPIRES_IN` | No | Refresh token expiration (default: `7d`) |
| `GEMINI_API_KEY` | No | Google Gemini AI API key |
| `FRONTEND_URL` | No | Frontend URL for CORS (default: `http://localhost:5173`) |
| `MAX_FILE_SIZE` | No | Maximum upload file size in bytes (default: `5242880`) |

### Frontend (`frontend/.env`)

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:5000
```

| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | No | Backend API URL (default: `/api` via Vite proxy) |

## Running the Project

### Development Mode

Start the backend server (with auto-reload via nodemon):

```bash
cd backend
npm run dev
```

Start the frontend dev server (with Vite HMR):

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173` and will proxy API requests to the backend at `http://localhost:5000`.

### Production Build

Build the frontend:

```bash
cd frontend
npm run build
```

Start the backend in production mode:

```bash
cd backend
NODE_ENV=production npm start
```

### Preview Production Build

```bash
cd frontend
npm run preview
```

## API Endpoints

### Health

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Server health check |

### Authentication

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Login with email and password | No |
| `GET` | `/api/auth/profile` | Get current user profile | Yes |

### Resume Management

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/resume/upload` | Upload a resume file | Yes |
| `POST` | `/api/resume/:id/analyze` | Trigger AI analysis on a resume | Yes |
| `GET` | `/api/resume` | List all user's resumes | Yes |
| `GET` | `/api/resume/:id` | Get a specific resume with analysis | Yes |
| `DELETE` | `/api/resume/:id` | Delete a resume | Yes |

### User Profile

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `PUT` | `/api/user/profile` | Update user profile | Yes |
| `PUT` | `/api/user/password` | Change password | Yes |

## Application Flow

1. **Register / Login** — Create an account or sign in with existing credentials
2. **Upload Resume** — Drag and drop or select a PDF/DOCX resume file (max 10 MB)
3. **Automatic Parsing** — The system extracts text content from the uploaded file
4. **AI Analysis** — Google Gemini AI analyzes the resume across multiple dimensions
5. **ATS Evaluation** — Get an ATS compatibility score with detailed breakdown
6. **Results Dashboard** — View all analyzed resumes with summary scores
7. **Detail View** — Deep dive into individual analysis with scores, strengths, weaknesses, missing keywords, formatting and grammar suggestions
8. **Improvement Suggestions** — Receive actionable recommendations to optimize your resume

## Security

- **Helmet** — HTTP security headers to protect against common web vulnerabilities
- **CORS** — Cross-origin requests restricted to configured frontend URL
- **JWT Authentication** — Stateless token-based authentication with Bearer scheme
- **Password Hashing** — Passwords hashed with bcrypt (12 salt rounds)
- **Input Validation** — All inputs validated and sanitized via express-validator
- **File Validation** — Uploaded files checked for allowed MIME types and size limits
- **Error Handling** — Centralized error handling with consistent JSON responses
- **Environment Variables** — Sensitive configuration isolated in environment variables
- **Trust Proxy** — Express configured to trust reverse proxy headers

## Deployment

### Backend (Render)

1. Push the repository to GitHub
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Set the root directory to `backend/`
5. Set the build command: `npm install`
6. Set the start command: `npm start`
7. Add all required environment variables (see [Environment Variables](#environment-variables))
8. Set `NODE_ENV=production`
9. Deploy

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Set the root directory to `frontend/`
3. Set the build command: `npm run build`
4. Set the output directory: `dist/`
5. Add `VITE_API_URL` environment variable pointing to your Render backend URL
6. Deploy

## Future Improvements

- Resume templates and formatting tools
- Cover letter generator with AI
- AI-powered interview preparation
- Job matching and recommendation engine
- Resume version history and comparison
- Multiple resume profiles
- Dark mode support
- PDF export of analysis reports
- OAuth social login (Google, GitHub, LinkedIn)
- Real-time collaboration features
- Mobile app (React Native)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the existing style conventions and passes lint checks:

```bash
# Backend lint
cd backend && npm run lint

# Frontend lint
cd frontend && npm run lint
```

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## Author

**Hitarth Gujral**

- GitHub: [@hitarthgujral](https://github.com/hitarthgujral)
- LinkedIn: [Hitarth Gujral](https://linkedin.com/in/hitarthgujral)

---

<div align="center">
  <sub>Built with React, Express, MongoDB, and Google Gemini AI</sub>
</div>
