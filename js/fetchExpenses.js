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