const data_url = "https://script.google.com/macros/s/AKfycbxsrSih1KNt_B6lHGjjCPLA6PBLUgpSMbpELJ1iFNI6XVVY288zYI1E6H-FK9SzOW5Zqg/exec";
var data;
var currentSelect = null;
var highestWealth = -1;
var lowestWealth = 1000;
var highestTaxation = -1
var lowestTaxation = 1000;
var highestSecurity = -1;
var lowestSecurity = 1000;
var highestUnrest = -1;
var lowestUnrest = 1000;
var highestSlotsRemaining = -1;
var lowestSlotsRemaining = 1000;

var defaultColours = {};
var ownerColours = {
	"House Chaurus": `rgba(255, 0, 0, 0.33)`,
	"Polar States": `rgba(82, 224, 224, 0.33)`,
	"Cliff States": `rgba(80, 80, 80, 0.6)`,
	"Crinian Descendants": `rgba(0, 107, 0, 0.33)`,
	"Launine States": `rgba(0, 107, 232, 0.33)`,
	"Imperial Service": `rgba(182, 0, 183, 0.33)`,
	"House Aleph": `rgba(255, 147, 0, 0.33)`,
	"Mountain Peoples": `rgba(38, 17, 17, 0.63)`,
	"Equatorial States": `rgba(255, 255, 44, 0.33)`,
}

/* This code is dogshit btw. Ex fucking dee*/

function escapeHtml(unsafe) {
	if (typeof unsafe === 'string' || unsafe instanceof String) {
		return unsafe
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
	}
	else {
		return unsafe;
	}
  }

async function loadData() {
	data_response = await fetch(data_url, { method: "GET" });
	data_json = await data_response.json();
	console.log(data_json);

	headers = data_json.data[0];
	var structured = [];

	for(var i = 0; i < data_json.data.length; i++) {
		structured.push({
			"ID": data_json.data[i][0],
			"Name": data_json.data[i][1],
			"Owner": data_json.data[i][2],
			"Wealth": data_json.data[i][3],
			"Taxation": data_json.data[i][4],
			"Security": data_json.data[i][5],
			"Unrest": data_json.data[i][6],
			"Services_Provided": data_json.data[i][7],
			"Services_Required": data_json.data[i][8],
			"Rural_Slots": data_json.data[i][9],
			"Urban_Slots": data_json.data[i][10],
			"Resource": data_json.data[i][11],
			"Rural_Buildings": data_json.data[i][12],
			"Urban_Buildings": data_json.data[i][13],
			"Resource_Buildings": data_json.data[i][14],
		})

		// Generate statistics.
		if (highestWealth < data_json.data[i][3]) {
			highestWealth = data_json.data[i][3];
		}
		if (lowestWealth > data_json.data[i][3]) {
			lowestWealth = data_json.data[i][3];
		}

		if (highestTaxation < data_json.data[i][4]) {
			highestTaxation = data_json.data[i][4];
		}
		if (lowestTaxation > data_json.data[i][4]) {
			lowestTaxation = data_json.data[i][4];
		}

		if (highestSecurity < data_json.data[i][5]) {
			highestSecurity = data_json.data[i][5];
		}
		if (lowestSecurity > data_json.data[i][5]) {
			lowestSecurity = data_json.data[i][5];
		}

		if (highestUnrest < data_json.data[i][6]) {
			highestUnrest = data_json.data[i][6];
		}
		if (lowestUnrest > data_json.data[i][6]) {
			lowestUnrest = data_json.data[i][6];
		}

		SlotsTotal = data_json.data[i][9] + data_json.data[i][10];
		SlotsTotal -= String(data_json.data[i][12]).split("\n").length;
		SlotsTotal -= String(data_json.data[i][13]).split("\n").length;
		structured[i].Slots_Remaining = SlotsTotal;

		if (highestSlotsRemaining < SlotsTotal) {
			highestSlotsRemaining = SlotsTotal;
		}
		if (lowestSlotsRemaining > SlotsTotal) {
			lowestSlotsRemaining = SlotsTotal;
		}
	}

	return structured;
}

