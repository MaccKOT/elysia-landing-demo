# DataScraper Landing Page + Simple Backend Demo

A minimal, self-contained landing page with a contact form backed by a Bun + Elysia.js server that sanitizes and saves submissions to a local JSON file.

## 📦 Tech Stack

- **Frontend**:
  - Static HTML with Tailwind CSS (via CDN)
  - Font Awesome for icons
  - Vanilla JavaScript for form validation and dynamic feedback

- **Backend**:
  - **Bun** (v1.1+) – fast JavaScript runtime
  - **Elysia.js** (v1.3+) – web framework for Bun
  - No external dependencies – uses only built-in Bun and Node.js-compatible APIs
  - Data persistence via `submissions.json` (appended on each form submit)

- **Security**:
  - Client-side validation with real-time error hints
  - Server-side input sanitization using `Bun.escapeHTML()`
  - Basic email format validation (RFC 5322–inspired regex)

## 🚀 Quick Start

1. **Install Bun** (if not already installed):

   ```sh
   curl -fsSL https://bun.sh/install | bash
   ```

2. **Clone or place files**:  
   Ensure the following files are in your project `src` directory:
   - `index.html`
   - `index.ts`

3. **Install Elysia**:

   ```sh
   bun add elysia
   ```

4. **Run the server**:

   ```sh
   bun run ./src/index.ts
   ```

5. **Open in browser**:  
   Visit [http://localhost:3000](http://localhost:3000)

6. **Form submissions**:  
   All valid submissions are saved to `submissions.json` in the project root.

## ⚠️ Notes

- This setup is intended for **demo, prototype, or low-traffic use**.
- For production: add rate limiting, CSRF protection, and consider using a database instead of JSON files.
- No build step required — frontend is served as static HTML.

---

Made with ❤️ and Bun.
