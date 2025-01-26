const fetchMonthExpenses = (month, callback) => {
    const sheetName = encodeURIComponent(month);
    const sheetId = "1umtf3ugYjTnC5Cu18YUXKZF5U7du5QH5ZYoYTGxiKU4";
    const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;

    let expensesInfo;
    $.ajax({
        type: "GET",
        url: sheetURL,
        dataType: "text",
        success: function (response) {
            expensesInfo = $.csv.toObjects(response);
            callback(expensesInfo)
        },
        error: function(xhr, status, error) {
            // Handle error
            console.error(status, error);
            callback(null);
        }
    });
}

function calculateAccountTotals(data) {
    const accountTotals = {};
    for (const item of data) {
      const account = item.account;
      const amount = parseInt(item.amount, 10); 
      if (!accountTotals[account]) {
        accountTotals[account] = 0;
      }
      accountTotals[account] += amount;
    }
    return accountTotals;
}

function calculateCategoryTotals(data) {
    const categoryTotals = {};
    for (const item of data) {
      const category = item.category;
      const amount = parseInt(item.amount, 10); 
      if (!categoryTotals[category]) {
        categoryTotals[category] = 0;
      }
      categoryTotals[category] += amount;
    }
    return categoryTotals;
}


function objectToKeyValuePairs(obj) {
    return {
      keys: Object.keys(obj),
      values: Object.values(obj),
    };
}

function setSelectedMonth() {
    var url = window.location.href;
    const urlData = new URL(url);
    const selectedMonth = urlData.searchParams.get("month") || "jan";
    localStorage.setItem('selectedMonth', selectedMonth);
}

function getSelectedMonth() {
    return localStorage.getItem('selectedMonth') || "jan"
}

const populateDropdown = (accountArr) => {
  
  const array = accountArr; // Your account options array
  const selectElement = document.getElementById("account-select");
  const headingElement = document.getElementById("category-heading");

  // Populate the dropdown
  array.forEach(account => {
    const option = document.createElement("option");
    option.value = account;
    option.textContent = account;
    selectElement.appendChild(option);
  });

  // Handle dropdown change event
  selectElement.addEventListener("change", function () {
    const selectedAccount = this.value;
    localStorage.setItem("selectedAccount", selectedAccount); // Save to localStorage
    headingElement.textContent = `${selectedAccount} Category Statistics`; // Update the heading
  });

  // Set the initial heading from localStorage
  const savedAccount = localStorage.getItem("selectedAccount");
  if (savedAccount) {
    headingElement.textContent = `${savedAccount} Category Statistics`;
    selectElement.value = savedAccount; // Pre-select the saved account
  }

}