var svgDoc = document.getElementById("map")
for (let r = 1; r < 23; r++) {
	defaultColours[`region_${r}`] = svgDoc.getElementById(`region_${r}`).style.fill;
}

loadData().then(
	(value) => { 
		document.getElementById("loadingMessage").remove();
		document.getElementById("dimScreen").remove();
		data = value; 
		var buttons = document.getElementsByClassName('mm_button');
		// Enable buttons :)
		for(var i = 0; i < buttons.length; i++) {
			buttons[i].disabled = false;
		}

		for (let r = 1; r < 23; r++) {
			svgDoc.getElementById(`region_${r}`).addEventListener(
				"click", (event) => {
					const region_id = event.target.id.replace("region_", "");
					document.getElementById("data_out_ID").innerText = escapeHtml(data[region_id].ID);
					document.getElementById("data_out_Name").innerText = escapeHtml(data[region_id].Name);
					document.getElementById("data_out_Owner").innerText = escapeHtml(data[region_id].Owner);
					document.getElementById("data_out_Wealth").innerText = escapeHtml(data[region_id].Wealth);
					document.getElementById("data_out_Taxation").innerText = escapeHtml(data[region_id].Taxation);
					document.getElementById("data_out_Security").innerText = escapeHtml(data[region_id].Security);
					document.getElementById("data_out_Unrest").innerText = escapeHtml(data[region_id].Unrest);
					document.getElementById("data_out_Services_Provided").innerText = escapeHtml(data[region_id].Services_Provided);
					document.getElementById("data_out_Services_Required").innerText = escapeHtml(data[region_id].Services_Required);
					document.getElementById("data_out_Rural_Slots").innerText = escapeHtml(data[region_id].Rural_Slots);
					document.getElementById("data_out_Urban_Slots").innerText = escapeHtml(data[region_id].Urban_Slots);
					document.getElementById("data_out_Resource").innerText = escapeHtml(data[region_id].Resource);
					document.getElementById("data_out_Rural_Buildings").innerText = escapeHtml(data[region_id].Rural_Buildings);
					document.getElementById("data_out_Urban_Buildings").innerText = escapeHtml(data[region_id].Urban_Buildings);
					document.getElementById("data_out_Resource_Buildings").innerText = escapeHtml(data[region_id].Resource_Buildings);
					svgDoc.lastChild.after(document.getElementById(event.target.id));

					if (currentSelect != null) {
						currentSelect.style.stroke="#ff0000";
						currentSelect.style.strokeDasharray = null;
						currentSelect.style.animation = "";
					}
					event.target.style.stroke = "#ffd339ff";
					event.target.style.strokeDasharray = 15;
					event.target.style.animation = "dash 10s linear infinite";
					currentSelect = event.target;
				}
			)
		}
	}
);

function showMapMode(mapmode) {
	switch (mapmode) {
		case "wealth":
			doWealthMapMode();
			break;
		case "taxation":
			doTaxationMapMode();
			break;
		case "security":
			doSecurityMapMode();
			break;
		case "unrest":
			doUnrestMapMode();
			break;
		case "owner":
			doOwnerMapMode();
			break;
		case "location":
			doLocationMapMode();
			break;
		case "slots_remaining":
			doSlotsRemainingMapMode();
			break;
		default:
			alert(`No map mode named ${mapmode}.`);
			break;
	}
}

