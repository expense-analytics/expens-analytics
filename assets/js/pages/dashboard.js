var optionsProfileVisit = {
	annotations: {
		position: 'back'
	},
	dataLabels: {
		enabled:false
	},
	chart: {
		type: 'bar',
		height: 300
	},
	fill: {
		opacity:1
	},
	plotOptions: {
	},
	series: [{
		name: 'sales',
		data: [9,20,30,20,10,20,30,20,10,20,30,20]
	}],
	colors: '#435ebe',
	xaxis: {
		categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul", "Aug","Sep","Oct","Nov","Dec"],
	},
}
let optionsVisitorsProfile  = {
	series: [70, 30],
	labels: ['Male', 'Female'],
	colors: ['#435ebe','#55c6e8'],
	chart: {
		type: 'donut',
		width: '100%',
		height:'350px'
	},
	legend: {
		position: 'bottom'
	},
	plotOptions: {
		pie: {
			donut: {
				size: '30%'
			}
		}
	}
}

var optionsEurope = {
	series: [{
		name: 'series1',
		data: [310, 800, 600, 430, 540, 340, 605, 805,430, 540, 340, 605]
	}],
	chart: {
		height: 80,
		type: 'area',
		toolbar: {
			show:false,
		},
	},
	colors: ['#5350e9'],
	stroke: {
		width: 2,
	},
	grid: {
		show:false,
	},
	dataLabels: {
		enabled: false
	},
	xaxis: {
		type: 'datetime',
		categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z","2018-09-19T07:30:00.000Z","2018-09-19T08:30:00.000Z","2018-09-19T09:30:00.000Z","2018-09-19T10:30:00.000Z","2018-09-19T11:30:00.000Z"],
		axisBorder: {
			show:false
		},
		axisTicks: {
			show:false
		},
		labels: {
			show:false,
		}
	},
	show:false,
	yaxis: {
		labels: {
			show:false,
		},
	},
	tooltip: {
		x: {
			format: 'dd/MM/yy HH:mm'
		},
	},
};

let optionsAmerica = {
	...optionsEurope,
	colors: ['#008b75'],
}
let optionsIndonesia = {
	...optionsEurope,
	colors: ['#dc3545'],
}


fetchMonthExpenses(`${getSelectedMonth()}24`, ((expensesInfo) => {
	if(expensesInfo){
		
		//for account****************
		const accountTotals = calculateAccountTotals(expensesInfo);
		const keyValueAccountObject = objectToKeyValuePairs(accountTotals);

		//account bar chart
		optionsProfileVisit.xaxis.categories = keyValueAccountObject.keys
		optionsProfileVisit.series = [{name: "Account", data: keyValueAccountObject.values}]
		var janAccountChart = new ApexCharts(document.querySelector("#account-bar-chart"), optionsProfileVisit);
		janAccountChart.render();

		//account Pie chart
		optionsVisitorsProfile.series = keyValueAccountObject.values
		optionsVisitorsProfile.labels = keyValueAccountObject.keys
		var chartVisitorsProfile = new ApexCharts(document.getElementById('account-pie-chart'), optionsVisitorsProfile)
		chartVisitorsProfile.render()

		//for category***************
		const categoryTotals = calculateCategoryTotals(expensesInfo);
		const keyValueCategoryObject = objectToKeyValuePairs(categoryTotals);

		//account bar chart
		optionsProfileVisit.xaxis.categories = keyValueCategoryObject.keys
		optionsProfileVisit.series = [{name: "Account", data: keyValueCategoryObject.values}]
		var janAccountChart = new ApexCharts(document.querySelector("#category-bar-chart"), optionsProfileVisit);
		janAccountChart.render();
		
		//account Pie chart
		optionsVisitorsProfile.series = keyValueCategoryObject.values
		optionsVisitorsProfile.labels = keyValueCategoryObject.keys
		var chartVisitorsProfile = new ApexCharts(document.getElementById('category-pie-chart'), optionsVisitorsProfile)
		chartVisitorsProfile.render()

		//for daily***************
		const dailyExpensesInfo = expensesInfo.filter( item => item.account === "Daily")
		const dailyCategoryTotals = calculateCategoryTotals(dailyExpensesInfo);
		const keyValueDailyCategoryObject = objectToKeyValuePairs(dailyCategoryTotals);

		//account bar chart
		optionsProfileVisit.xaxis.categories = keyValueDailyCategoryObject.keys
		optionsProfileVisit.series = [{name: "Account", data: keyValueDailyCategoryObject.values}]
		var janAccountChart = new ApexCharts(document.querySelector("#daily-category-bar-chart"), optionsProfileVisit);
		janAccountChart.render();
		
		//account Pie chart
		optionsVisitorsProfile.series = keyValueDailyCategoryObject.values
		optionsVisitorsProfile.labels = keyValueDailyCategoryObject.keys
		var chartVisitorsProfile = new ApexCharts(document.getElementById('daily-category-pie-chart'), optionsVisitorsProfile)
		chartVisitorsProfile.render()


	}
}))


var chartProfileVisit = new ApexCharts(document.querySelector("#chart-profile-visit"), optionsProfileVisit);
var chartVisitorsProfile = new ApexCharts(document.getElementById('chart-visitors-profile'), optionsVisitorsProfile)
var chartEurope = new ApexCharts(document.querySelector("#chart-europe"), optionsEurope);
var chartAmerica = new ApexCharts(document.querySelector("#chart-america"), optionsAmerica);
var chartIndonesia = new ApexCharts(document.querySelector("#chart-indonesia"), optionsIndonesia);

chartIndonesia.render();
chartAmerica.render();
chartEurope.render();
chartProfileVisit.render();
chartVisitorsProfile.render()