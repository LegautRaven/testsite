// Define the URL of the text file
const url = "data.txt";

// Get the search form and input
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

// Fetch and render all columns on page load
fetch(url)
  .then((response) => response.text())
  .then((data) => {
    const lines = data.split("\n");
    renderColumns(lines);
  });

// When the form is submitted, search for the query and render matching columns
searchForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const query = searchInput.value.toLowerCase();
  
  fetch(url)
  .then((response) => response.text())
  .then((data) => {
    const lines = data.split("\n");
    const matches = lines.filter((line) => {
      const [title, imageUrl, url, content] = line.split("|").map((piece) => piece.toLowerCase());
      return title.includes(query) || content.includes(query);
    });
    renderColumns(matches);
  });
});

// Function to render columns
function renderColumns(lines) {
  const columnsContainer = document.getElementById("columns");
  columnsContainer.innerHTML = "";

  if (lines.length === 0) {
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "No results matched your search.";
    columnsContainer.appendChild(errorMessage);
    return;
  }
  
  lines.forEach((line) => {
    const [title, imageUrl, url1, url2, content] = line.split("|");

    const column = document.createElement("div");
    column.classList.add("column");

    const titleNode = document.createElement("h2");
    titleNode.textContent = title;

    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = title;

    const contentNode = document.createElement("p");
    contentNode.textContent = content;

    const linksContainer = document.createElement("div");
    linksContainer.classList.add("links");

    const link1 = document.createElement("a");
    link1.href = url1;
    link1.target = '_blank';
    link1.textContent = "View folder";
    link1.classList.add("button", "btn-view-folder"); // Add both "button" and "btn-view-folder" classes

    const link2 = document.createElement("a");
    link2.href = url2;
    link2.target = '_blank';
    link2.textContent = "Download file";
    link2.classList.add("button", "btn-download-file"); // Add both "button" and "btn-download-file" classes

    linksContainer.appendChild(link1);
    linksContainer.appendChild(link2);

    column.appendChild(titleNode);
    column.appendChild(image);
    column.appendChild(contentNode);
    column.appendChild(linksContainer);

    columnsContainer.appendChild(column);
  });
}