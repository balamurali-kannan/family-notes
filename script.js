// Sample initial data
const initialData = [
  { date: '2024-01-01', weekday: 'Monday', breakfast: 'Omelette', snack: 'Fruit', dinner: 'Grilled Chicken' },
  { date: '2024-01-02', weekday: 'Tuesday', breakfast: 'Yogurt', snack: 'Nuts', dinner: 'Pasta' }
];

// Function to populate the table with initial data
function populateTable() {
  const tableBody = document.querySelector('#meal-table tbody');

  initialData.forEach(entry => {
    const row = tableBody.insertRow();
    addCell(row, entry.date);
    addCell(row, entry.weekday);
    addCell(row, entry.breakfast);
    addCell(row, entry.snack);
    addCell(row, entry.dinner);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => removeRow(row));
    row.insertCell(5).appendChild(removeButton);
  });
}

// Function to add a new row to the table
function addRow() {
  const tableBody = document.querySelector('#meal-table tbody');
  const row = tableBody.insertRow();
  addCell(row, '');
  addCell(row, '');
  addCell(row, '');
  addCell(row, '');
  addCell(row, '');

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.addEventListener('click', () => removeRow(row));
  row.insertCell(5).appendChild(removeButton);

  updateLocalStorage();
}

// Function to remove a row from the table
function removeRow(row) {
  const tableBody = document.querySelector('#meal-table tbody');
  tableBody.deleteRow(row.rowIndex - 1); // Subtract 1 to adjust for header row
  updateLocalStorage();
}

// Function to add a cell to a row
function addCell(row, content) {
  const cell = row.insertCell();
  cell.contentEditable = true;
  cell.textContent = content;
}

// Function to update local storage with the current table data
function updateLocalStorage() {
  const tableRows = document.querySelectorAll('#meal-table tbody tr');
  const tableData = Array.from(tableRows).map(row => ({
    date: row.cells[0].textContent,
    weekday: row.cells[1].textContent,
    breakfast: row.cells[2].textContent,
    snack: row.cells[3].textContent,
    dinner: row.cells[4].textContent
  }));

  localStorage.setItem('mealData', JSON.stringify(tableData));
}

// Function to populate the table with data from local storage
function populateTable() {
  const tableBody = document.querySelector('#meal-table tbody');
  const storedData = JSON.parse(localStorage.getItem('mealData')) || [];

  storedData.forEach(entry => {
    const row = tableBody.insertRow();
    addCell(row, entry.date);
    addCell(row, entry.weekday);
    addCell(row, entry.breakfast);
    addCell(row, entry.snack);
    addCell(row, entry.dinner);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => removeRow(row));
    row.insertCell(5).appendChild(removeButton);
  });
}

// Initialize the table with data from local storage
populateTable();

