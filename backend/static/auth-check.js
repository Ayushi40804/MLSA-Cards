// Check if user is authenticated, redirect to login if not
(function() {
  const token = localStorage.getItem("mlsa_token");
  
  // Skip check if we're on the login page
  if (window.location.pathname === "/login.html" || window.location.pathname === "/") {
    return;
  }
  
  // Only require token (wallet is optional for Google OAuth users)
  if (!token) {
    window.location.href = "/login.html";
  }
})();
