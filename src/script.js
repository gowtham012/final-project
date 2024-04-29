window.addEventListener('load', () => {
    // Target the image with the zoom animation
    const image = document.querySelector('.zoom-animation');
    setTimeout(() => {
      // Start the fade-out effect
      image.classList.add('fade-out');
      // After the fade-out effect, hide the image and show the main content
      setTimeout(() => {
        image.style.display = 'none'; // Hide the image
        document.getElementById('mainContent').style.display = 'block'; // Show the main content
        document.getElementById('mainContent').style.opacity = 0;
        setTimeout(() => {
          document.getElementById('mainContent').style.opacity = 1;
          document.getElementById('mainContent').style.transition = 'opacity 2s ease-in-out';
        }, 100); // Slightly delay the opacity transition for smoothness
      }, 5000); // This should match the length of the CSS transition
    }, 1000); // Start after a short delay to ensure the page is ready
  });

  
window.addEventListener('load', () => {
    // Target the image with the zoom animation
    const image = document.querySelector('.center-screen.zoom-animation');
  
    // Set a timeout to start the fade-out effect after the page loads
    setTimeout(() => {
      // Apply the fade-out effect to the image
      image.classList.add('fade-out');
  
      // Once the fade-out transition is complete, switch to the main content
      setTimeout(() => {
        // Hide the image
        image.style.display = 'none';
        
        // Show the main content
        const mainContent = document.getElementById('mainContent');
        mainContent.classList.remove('hidden');
        
        // Optionally, you can apply a fade-in effect to the main content here
        mainContent.classList.add('fade-in'); // Ensure you define this class in your CSS
      }, 5000); // This timeout duration should match the total duration of the CSS transitions
    }, 1000); // Delay the start of the animation to ensure the page is fully loaded
  });
  
  document.getElementById('myButton').onclick = function() {
    window.location.href = 'login.html';
};





window.addEventListener('load', function() {
  const backgroundVideo = document.getElementById('backgroundVideo');

  // Wait 3 seconds before playing the video
  setTimeout(function() {
      backgroundVideo.play();
  }, 3000);
});



function logout() {
  // Clear the session storage
  sessionStorage.removeItem('isAuthenticated');

  // Redirect to login
  window.location.href = 'login.html';
}


function checkAuthentication() {
  console.log("Checking authentication...");
  if (!sessionStorage.getItem('isAuthenticated')) {
      console.log("Not authenticated, redirecting...");
      window.location.href = 'login.html';
  } else {
      console.log("Authenticated, initializing page...");
      initPage();
  }
}
