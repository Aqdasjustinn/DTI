document.addEventListener("DOMContentLoaded", function () {
    // Smooth Scroll to Contact Section
    document.getElementById("contact-link").addEventListener("click", function (e) {
        e.preventDefault();
        document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
    });

   // Login Popup
    let loginPopup = document.getElementById("login-popup");
    let loginBtn = document.getElementById("login-btn");
    let closeBtn = document.getElementById("close-popup");

    loginBtn.addEventListener("click", function () {
        loginPopup.style.display = "flex";
    });

    closeBtn.addEventListener("click", function () {
        loginPopup.style.display = "none";
    });

    // Close popup when clicking outside of it
    window.addEventListener("click", function (e) {
        if (e.target === loginPopup) {
            loginPopup.style.display = "none";
        }
    });
});

function openLoginPopup() {
    document.getElementById("loginPopup").style.display = "block";
}

function closeLoginPopup() {
    document.getElementById("loginPopup").style.display = "none";
}



// ✅ Updated Room Generation Logic with Single Room Selection
function showRooms(wing) {
    const boysHostelSection = document.getElementById('boys-hostel-rooms');
    const floorContainer = document.getElementById('floor-container');

    // Clear previous floors
    floorContainer.innerHTML = '';

    // Define building layout
    const layout = {
        "C12": 12, "C11": 12, "C10": 12, "C9": 12, "C8": 12, "C7": 12,
        "C6": 7,
        "C5": 9, "C4": 9, "C3": 9,
        "C2": 7, "C1": 7
    };

    const totalFloors = layout[wing] || 0;

    // Generate floors and rooms
    for (let i = 1; i <= totalFloors; i++) {
        const floorDiv = document.createElement('div');
        floorDiv.className = 'floor';
        floorDiv.innerHTML = `<h3>Floor ${i}</h3>`;

        const roomGrid = document.createElement('div');
        roomGrid.className = 'room-grid';

        for (let j = 1; j <= 12; j++) {
            const roomNumber = `${wing}-${i}${j < 10 ? '0' : ''}${j}`;
            const roomDiv = document.createElement('div');
            roomDiv.className = 'room';

            // Randomize room status (5% occupied)
            const status = Math.random() < 0.05 ? 'occupied' : 'vacant';  
            roomDiv.classList.add(status);
            roomDiv.textContent = roomNumber;

            // ✅ Room Selection Logic: Only One Room Selectable
            roomDiv.addEventListener('click', () => {
                if (!roomDiv.classList.contains('occupied')) {
                    // Deselect all previously selected rooms
                    document.querySelectorAll('.room').forEach(room => {
                        if (room.classList.contains('selected')) {
                            room.classList.remove('selected');
                            room.classList.add('vacant');  // Reset to vacant color
                        }
                    });

                    // Select the current room
                    roomDiv.classList.remove('vacant');
                    roomDiv.classList.add('selected');
                }
            });

            roomGrid.appendChild(roomDiv);
        }

        floorDiv.appendChild(roomGrid);
        floorContainer.appendChild(floorDiv);
    }

    // Display the room selection section with smooth transition
    boysHostelSection.classList.remove('hidden');
    boysHostelSection.scrollIntoView({ behavior: 'smooth' });
}

// ✅ Wing Selection Event Listener
document.getElementById('boysWing').addEventListener('change', function () {
    const selectedWing = this.value;
    if (selectedWing !== "Select Wing") {
        showRooms(selectedWing);
    }
});

// ✅ Proceed Button Functionality
document.getElementById('proceed-btn').addEventListener('click', () => {
    alert("Proceeding to the next section...");
    // Add navigation logic here for the next section
});




