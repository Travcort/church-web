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
        if (result.message === "Registration successful!") {
          // Handle the successful registration response
          alert(`Registration successful! Your ticket has been sent to ${result.ticketPath}`);
        } 
        else if (result.message === "Email is already registered!") {
          alert('Registration unsuccessful! Your Email is already registered in the system');
        }
        
      } else {
        throw new Error("Server did not return JSON");
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  });