const likeButton = document.getElementById('likeButton');
        const likeCountElement = document.getElementById('likeCount');
        let likes = 0; // This will be updated by server response

        // Function to update the displayed like count text (singular/plural)
        function updateLikeCountDisplay() {
            if (likes === 1) {
                likeCountElement.textContent = `${likes} Like`;
            } else {
                likeCountElement.textContent = `${likes} Likes`;
            }
        }

        // Function to fetch the current like count from the server
        async function fetchLikes() {
            try {
                const response = await fetch('update_likes.php?action=get');
                const data = await response.text(); // Read as plain text
                likes = parseInt(data); // Parse the number
                if (isNaN(likes)) likes = 0; // Default to 0 if parsing fails
                updateLikeCountDisplay(); // Update the display
            } catch (error) {
                console.error('Error fetching likes:', error);
                likeCountElement.textContent = 'Error loading likes';
            }
        }

        // Function to send a like increment request to the server
        async function sendLike() {
            try {
                const response = await fetch('update_likes.php?action=add');
                const data = await response.text(); // Read the new count
                likes = parseInt(data);
                if (isNaN(likes)) likes = 0;
                updateLikeCountDisplay();
            } catch (error) {
                console.error('Error sending like:', error);
                // Optionally revert UI or show error
            }
        }

        // Add event listener to the like button
        likeButton.addEventListener('click', () => {
            sendLike(); // Call the function to send the like to the server
        });

        // Fetch initial likes when the page loads
        fetchLikes();