// ✅ Girls & Boys Hostel Functionality with Symmetry & Section Toggle
document.addEventListener("DOMContentLoaded", () => {
    const girlsWingSelect = document.getElementById('girlsWing');
    const boysWingSelect = document.getElementById('boysWing');

    const girlsHostelSection = document.getElementById('girls-hostel-rooms');
    const boysHostelSection = document.getElementById('boys-hostel-rooms');

    const girlsFloorContainer = document.getElementById('girls-floor-container');
    const boysFloorContainer = document.getElementById('floor-container');

    const girlsLayout = {
        "D1": 7, "D2": 7, "D3": 9, "D4": 9, "D5": 9, "D6": 9
    };

    const boysLayout = {
        "C12": 12, "C11": 12, "C10": 12, "C9": 12, "C8": 12, "C7": 12,
        "C6": 7, "C5": 9, "C4": 9, "C3": 9, "C2": 7, "C1": 7
    };

    // ✅ Generate Rooms Function (Reusable)
    function generateRooms(container, wing, layout, roomClass, occupiedClass, vacantClass, selectedClass) {
        container.innerHTML = ''; // Clear previous floors
        const totalFloors = layout[wing] || 0;

        for (let i = 1; i <= totalFloors; i++) {
            const floorDiv = document.createElement('div');
            floorDiv.className = 'floor';  
            floorDiv.innerHTML = `<h3>Floor ${i}</h3>`;

            const roomGrid = document.createElement('div');
            roomGrid.className = 'room-grid';  

            for (let j = 1; j <= 12; j++) {
                const roomNumber = `${wing}-${i}${j < 10 ? '0' : ''}${j}`;
                const roomDiv = document.createElement('div');

                roomDiv.className = `${roomClass} ${Math.random() < 0.05 ? occupiedClass : vacantClass}`;
                roomDiv.textContent = roomNumber;

                // ✅ One-room selection logic
                roomDiv.addEventListener('click', () => {
                    if (!roomDiv.classList.contains(occupiedClass)) {
                        container.querySelectorAll(`.${roomClass}`).forEach(room => {
                            room.classList.remove(selectedClass);
                            room.classList.add(vacantClass);
                        });

                        roomDiv.classList.remove(vacantClass);
                        roomDiv.classList.add(selectedClass);
                    }
                });

                roomGrid.appendChild(roomDiv);
            }

            floorDiv.appendChild(roomGrid);
            container.appendChild(floorDiv);
        }
    }

 // ✅ Girls Room Display with Section Toggle
function showGirlsRooms(wing) {
    girlsHostelSection.classList.remove('hidden');
    girlsHostelSection.classList.add('show');

    // Hide Boys Hostel properly
    boysHostelSection.classList.add('hidden');
    boysHostelSection.classList.remove('show');   // 💡 Ensure it doesn't stay visible

    // Generate Girls Hostel Floors & Rooms
    generateRooms(
        girlsFloorContainer, 
        wing, 
        girlsLayout, 
        'room', 
        'girls-occupied', 
        'girls-vacant', 
        'girls-selected'
    );

    // Smooth scroll to Girls Hostel section
    girlsHostelSection.scrollIntoView({ behavior: 'smooth' });
}

// ✅ Boys Room Display with Section Toggle
function showBoysRooms(wing) {
    boysHostelSection.classList.remove('hidden');
    boysHostelSection.classList.add('show');

    // Hide Girls Hostel properly
    girlsHostelSection.classList.add('hidden');
    girlsHostelSection.classList.remove('show');   // 💡 Ensure it doesn't stay visible

    // Generate Boys Hostel Floors & Rooms
    generateRooms(
        boysFloorContainer, 
        wing, 
        boysLayout,
        'room', 
        'occupied', 
        'vacant', 
        'selected'
    );

    // Smooth scroll to Boys Hostel section
    boysHostelSection.scrollIntoView({ behavior: 'smooth' });
}

    // ✅ Event Listeners
    girlsWingSelect.addEventListener('change', () => {
        const selectedWing = girlsWingSelect.value;
        if (selectedWing !== "Select Wing") {
            showGirlsRooms(selectedWing);
        }
    });

    boysWingSelect.addEventListener('change', () => {
        const selectedWing = boysWingSelect.value;
        if (selectedWing !== "Select Wing") {
            showBoysRooms(selectedWing);
        }
    });

    // ✅ Proceed Buttons
    document.getElementById('girls-proceed-btn').addEventListener('click', () => {
        alert('Proceeding to the next section...');
    });

    document.getElementById('proceed-btn').addEventListener('click', () => {
        alert('Proceeding to the next section...');
    });
});



function debounce(func, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
}


// ✅ Open and close the FixMyRoom popup
function openFixMyRoom() {
    const popup = document.getElementById('fixmyroom-popup');
    popup.classList.add('show');
    popup.style.opacity = '1';
}

function closeFixMyRoom() {
    const popup = document.getElementById('fixmyroom-popup');
    popup.classList.remove('show');
    popup.style.opacity = '0';
}

