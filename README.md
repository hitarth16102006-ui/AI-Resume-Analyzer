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

AI Resume Analyzer is a full-stack web application that helps job seekers optimize their resumes using artificial intelligence. This project demonstrates AI-assisted software development, full-stack engineering, authentication, API integration, resume parsing, ATS analysis, and secure backend practices. Users upload their resumes (PDF or DOCX), and the platform leverages Google Gemini AI to perform comprehensive analysis including ATS compatibility scoring, grammar checking, formatting evaluation, keyword optimization, and personalized improvement suggestions.

## Features

### AI Features

- **AI Resume Analysis** — Deep analysis powered by Google Gemini AI across 10+ dimensions including content, structure, and impact
- **ATS Compatibility Score** — Evaluate how well your resume passes Applicant Tracking Systems with detailed breakdown
- **Skills Detection** — Identify skills present in your resume automatically
- **Missing Keywords** — Discover important keywords your resume is missing for better job matching
- **Grammar & Spelling Check** — Catch errors and improve writing quality
- **Formatting Evaluation** — Ensure professional layout and consistent styling
- **Structure Analysis** — Evaluate section organization and content flow
- **Readability Assessment** — Measure how easily your resume can be read
- **Interview Readiness** — Assess preparedness based on resume content
- **Personalized Suggestions** — Receive actionable improvement recommendations with priority fixes

### User Features

- **User Authentication** — Secure JWT-based registration and login with password hashing
- **Dashboard** — Central hub to manage all uploaded resumes and view analysis results at a glance
- **Detail Analysis View** — Deep dive into individual resume analysis with comprehensive scores
- **Resume Upload** — Drag-and-drop file upload supporting PDF, DOC, and DOCX formats (max 10 MB)
- **Resume Parsing** — Automatic text extraction from uploaded files using pdf-parse and Mammoth
- **Responsive Design** — Fully responsive UI built with Tailwind CSS, works across devices
- **Pricing Page** — View available plans and feature comparisons
- **Demo Page** — Interactive walkthrough of the analysis process

### Security Features

- **JWT Authentication** — Stateless token-based authentication with Bearer scheme
- **Password Hashing** — Passwords hashed with bcrypt (12 salt rounds)
- **Input Validation** — All inputs validated and sanitized via express-validator
- **File Validation** — Uploaded files checked for allowed MIME types and size limits
- **Helmet** — HTTP security headers to protect against common web vulnerabilities
- **CORS** — Cross-origin requests restricted to configured frontend URL
- **Environment Variables** — Sensitive configuration isolated in environment variables

### Developer Features

- **Vite HMR** — Fast hot module replacement for rapid frontend development
- **Nodemon** — Auto-reload for backend during development
- **ESLint** — Code quality and consistency enforcement
- **Prettier** — Automatic code formatting
- **Path Aliases** — Clean imports using `@components/`, `@pages/`, `@hooks/`, etc.
- **Custom Animations** — Tailwind CSS animations for blob, float, shimmer, and fade effects
- **Soft Shadows** — Consistent shadow system for cards, modals, and glowing effects

## Development Approach

This project was built using **AI-assisted software development** — a modern workflow where I defined the architecture, requirements, and engineering decisions while leveraging AI tools to accelerate implementation. Key aspects of this approach include:

- **Architecture & Planning** — I designed the system architecture, data models, API structure, component hierarchy, and authentication flow before writing code
- **Prompt Engineering** — I crafted detailed prompts to generate initial implementations, specifying technology choices, error handling patterns, and code conventions
- **Iterative Refinement** — I reviewed every block of generated code, refined it through multiple prompt iterations, and made manual adjustments for correctness and consistency
- **Testing & Debugging** — I tested all functionality end-to-end, identified bugs, and resolved issues across the stack
- **Integration** — I configured API connections, environment variables, CORS policies, database schemas, and AI model parameters
- **Deployment** — I set up production hosting on Render (backend) and Vercel (frontend), configured environment variables, and resolved deployment-specific issues
- **Version Control** — I managed the full Git workflow, including commits, branches, and documentation

This represents an **AI-augmented engineering** workflow: I remain the decision-maker and quality gate at every step, using AI as a productivity multiplier rather than a replacement.

## My Role

- Product planning and feature definition
- System architecture and component design
- Prompt engineering and AI-assisted code generation
- Frontend implementation (React, Tailwind CSS, Framer Motion)
- Backend development (Express.js, Mongoose, REST API design)
- Authentication system design and implementation (JWT, bcrypt)
- Database schema design and MongoDB Atlas integration
- Google Gemini AI model integration and prompt design
- File upload pipeline (Multer, pdf-parse, Mammoth)
- CORS configuration and security hardening
- Testing, debugging, and issue resolution
- Production deployment (Render + Vercel)
- GitHub repository management
- Documentation and README authoring

## Screenshots

### Landing Page

<img width="1920" height="981" alt="image" src="https://github.com/user-attachments/assets/c39fa84c-9093-45c2-8f4f-7682a1feaa2e" />


### Authentication

