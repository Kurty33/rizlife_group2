function openModal(name, imgSrc, desc, event) {
    let modal = document.getElementById("characterModal");
    let modalImg = document.getElementById("modalImg");
    let modalTitle = document.getElementById("modalTitle");
    let modalDesc = document.getElementById("modalDesc");

    // Set modal content immediately
    modalImg.src = imgSrc;
    modalTitle.innerText = name;
    modalDesc.innerText = desc;

    // Display modal immediately
    modal.style.display = "flex";
    setTimeout(() => modal.classList.add("show"), 10); // Ensure smooth transition

    // Get clicked image
    let clickedImage = event.currentTarget.querySelector(".character-img");
    let rect = clickedImage.getBoundingClientRect();

    // Clone image for animation effect
    let clonedImage = clickedImage.cloneNode();
    document.body.appendChild(clonedImage);

    // Style cloned image for transition
    Object.assign(clonedImage.style, {
        position: "absolute",
        zIndex: "9999",
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        top: `${rect.top}px`,
        left: `${rect.left}px`,
        borderRadius: "10px",
        transition: "all 0.5s ease-in-out",
        transform: "scale(1)",
        opacity: "1"
    });

    // Move cloned image to modal position
    setTimeout(() => {
        clonedImage.style.top = "50%";
        clonedImage.style.left = "50%";
        clonedImage.style.transform = "translate(-50%, -50%) scale(2)";
        clonedImage.style.opacity = "0";
    }, 10);

    // Remove cloned image after animation
    setTimeout(() => document.body.removeChild(clonedImage), 500);
}

function closeModal() {
    let modal = document.getElementById("characterModal");
    modal.classList.remove("show");
    setTimeout(() => (modal.style.display = "none"), 300); // Smooth closing transition
}

// Close modal when clicking outside
window.onclick = function(event) {
    let modal = document.getElementById("characterModal");
    if (event.target === modal) {
        closeModal();
    }
};

// Ensure modal is hidden on page load
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("characterModal").style.display = "none";
});

// Attach event listeners to character cards
document.querySelectorAll(".character-card").forEach(card => {
    card.addEventListener("click", function(event) {
        openModal(
            this.querySelector("h4").innerText, 
            this.querySelector("img").src, 
            this.getAttribute("data-desc"),
            event
        );
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const textElement = document.getElementById("animated-text");
    const textContent = `José Rizal wrote El Filibusterismo in the context of a Spanish empire in decline, 
        with independence movements gaining strength across its colonies. As early as the 19th century, 
        Spain lost its American territories, and with the liberal revolution in Spain, it put pressure on 
        the Spanish government to open up the Philippines for foreign trade and to spread ideas about 
        constitutionalism and self-determination. Rizal's novel reflects a declining colonial power and 
        Spain's inability to hold repressive control over the Philippines while liberalizing at home. 
        Although executed before the success of the Filipino revolution, Rizal's work captures the rapid 
        disintegration of Spanish rule and foreshadows the country's fight for independence.`;

    let index = 0;

    function typeEffect() {
        if (index < textContent.length) {
            textElement.textContent += textContent[index];
            index++;
            setTimeout(typeEffect, 30); // Typing speed (30ms)
        } else {
            setTimeout(() => {
                textElement.textContent = "";
                index = 0;
                typeEffect(); // Restart typing effect
            }, 5000); // Delay before restarting (3s)
        }
    }

    typeEffect();
});

document.addEventListener("DOMContentLoaded", function () {
    const music = document.getElementById("background-music");
    const volumeBtn = document.getElementById("volume-btn");
    const volumeIcon = document.getElementById("volume-icon");

    function playMusic() {
        music.play().catch(error => console.log("Autoplay blocked."));
        document.removeEventListener("click", playMusic); // Remove listener after first interaction
        document.removeEventListener("keydown", playMusic);
    }

    // Wait for user interaction before playing music
    document.addEventListener("click", playMusic);
    document.addEventListener("keydown", playMusic);

    // Toggle mute/unmute on button click
    volumeBtn.addEventListener("click", () => {
        if (music.muted) {
            music.muted = false;
            volumeIcon.src = "volume-on.png";
        } else {
            music.muted = true;
            volumeIcon.src = "volume-off.png";
        }
    });
});
