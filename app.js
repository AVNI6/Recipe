const recipeContainer = document.getElementById("recipeContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const vegFilter = document.getElementById("vegFilter");
const timeFilter = document.getElementById("timeFilter");

const modal = document.getElementById("recipeModal");
const closeModalBtn = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalDescription = document.getElementById("modalDescription");
const modalIngredients = document.getElementById("modalIngredients");
const modalInstructions = document.getElementById("modalInstructions");

function getTimeInMinutes(timeStr) {
  const match = timeStr.match(/\d+/);
  return match ? parseInt(match[0]) : 0;
}

function displayRecipes(recipesToShow) {
  recipeContainer.innerHTML = "";

  if (recipesToShow.length === 0) {
    recipeContainer.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  recipesToShow.forEach((recipe, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.name}" />
      <h3>${recipe.name}</h3>
      <p>${recipe.description}</p>
    `;

    card.addEventListener("click", () => showModal(recipe));
    recipeContainer.appendChild(card);
  });
}

function showModal(recipe) {
  modalTitle.textContent = recipe.name;
  modalImage.src = recipe.image;
  modalImage.alt = recipe.name;
  modalDescription.textContent = recipe.benefits || recipe.description;

  modalIngredients.innerHTML = "";
  recipe.ingredients.forEach(ing => {
    const li = document.createElement("li");
    li.textContent = ing;
    modalIngredients.appendChild(li);
  });

  modalInstructions.innerHTML = "";
  recipe.instructions.forEach(inst => {
    const li = document.createElement("li");
    li.innerHTML = inst;  
    modalInstructions.appendChild(li);
  });

  modal.style.display = "flex";
}

closeModalBtn.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase();
  const category = categoryFilter.value;
  const veg = vegFilter.value;
  const maxTime = parseInt(timeFilter.value);

  const filtered = recipes.filter(recipe => {
    const timeMins = getTimeInMinutes(recipe.time);
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm) || recipe.description.toLowerCase().includes(searchTerm);
    const categoryMatch = !category || recipe.category === category;
    const vegMatch = veg === "" || String(recipe.vegetarian) === veg;
    const timeMatch = !maxTime || timeMins <= maxTime;

    return matchesSearch && categoryMatch && vegMatch && timeMatch;
  });

  displayRecipes(filtered);
}

searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);
vegFilter.addEventListener("change", applyFilters);
timeFilter.addEventListener("change", applyFilters);

displayRecipes(recipes);
