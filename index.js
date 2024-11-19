function taskFunction() {
    // Get input values
    const myDate = document.getElementById('myDate').value;
    const myProduct = document.getElementById('myProduct').value.trim();
    const unitPrice = parseFloat(document.getElementById('unitPrice').value) || 0;
    const qty = parseInt(document.getElementById('qty').value) || 0;

    // Input validation
    if (!myDate || !myProduct || unitPrice <= 0 || qty <= 0) {
        showAlert("Please fill out all fields with valid values.", "danger");
        return;
    }

    // Create a new row object
    const newRow = {
        date: myDate,
        product: myProduct,
        unitPrice: unitPrice.toFixed(2), // Format unit price
        quantity: qty,
        totalPrice: (unitPrice * qty).toFixed(2) // Calculate and format total price
    };

    // Retrieve existing data from local storage or initialize an empty array
    const existingTableData = JSON.parse(localStorage.getItem('tableData')) || [];
    existingTableData.push(newRow); // Add the new row

    // Save back to local storage
    localStorage.setItem('tableData', JSON.stringify(existingTableData));

    // Update the table and reset the form
    updateTable(existingTableData);
    document.getElementById('form').reset();
    showAlert("Expense added successfully!", "success");
}

function showAlert(message, type) {
    const alertBox = document.getElementById('myAlert');
    alertBox.innerHTML = `<div class="alert alert-${type} text-center">${message}</div>`;
    setTimeout(() => alertBox.innerHTML = '', 3000); // Clear alert after 3 seconds
}

function loadTableData() {
    const existingTableData = JSON.parse(localStorage.getItem('tableData')) || [];
    updateTable(existingTableData);
}

function updateTable(data) {
    const table_data = document.getElementById('table_data');
    table_data.innerHTML = ''; // Clear existing content
    let totalCost = 0; // Initialize total cost

    if (data.length > 0) {
        data.forEach((item, index) => {
            table_data.innerHTML += `
                <tr>
                    <td>${item.date}</td>
                    <td>${item.product}</td>
                    <td>${item.unitPrice}</td>
                    <td>${item.quantity}</td>
                    <td>${item.totalPrice}</td>
                    <td><i class="fas fa-trash-alt text-danger" onclick="del(${index})"></i></td>
                </tr>`;
            totalCost += parseFloat(item.totalPrice); // Accumulate total cost
        });

        // Append the total row
        table_data.innerHTML += `
            <tr>
                <td colspan="4" class="text-center myColor"><b>Total</b></td>
                <td colspan="2" class="myColor"><b>${totalCost.toFixed(2)}</b></td>
            </tr>`;
    } else {
        table_data.innerHTML = `<tr><td colspan="6" class="text-center">No expenses added yet.</td></tr>`;
    }
}

function del(index) {
    const existingTableData = JSON.parse(localStorage.getItem('tableData')) || [];
    existingTableData.splice(index, 1); // Remove the selected row
    localStorage.setItem('tableData', JSON.stringify(existingTableData)); // Update local storage
    updateTable(existingTableData); // Refresh table
    showAlert("Expense deleted successfully!", "success");
}

// Initialize table data on page load
document.addEventListener('DOMContentLoaded', loadTableData);