// ✅ Handle Category Selection with Border Highlight
function selectCategory(event, category) {
    const actionBtn = document.getElementById('repair-btn');

    // Remove 'selected' class from all cards
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('selected');
    });

    // Add 'selected' class to the clicked card
    event.currentTarget.classList.add('selected');

    // Store the selected category in the button's dataset
    actionBtn.dataset.category = category;

    // Validate both conditions
    validateConditions();
}

// ✅ Enable or disable the "Request Repair" button based on checkbox and category selection
function validateConditions() {
    const actionBtn = document.getElementById('repair-btn');
    const checkbox = document.getElementById('request-checkbox');  // Fixed the ID reference

    const isCategorySelected = document.querySelector('.card.selected') !== null;
    const isCheckboxChecked = checkbox.checked;

    // ✅ Enable the button only when both conditions are true
    actionBtn.disabled = !(isCategorySelected && isCheckboxChecked);
}

// ✅ Handle "Request Repair" Action with Validation & Smooth Fade-out
function requestRepair() {
    const repairAnimation = document.getElementById('repair-animation');
    const popup = document.getElementById('fixmyroom-popup');
    const checkbox = document.getElementById('request-checkbox');  // Fixed ID reference
    const isCategorySelected = document.querySelector('.card.selected') !== null;

    // ✅ Double-check validation before executing
    if (!checkbox.checked || !isCategorySelected) {
        alert('Please select a category and tick the checkbox before requesting repair!');
        return;  // Stop execution if validation fails
    }

    // ✅ Show "On our way to fix!" message
    repairAnimation.classList.remove('hidden');

    // ✅ Display message for 2 seconds
    setTimeout(() => {
        repairAnimation.classList.add('hidden');

        // ✅ Smoothly fade out the entire popup
        popup.style.transition = 'opacity 0.5s ease';
        popup.style.opacity = '0';

        // ✅ Remove the popup after fading out
        setTimeout(() => {
            popup.classList.remove('show');
            popup.style.opacity = '1';  // Reset opacity for next time
        }, 500);
    }, 2000);
}

// ✅ Add event listeners for opening and closing the popup
document.addEventListener("DOMContentLoaded", () => {
    const fixMyRoomBtn = document.getElementById("fixmyroom-btn");
    const closeBtn = document.querySelector('.close-btn');
    const popup = document.getElementById('fixmyroom-popup');
    const checkbox = document.getElementById('request-checkbox');  // Fixed ID reference
    const requestBtn = document.getElementById('repair-btn');  // Correct button ID

    // ✅ Open the popup when clicking the "FixMyRoom" button
    if (fixMyRoomBtn) {
        fixMyRoomBtn.addEventListener("click", () => {
            openFixMyRoom();
        });
    }

    // ✅ Close the popup when clicking the close button
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            closeFixMyRoom();
        });
    }

    // ✅ Close the popup when clicking outside
    window.addEventListener("click", (e) => {
        if (e.target === popup) {
            closeFixMyRoom();
        }
    });

    // ✅ Handle checkbox state changes to validate conditions
    if (checkbox) {
        checkbox.addEventListener('change', validateConditions);
    }

    // ✅ Add click event listener for the "Request Repair" button
    if (requestBtn) {
        requestBtn.addEventListener('click', requestRepair);
    }
});



