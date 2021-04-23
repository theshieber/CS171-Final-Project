
var width = $("#chart-area").width(),
	height = 500;

var margin = {top: 40, right: 40, bottom: 75, left: 40};

var svg = d3.select("#chart-area").append("svg")
    .attr("width", width+margin.left+margin.right)
    .attr("height", height+margin.top+margin.bottom);

//var yScale = d3.scaleLinear()
//	.domain([0, 1]);

var gameData;
var wlratioData;
var teamNames = [];
var dates = [];

var parseDate = d3.timeParse("%m/%d/%Y");

wrangleData();

function wrangleData() {
	d3.csv("data/placeholderData.csv", function(csv){

		gameTeamDict = {}
		wlratioTeamDict = {}

		csv.forEach(function(d){

			curGameTeamDict = {};
			curwlRatioTeamDict = {};

			winNum = 0.0;
			gameNum = 0.0;

			var test = 6

			//console.log(test/7)

			for(var key in d) {

				if(key == 'team') {
					gameTeamDict[d['team']] = curGameTeamDict;
					wlratioTeamDict[d['team']] = curwlRatioTeamDict;
					teamNames.push(d['team'])
				}
				else {
					if(+d[key] == 1){
						winNum += 1
					}
					gameNum += (+d[key])**2;

					//console.log("key", key);
					//console.log("team", d['team']);
					//console.log("winNum", winNum);
					//console.log("gameNum", gameNum);

					curGameTeamDict[parseDate(key)] = +d[key];
					curwlRatioTeamDict[parseDate(key)] = winNum/gameNum;
					dates.push[parseDate(key)];
				}
			}
		});
		for(var key in gameTeamDict[teamNames[0]]) {
			dates.push(key);
		}

		gameData = gameTeamDict;
		wlratioData = wlratioTeamDict;


		updateVis();
	});
}

function updateVis() {

	var cellPadding = 10;

	var cellHeight = (height/teamNames.length)-cellPadding
	var cellWidth = ((width/2)/dates.length)-cellPadding;

	console.log(gameData);
	console.log(wlratioData);
	console.log(teamNames);
	console.log(dates);
	console.log(cellHeight);
	console.log(cellWidth);

	//yScale.range([cellHeight, 0]);

	var squareUpdate = svg.selectAll("rect")
		.data(teamNames);

	console.log(teamNames.length);
	console.log(dates.length);

	//console.log(dates.length);
	for(var row = 0; row < teamNames.length; row++){

		//var wlRowData = [];

		for(var column = 0; column < dates.length; column++){

			//wlRowData.push(wlratioData[teamNames[row]][dates[column]]);
			squareUpdate.enter()
				.append("rect")
				.merge(squareUpdate)
				.transition()
				.duration(1000)
				.attr("x", function(d) {
					console.log("test")
					//return 10;
					return column*cellWidth+cellPadding;
				})
				.attr("y", function(d) {
					//return 10;
					return row*cellHeight+cellPadding;
				})
				.attr("width", cellWidth-10)
				.attr("height", cellHeight-10)
				.attr("fill", function(d) {
					if(gameData[teamNames[row]][dates[column]] == 1){
						return "orange";
					}
					else if(gameData[teamNames[row]][dates[column]] == -1){
						return "teal";
					}
					else{
						return "lightgray";
					}
				});
			
		}

		/*

		var line = d3.line()
		    .x(function(d, index) {
		    	console.log(index)
				return index*cellWidth;
		    })
		    .y(function(d) {
		    	if (yScale(d) >= 0 && yScale(d) <= 1){
		    		return yScale(d);	
		    	}
		    	else {
		    		return 0;
		    	}
		    });

		//console.log("test")

		svg.append("path")
		   	.datum(wlRowData)
		   	.attr("class", "line")
		   	.attr("d", line);

		pathUpdate.enter()
			.append("path")
			.merge(pathUpdate)
			.attr("class", "line")
		   	.attr("fill", "none")
		   	.attr("stroke", "red")
		   	.attr("d", line);
		*/
	}
}

