function taskFunction() {
    const myDate = document.getElementById('myDate').value;
    const myProduct = document.getElementById('myProduct').value;
    const unitPrice = parseFloat(document.getElementById('unitPrice').value) || 0;
    const qty = parseInt(document.getElementById('qty').value) || 0;

    // Create an object for the new row
    const newRow = {
        date: myDate,
        product: myProduct,
        unitPrice: unitPrice,
        quantity: qty,
        totalPrice: unitPrice * qty
    };

    // Get existing table data from local storage and initialize as an empty array if it’s null
    const existingTableData = JSON.parse(localStorage.getItem('tableData')) || [];
    existingTableData.push(newRow); // Add the new row to the array

    // Save the updated array back to local storage
    localStorage.setItem('tableData', JSON.stringify(existingTableData));

    // Update the table on the page
    updateTable(existingTableData);
    addData();
}

function addData() {
    document.getElementById('myAlert').innerHTML = `<div class="alert alert-success text-center">
        Expenses added successfully
    </div>`;
}

function loadTableData() {
    const existingTableData = JSON.parse(localStorage.getItem('tableData')) || [];
    updateTable(existingTableData);
}

function updateTable(data) {
    const table_data = document.getElementById('table_data');
    table_data.innerHTML = ''; // Clear existing content of the table
    let totalCost = 0; // Initialize total cost

    if (data && data.length > 0) { // Only iterate if data exists
        data.forEach(item => {
            table_data.innerHTML += `<tr>
                <td>${item.date}</td>
                <td>${item.product}</td>
                <td>${item.unitPrice}</td>
                <td>${item.quantity}</td>
                <td>${item.totalPrice}</td>
                <td><i class="fas fa-trash-alt ms-3" onclick='del(this)'></i></td>
            </tr>`;
            totalCost += item.totalPrice;
        });

        // Append the total row
        table_data.innerHTML += `
            <tr>
                <td colspan="4" class="text-center myColor"><b>Total</b></td>
                <td colspan="2" class="myColor"><b>${totalCost}</b></td>
            </tr>`;
    }
}

function del(e) {
    console.log('clicked');
    const rem = e.parentNode.parentNode;
    const indexToRemove = rem.rowIndex - 1; // Adjust index for header row if needed
    rem.remove();

    const existingTableData = JSON.parse(localStorage.getItem('tableData')) || [];
    existingTableData.splice(indexToRemove, 1);
    localStorage.setItem('tableData', JSON.stringify(existingTableData));
    updateTable(existingTableData);
    deleteAlert();
}

function deleteAlert() {
    document.getElementById('myAlert').innerHTML = `<div class="alert alert-success text-center">
        Expense deleted successfully
    </div>`;
}

document.addEventListener('DOMContentLoaded', loadTableData);
