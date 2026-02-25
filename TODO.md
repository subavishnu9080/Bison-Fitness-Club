# TODO: Add Authentication to Bison Fitness Club Website

## Step 1: Create Login Page (login.html)
- [ ] Create a new HTML file for the login page with responsive design matching the site's UI.
- [ ] Include Email/Username field, Password field, "Forgot Password?" link, Login button.
- [ ] Add form validation and error messages.

## Step 2: Add Forgot Password Modal
- [ ] Implement a modal for forgot password with email input.
- [ ] Add functionality to send reset link (mock for now).

## Step 3: Update Styles (style.css)
- [ ] Add CSS for login page layout, form styling, modal, and responsiveness.
- [ ] Ensure colors, fonts match existing site (coquelicot, white, etc.).

## Step 4: Update JavaScript (script.js)
- [ ] Add form validation logic.
- [ ] Implement mock login with role-based redirection (Admin to admin-dashboard.html, User to user-dashboard.html).
- [ ] Add modal toggle for forgot password.
- [ ] Use localStorage for session management (temporary).

## Step 5: Create Dashboard Pages
- [ ] Create admin-dashboard.html with mock admin content.
- [ ] Create user-dashboard.html with mock user content.
- [ ] Style them to match the site.

## Step 6: Update Navigation (index.html)
- [ ] Add a "Login" link to the header navbar.

## Step 7: Set Up Backend (Node.js)
- [ ] Create server.js with Express for authentication endpoints.
- [ ] Implement password hashing with bcrypt.
- [ ] Add routes for login, forgot password, reset password.
- [ ] Use JWT for session tokens.
- [ ] Create a simple database schema (e.g., users.json for mock).

## Step 8: Integrate Backend
- [ ] Update login form to POST to backend.
- [ ] Handle responses for success/error.
- [ ] Implement protected routes.

## Step 9: Testing and Security
- [ ] Test login, forgot password, redirections.
- [ ] Ensure form validation works.
- [ ] Note: For production, use HTTPS, proper DB, etc.

## Step 10: Final Touches
- [ ] Add success feedback messages.
- [ ] Ensure mobile responsiveness.
- [ ] Document any setup instructions.
