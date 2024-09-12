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

class StudentPicker {
  constructor() {
    this.studentList = document.getElementById("studentList");
    this.pickedStudentCard = document.getElementById("pickedStudentCard");
    this.pickButton = document.getElementById("pickButton");
    this.editButton = document.getElementById("editButton");
    this.availableStudents = [...students];
    this.isEditMode = false;

    this.initializeUI();
  }

  initializeUI() {
    this.createStudentCards();
    this.pickButton.addEventListener("click", () => this.pickRandomStudent());
    this.editButton.addEventListener("click", () => this.toggleEditMode());
  }

  createStudentCards() {
    this.studentList.innerHTML = "";
    this.availableStudents.forEach((student) => {
      const card = this.createStudentCard(student);
      this.studentList.appendChild(card);
    });
  }

  createStudentCard(student) {
    const card = this.createElement("div", "student-card");
    card.textContent = student;
    card.dataset.student = student;

    const removeButton = this.createElement("button", "remove-button");
    removeButton.textContent = "x";
    removeButton.style.display = "none";
    removeButton.addEventListener("click", (e) => this.toggleStudentRemoval(e));

    card.appendChild(removeButton);
    return card;
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    this.editButton.textContent = this.isEditMode ? "Done" : "Edit";
    this.pickButton.disabled = this.isEditMode;

    this.toggleRemoveButtons();

    if (!this.isEditMode) {
      this.applyRemovals();
    }
  }

  toggleRemoveButtons() {
    const removeButtons = document.querySelectorAll(".remove-button");
    const display = this.isEditMode ? "block" : "none";
    removeButtons.forEach((button) => (button.style.display = display));
  }

  toggleStudentRemoval(event) {
    const card = event.target.closest(".student-card");
    card.classList.toggle("crossed-out");
  }

  applyRemovals() {
    const crossedOutCards = document.querySelectorAll(".student-card.crossed-out");
    crossedOutCards.forEach((card) => {
      const student = card.dataset.student;
      this.availableStudents = this.availableStudents.filter((s) => s !== student);
      card.remove();
    });
  }

  async pickRandomStudent() {
    if (this.availableStudents.length === 0) {
      this.pickedStudentCard.textContent = "All students have been picked!";
      this.pickButton.disabled = true;
      return;
    }

    this.pickButton.disabled = true;
    await this.animateCards();

    const student = this.getRandomStudent();
    const selectedCard = this.findStudentCard(student);

    await this.animateCardMovement(selectedCard, student);

    this.updatePickedStudent(student);
    selectedCard.remove();
    this.pickButton.disabled = false;
  }

  getRandomStudent() {
    const index = Math.floor(Math.random() * this.availableStudents.length);
    return this.availableStudents.splice(index, 1)[0];
  }

  findStudentCard(student) {
    return this.studentList.querySelector(`[data-student="${student}"]`);
  }

  async animateCards() {
    const cards = document.querySelectorAll(".student-card");
    await this.jiggleCards(cards);
    await this.delay(500);
    await this.unjiggleCards(cards);
    await this.delay(200);
  }

  async jiggleCards(cards) {
    for (const card of cards) {
      card.classList.add("jiggling");
      await this.delay(15);
    }
  }

  async unjiggleCards(cards) {
    for (const card of cards) {
      card.classList.remove("jiggling");
      await this.delay(25);
    }
  }

  async animateCardMovement(card, student) {
    const movingCard = this.createElement("div", "moving-card");
    movingCard.textContent = student;
    document.body.appendChild(movingCard);

    const startRect = card.getBoundingClientRect();
    const endRect = this.pickedStudentCard.getBoundingClientRect();

    this.setCardStyle(movingCard, startRect);
    await this.delay(50);
    this.setCardStyle(movingCard, endRect);

    await this.delay(500);
    movingCard.remove();
  }

  setCardStyle(card, rect) {
    Object.assign(card.style, {
      left: `${rect.left}px`,
      top: `${rect.top}px`,
    });
  }

  updatePickedStudent(student) {
    this.pickedStudentCard.textContent = student;
  }

  createElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Instantiate the StudentPicker class
new StudentPicker();