// ✅ OPEN & CLOSE SIGNUP POPUP
function openSignupPopup() {
    document.getElementById("signupPopup").style.display = "flex";
  }
  
  function closeSignupPopup() {
    document.getElementById("signupPopup").style.display = "none";
  }
  
  // ✅ ESC KEY TO CLOSE POPUP
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeSignupPopup();
    }
  });
  
  // ✅ EMAIL VALIDATION FOR BENNETT
  function validateEmail(email) {
    const bennettRegex = /^[a-zA-Z0-9._%+-]+@bennett\.edu\.in$/;
    return bennettRegex.test(email);
  }
  
  // ✅ SHOW ERROR INLINE
  function showError(inputId, message) {
    const input = document.getElementById(inputId);
    let error = input.nextElementSibling;
    if (!error || !error.classList.contains("error-message")) {
      error = document.createElement("div");
      error.classList.add("error-message");
      input.parentNode.insertBefore(error, input.nextSibling);
    }
    error.textContent = message;
  }
  
  // ✅ CLEAR ALL PREVIOUS ERRORS
  function clearErrors() {
    const errors = document.querySelectorAll(".error-message");
    errors.forEach(err => err.remove());
  }
  
  // ✅ SIMULATED OTP HANDLING
  function handleOtp() {
    const btn = document.getElementById("sendOtpBtn");
    const emailInput = document.getElementById("signupEmail").value;
  
    if (!emailInput.endsWith("@bennett.edu.in")) {
      document.getElementById("emailError").innerText = "Use a valid Bennett email";
      return;
    }
  
    document.getElementById("emailError").innerText = "";
  
    btn.textContent = "Sent ✓";
    btn.disabled = true;
    btn.style.backgroundColor = "#0B2545";
  
    setTimeout(() => {
      btn.textContent = "Send OTP";
      btn.disabled = false;
      btn.style.backgroundColor = "#8DA9C4";
    }, 3000);
  }
  
  // ✅ SIGNUP FUNCTION
  function signup() {
    clearErrors();
  
    const name = document.getElementById("signupName").value.trim();
    const mobile = document.getElementById("signupMobile").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const otp = document.getElementById("signupOTP").value.trim();
    const password = document.getElementById("signupPassword").value.trim();
  
    let isValid = true;
  
    if (name === "") {
      showError("signupName", "Full Name is required.");
      isValid = false;
    }
    if (mobile === "") {
      showError("signupMobile", "Mobile Number is required.");
      isValid = false;
    }
    if (!validateEmail(email)) {
      showError("signupEmail", "Please enter a valid Bennett email.");
      isValid = false;
    }
    if (otp !== "123456") {
      showError("signupOTP", "Incorrect OTP. Please try again.");
      isValid = false;
    }
    if (password.length < 6) {
      showError("signupPassword", "Password must be at least 6 characters long.");
      isValid = false;
    }
  
    if (!isValid) return;
  
    const usernamePrefix = email.split("@")[0].toUpperCase();
    sessionStorage.setItem("loggedInUser", usernamePrefix);
  
    const popup = document.getElementById("signupPopup");
    popup.classList.add("fade-out");
    setTimeout(() => {
      popup.style.display = "none";
      popup.classList.remove("fade-out");
    }, 300);
  
    updateNavbar();
  }
  
  // ✅ UPDATE NAVBAR
  function updateNavbar() {
    const user = sessionStorage.getItem("loggedInUser");
    const userInfo = document.getElementById("userInfo");
  
    if (user && userInfo) {
      userInfo.style.display = "flex"; // 🆕 ensures content is flex-aligned
      userInfo.style.alignItems = "center"; // 🆕 vertical alignment
      userInfo.style.gap = "12px"; // 🆕 horizontal space between email and logout
      userInfo.style.marginLeft = "20px"; // 🆕 moves it slightly away from FixMyRoom
  
      userInfo.innerHTML = `
        <span style="color:white;font-weight:500;">${user}</span>
        <button onclick="logout()" style="padding:4px 8px;background:#8DA9C4;border:none;border-radius:4px;color:white;cursor:pointer;">Logout</button>
      `;
  
      const loginBtn = document.querySelector('[onclick="openLoginPopup()"]');
      if (loginBtn) loginBtn.style.display = "none";
  
      const signupBtn = document.getElementById("signupBtn");
      if (signupBtn) signupBtn.style.display = "none";
    }
  }
  
  // ✅ LOGOUT FUNCTION
  function logout() {
    sessionStorage.removeItem("loggedInUser");
    const userInfo = document.getElementById("userInfo");
    userInfo.innerHTML = "";
  
    const loginBtn = document.querySelector('[onclick="openLoginPopup()"]');
    if (loginBtn) loginBtn.style.display = "inline-block";
    const signupBtn = document.getElementById("signupBtn");
    if (signupBtn) signupBtn.style.display = "inline-block";
  }
  
  // ✅ AUTO UPDATE NAVBAR ON PAGE LOAD
  document.addEventListener("DOMContentLoaded", () => {
    updateNavbar();
  });

  function openRoomXchange() {
    window.location.href = "roomxchange.html";
  }


    // For Boys Proceed Button
    document.getElementById('proceed-btn').addEventListener('click', () => {
        window.location.href = 'confirmation.html';
    });

    // For Girls Proceed Button
    document.getElementById('girls-proceed-btn').addEventListener('click', () => {
        window.location.href = 'confirmation.html';
    });