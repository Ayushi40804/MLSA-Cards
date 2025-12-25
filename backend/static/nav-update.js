// Update navigation bar with user info and points
(async function() {
  const navPoints = document.getElementById("navPoints");
  const userAddress = document.getElementById("userAddress");
  const token = localStorage.getItem("mlsa_token");
  const wallet = localStorage.getItem("mlsa_wallet");

  // Update user address in nav
  if (userAddress && wallet) {
    userAddress.textContent = `${wallet.substring(0, 4)}...${wallet.substring(38)}`;
  }

  // Function to fetch and update points
  async function updatePoints() {
    if (!token) return;
    
    try {
      const resp = await fetch("/game/points", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await resp.json();
      if (navPoints) {
        navPoints.textContent = `Points: ${json.points || 0}`;
      }
    } catch (err) {
      console.error("Error updating points:", err);
      if (navPoints) {
        navPoints.textContent = "Points: ?";
      }
    }
  }

  // Make updatePoints available globally so other pages can call it
  window.updateNavPoints = updatePoints;

  // Initial update
  await updatePoints();

  // Update points every 10 seconds
  setInterval(updatePoints, 10000);
})();
