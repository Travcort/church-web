document.getElementById("registrationForm").addEventListener("submit", async (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
  
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
      });
  
      // Check if the response status is OK (2xx)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Check if the response is JSON
      const contentType = response.headers.get("Content-Type");
      if (contentType?.includes("application/json")) {
        const result = await response.json();
  
        // Handle the successful registration response
        alert(`Registration successful! Your ticket is at: ${result.ticketPath}`);
      } else {
        throw new Error("Server did not return JSON");
      }
    } catch (error) {
      console.log("Error during fetch:", error);
      alert("An error occurred during registration.");
    }
  });