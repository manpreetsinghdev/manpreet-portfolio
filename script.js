// REAL Contact Form Backend Integration
if (document.getElementById("contactForm")) {
    document
      .getElementById("contactForm")
      .addEventListener("submit", async function (e) {
        e.preventDefault();
  
        const submitBtn = this.querySelector("button[type='submit']");
        const originalText = submitBtn.innerHTML;
  
        const formData = {
          firstName: this.firstName.value.trim(),
          lastName: this.lastName.value.trim(),
          email: this.email.value.trim(),
          phone: this.phone.value.trim(),
          subject: this.subject.value,
          message: this.message.value.trim(),
        };
  
        // Validation
        if (
          !formData.firstName ||
          !formData.lastName ||
          !formData.email ||
          !formData.subject ||
          !formData.message
        ) {
          alert("Please fill all required fields");
          return;
        }
  
        try {
          submitBtn.innerHTML =
            '<i class="fas fa-spinner fa-spin"></i> Sending...';
          submitBtn.disabled = true;
  
          const response = await fetch(
            "https://portfolio-backend-k927.onrender.com/api/contact",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            }
          );
  
          const data = await response.json();
  
          if (data.success) {
            alert(
              "Thank you! Your message has been sent successfully."
            );
  
            this.reset();
          } else {
            alert(data.message || "Failed to send message");
          }
        } catch (error) {
          console.error(error);
          alert("Server Error. Please try again later.");
        } finally {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }
      });
  }