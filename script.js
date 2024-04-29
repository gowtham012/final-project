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




//blockchain

// script.js
window.addEventListener('load', () => {
  // Your code to attach the event listener goes here
  const voteButton = document.getElementById('confirmVote');
  if (voteButton) { // Check if the element exists
      voteButton.onclick = function() {
          // Your voting logic here
          console.log('Vote confirmed!');
          // You might want to call your smart contract's vote function here
      };
  } else {
      console.error('Confirm Vote button not found');
  }
});


async function confirmVote() {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0]; // using the first account in MetaMask

    // Assuming your contract has a function to cast a vote
    // Replace `voteFunctionName` with your actual function name
    // and `candidateId` with the id of the selected candidate
    contract.methods.voteFunctionName(candidateId).send({ from: account })
    .then(function(result) {
        console.log(result);
        // Handle the result here
    }).catch(function(error) {
        console.error(error);
    });
}

document.getElementById('confirmVote').addEventListener('click', confirmVote);



window.addEventListener('load', function() {
  const backgroundVideo = document.getElementById('backgroundVideo');

  // Wait 3 seconds before playing the video
  setTimeout(function() {
      backgroundVideo.play();
  }, 3000);
});