<img width="1917" height="963" alt="image" src="https://github.com/user-attachments/assets/11995c11-e419-4311-8688-5693f9b44c21" />


### Dashboard

<img width="1917" height="961" alt="image" src="https://github.com/user-attachments/assets/00a46334-2bc9-4c3e-9e78-d32b2e27b12a" />


### Resume Analysis Detail

<img width="1917" height="978" alt="image" src="https://github.com/user-attachments/assets/374a479e-ca62-41a1-b4e5-934f13d67c3b" />
<img width="1916" height="972" alt="image" src="https://github.com/user-attachments/assets/41e1ea4a-c352-4970-a925-6aba83356dd8" />


## Architecture

The application follows a modern three-tier architecture with a clear separation of concerns.

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Browser   │────▶│  Express.js  │────▶│  MongoDB    │
│  (React +   │     │   Backend    │     │   Atlas     │
│   Vite)     │◀────│   (Render)   │◀────│             │
└─────────────┘     └──────┬───────┘     └─────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │  Google AI   │
                    │   Gemini     │
                    └──────────────┘
```

**Frontend** — React single-page application built with Vite. Uses Tailwind CSS for styling, React Router for client-side routing, Framer Motion for animations, and Axios for HTTP communication. The frontend is deployed on Vercel and communicates with the backend via REST API calls.

**Backend** — Express.js REST API server. Handles authentication (JWT), resume file uploads (Multer), text extraction (pdf-parse, Mammoth), AI analysis (Google Gemini), and serves data to the frontend. Deployed on Render with MongoDB Atlas as the database.

**Database** — MongoDB Atlas cloud database with two collections: `users` (name, email, hashed password) and `resumes` (file metadata, extracted text, analysis results). Mongoose ODM provides schema validation and query building.

**Authentication Flow** — Users register or login via the auth form. The backend validates credentials, issues a JWT token, and returns it to the frontend. The token is stored in localStorage and sent as a Bearer token in subsequent API requests. Backend middleware verifies the token on protected routes.

**AI Integration** — When a user triggers analysis, the backend extracts text from the uploaded resume, sends it to Google Gemini AI with a structured prompt, parses the AI response, and stores the structured analysis results in the database.

**File Upload Flow** — User selects a file via drag-and-drop. The frontend sends it as multipart/form-data to the backend. Multer validates the file type and size, saves it to the `uploads/` directory, and returns the file metadata. The text content is extracted asynchronously during analysis.

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

## What I Learned

- **Building scalable full-stack applications** — Structuring a project with separate frontend and backend, managing state across the stack, and designing for production deployment
- **Working with AI APIs** — Integrating Google Gemini AI into a real application, designing effective prompts for structured output, and handling asynchronous AI processing
- **Prompt engineering** — Crafting precise prompts that produce reliable, parseable responses for resume analysis across multiple dimensions
- **Authentication and authorization** — Implementing JWT-based auth from scratch, securing routes with middleware, and managing token lifecycle on the client side
- **REST API design** — Building clean, consistent API endpoints with proper HTTP methods, status codes, and error responses
- **Document parsing** — Extracting text from PDF and DOCX files using specialized libraries, handling edge cases and unsupported formats
- **Debugging AI-generated code** — Identifying issues introduced by AI suggestions, understanding the underlying code to fix them, and knowing when to rewrite versus refine
- **Secure backend development** — Implementing Helmet, CORS, input validation, file upload restrictions, and environment variable isolation
- **Deployment workflow** — Configuring production environments on Render and Vercel, managing environment variables across platforms, and debugging production-only issues like CORS misconfiguration
- **Git and GitHub collaboration** — Managing commits, resolving merge conflicts, and maintaining clean project documentation

## Security

The application implements multiple layers of security following backend development best practices:

- **JWT Authentication** — Stateless token-based authentication with Bearer scheme. Tokens are verified on every protected route request. Invalid or expired tokens are rejected with a 401 response.
- **Password Hashing** — Passwords are hashed with bcrypt (12 salt rounds) before storage. The password field is excluded from query results by default using Mongoose's `select: false`.
- **Helmet** — HTTP security headers configured to protect against XSS, content sniffing, clickjacking, and other common web vulnerabilities.
- **CORS** — Cross-origin requests are restricted to the configured frontend URL. Unknown origins are logged and rejected with clear error messages.
- **Input Validation** — All API inputs are validated and sanitized using express-validator with specific rules for email format, password length, name length, and MongoDB ID format.
- **File Upload Validation** — Uploaded files are checked for allowed MIME types (PDF, DOC, DOCX) and size limits (10 MB maximum). Invalid files are rejected with descriptive error messages.
- **Error Handling** — Centralized error handling middleware that consistently formats all errors as JSON responses with appropriate HTTP status codes. Sensitive stack traces are only exposed in development mode.
- **Environment Variables** — All secrets and configuration (database URI, JWT secret, API keys) are isolated in environment variables and excluded from version control.
- **Trust Proxy** — Express is configured to trust reverse proxy headers, enabling correct IP detection behind deployment platforms like Render.
- **Cookie Parsing** — Cookie parser middleware is configured for future session management and secure cookie handling.

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
