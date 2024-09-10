// List of students to be picked from
const students = [
  "Abdurrahman Murat Aktürk",
  "Abre Süeda",
  "Adem Onur Kolaylı",
  "Ahmet Hakan Kanıcı",
  "Aleyna Taşkömür",
  "Ali Okhan",
  "Alican Çatak",
  "Aykut Öyekcin",
  "Ayşenur Ünal",
  "Ayşenur Şeyhvassuf",
  "Behçet Muhammed",
  "Boran Esin Çamlık",
  "Cihan Özdemir",
  "Derya Tez",
  "Dilan Denli",
  "Doğancan Albayrak",
  "Ebru Cihan",
  "Elif Durukan",
  "Emin Akardere",
  "Emre Ergenekon",
  "Emre Çimen",
  "Emrecan Kaya",
  "Engin Gürbüz",
  "Erdal Kobak",
  "Erhan Algül",
  "Erman Kaya",
  "Esra Ceren Saçmaz",
  "Fırat Demir",
  "Halil Demirtaş",
  "İsmail Safa Yılmaz",
  "Kubilay Can Takmaz",
  "Kübra Çiçek",
  "Mustafa Furkan İnan",
  "Mısra Medenioğlu",
  "Okan Erturan",
  "Onur Adıyaman",
  "Onur Mergen",
  "Onur Turkarslan",
  "Onur Yılmaz",
  "Onur Çetiner",
  "Oğuzhan Sali",
  "Rıdvan Kesken",
  "Sedat Ay",
  "Sergen Yanıklar",
  "Sevde Sultan Çevik",
  "Sinem Çobanlı Gürbüz",
  "Sıdıka Gencer",
  "Tuba Çakır",
  "Yakup Eren Ermurat",
  "Yaşar Can Damlı",
  "Yusuf Kayabaşı",
  "Öner Atalay",
  "Özgür Dayanır",
];

// Class to manage student picking and animations
class StudentPicker {
  constructor() {
    // Initialize DOM elements for student list and picked student card
    this.studentList = document.getElementById("studentList");
    this.pickedStudentCard = document.getElementById("pickedStudentCard");
    this.pickButton = document.getElementById("pickButton");

    // Create a copy of the students array to modify (students left to choose from)
    this.availableStudents = [...students];

    // Create student cards in the UI
    this.createStudentCards();

    // Add event listener for the button to pick a random student
    this.pickButton.addEventListener("click", () => this.pickRandomStudent());
  }

  // Method to create student cards and append them to the student list in the UI
  createStudentCards() {
    students.forEach((student) => {
      const card = this.createElementWithClass("div", "student-card");
      card.textContent = student; // Set the name of the student on the card
      this.studentList.appendChild(card); // Add the card to the student list
    });
  }

  // Method to animate student cards with a wave and jiggle effect
  async waveJiggleCards() {
    const waveDuration = 15; // Duration for each card animation
    const cards = document.querySelectorAll(".student-card"); // Select all student cards

    // Jiggly effect for each card
    for (const card of cards) {
      card.classList.add("jiggling");
      await this.delay(waveDuration); // Pause between jiggling each card
    }

    await this.delay(500); // Pause before the next animation phase

    // Highlight each card after jiggling
    for (let i = 0; i < cards.length; i++) {
      cards[i].classList.remove("jiggling");
      await this.delay(waveDuration); // Pause between highlighting each card
    }

    await this.delay(200); // Short pause at the end of the animation
  }

  // Method to pick a random student from the available students
  async pickRandomStudent() {
    if (this.availableStudents.length === 0) {
      this.pickedStudentCard.textContent = "All students have been picked!";
      this.pickButton.disabled = true; // Disable the button if no students are left
      return; // Exit the function if all students are already picked
    }

    // Disable pick button to prevent multiple clicks while processing
    this.pickButton.disabled = true;
    await this.waveJiggleCards(); // Trigger the animation before picking a student

    // Randomly select a student from available students
    const index = Math.floor(Math.random() * this.availableStudents.length);
    const student = this.availableStudents.splice(index, 1)[0]; // Remove the student from the available list

    // Find and hide the corresponding card in the UI
    const cards = document.querySelectorAll(".student-card");
    let selectedCard;
    cards.forEach((card) => {
      if (card.textContent === student) {
        selectedCard = card; // Identify the selected card
        card.style.opacity = "0"; // Make the selected card disappear
      }
    });

    // Animate the movement of the selected card to the picked student area
    await this.animateCardMovement(selectedCard, student);

    this.pickedStudentCard.textContent = student; // Display the name of the picked student
    selectedCard.style.display = "none"; // Remove the selected card from view
    this.pickButton.disabled = false; // Re-enable the pick button
  }

  // Method to animate the movement of the selected student card
  async animateCardMovement(selectedCard, student) {
    // Create a new 'moving card' element to illustrate the animation
    const movingCard = this.createElementWithClass("div", "moving-card");
    movingCard.textContent = student; // Set the text to the selected student
    document.body.appendChild(movingCard); // Add the moving card to the document

    // Get the position of the selected card and the destination card
    const startRect = selectedCard.getBoundingClientRect();
    const endRect = this.pickedStudentCard.getBoundingClientRect();

    // Set initial size and position for the moving card
    Object.assign(movingCard.style, {
      left: `${startRect.left}px`,
      top: `${startRect.top}px`,
    });

    await this.delay(50); // Short delay to ensure previous styles are applied

    // Animate the transition to the target position and style
    Object.assign(movingCard.style, {
      left: `${endRect.left}px`,
      top: `${endRect.top}px`,
    });

    await this.delay(500); // Wait for the animation to complete
    document.body.removeChild(movingCard); // Remove the moving card from the document
  }

  // Helper Methods

  // Helper method to sleep for a given number of milliseconds
  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Helper method to create an HTML element with a specified class
  createElementWithClass(tag, className) {
    const element = document.createElement(tag);
    element.className = className; // Assign a class name to the element
    return element; // Return the created element
  }
}

// Instantiate the StudentPicker class to initialize the student picking functionality
new StudentPicker();