function doWealthMapMode() {
	if (lowestWealth == highestWealth) {
		for (let r = 1; r < 23; r++) {
			svgDoc.getElementById(`region_${r}`).style.fill = "#ffff0054";
		}
		return;
	}
	range = highestWealth - lowestWealth;
	for (let r = 1; r < 23; r++) {
		region_data = data[r];
		diffFromHighest = (highestWealth - region_data.Wealth) / range;
		diffFromLowest =  (region_data.Wealth - lowestWealth) / range;
		Green = 255 * diffFromLowest;
		Red = 255 * diffFromHighest
		svgDoc.getElementById(`region_${r}`).style.fill = `rgba(${Red}, ${Green}, 0, 0.33)`
	}
}

function doTaxationMapMode() {
	if (lowestTaxation == highestTaxation) {
		for (let r = 1; r < 23; r++) {
			svgDoc.getElementById(`region_${r}`).style.fill = "#ffff0054";
		}
		return;
	}
	range = highestTaxation - lowestTaxation;
	for (let r = 1; r < 23; r++) {
		region_data = data[r];
		diffFromHighest = (highestTaxation - region_data.Taxation) / range;
		diffFromLowest =  (region_data.Taxation - lowestTaxation) / range;
		Green = 255 * diffFromLowest;
		Red = 255 * diffFromHighest
		svgDoc.getElementById(`region_${r}`).style.fill = `rgba(${Red}, ${Green}, 0, 0.33)`
	}
}

function doSecurityMapMode() {
	if (lowestSecurity == highestSecurity) {
		for (let r = 1; r < 23; r++) {
			svgDoc.getElementById(`region_${r}`).style.fill = "#ffff0054";
		}
		return;
	}
	range = highestSecurity - lowestSecurity;
	for (let r = 1; r < 23; r++) {
		region_data = data[r];
		diffFromHighest = (highestSecurity - region_data.Security) / range;
		diffFromLowest =  (region_data.Security - lowestSecurity) / range;
		Green = 255 * diffFromLowest;
		Red = 255 * diffFromHighest
		svgDoc.getElementById(`region_${r}`).style.fill = `rgba(${Red}, ${Green}, 0, 0.33)`
	}
}

function doUnrestMapMode() {
	if (lowestUnrest == highestUnrest) {
		for (let r = 1; r < 23; r++) {
			svgDoc.getElementById(`region_${r}`).style.fill = "#ffff0054";
		}
		return;
	}
	range = highestUnrest - lowestUnrest;
	for (let r = 1; r < 23; r++) {
		region_data = data[r];
		diffFromHighest = (highestUnrest - region_data.Unrest) / range;
		diffFromLowest =  (region_data.Unrest - lowestUnrest) / range;
		Green = 255 * diffFromHighest;
		Red = 255 * diffFromLowest
		svgDoc.getElementById(`region_${r}`).style.fill = `rgba(${Red}, ${Green}, 0, 0.33)`
	}
}

function doOwnerMapMode() {
	for (let r = 1; r < 23; r++) {
		region_data = data[r];
		svgDoc.getElementById(`region_${r}`).style.fill = ownerColours[region_data.Owner];
	}	
}

function doLocationMapMode() {
	for (let r = 1; r < 23; r++) {
		svgDoc.getElementById(`region_${r}`).style.fill = defaultColours[`region_${r}`];

	}
}

function doSlotsRemainingMapMode() {
if (lowestSlotsRemaining == highestSlotsRemaining) {
		for (let r = 1; r < 23; r++) {
			svgDoc.getElementById(`region_${r}`).style.fill = "#ffff0054";
		}
		return;
	}
	range = highestSlotsRemaining - lowestSlotsRemaining;
	for (let r = 1; r < 23; r++) {
		region_data = data[r];
		diffFromHighest = (highestSlotsRemaining - region_data.Slots_Remaining) / range;
		diffFromLowest =  (region_data.Slots_Remaining - lowestSlotsRemaining) / range;
		Green = 255 * diffFromLowest;
		Red = 255 * diffFromHighest;
		svgDoc.getElementById(`region_${r}`).style.fill = `rgba(${Red}, ${Green}, 0, 0.33)`
	}
}