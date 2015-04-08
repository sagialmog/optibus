// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {'packages':['bar']});

// Set a callback to run when the Google Visualization API is loaded.
google.setOnLoadCallback(drawBusesChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawBusesChart() {

	getJSON('/api/optibus/').then(function(data){
		chartData = aggregateBusData(data);
		var data = google.visualization.arrayToDataTable([
			['Hour', 'Buses amount'],
			['00:00', chartData[0]],
			['01:00', chartData[1]],
			['02:00', chartData[2]],
			['03:00', chartData[3]],
			['04:00', chartData[4]],
			['05:00', chartData[5]],
			['06:00', chartData[6]],
			['07:00', chartData[7]],
			['08:00', chartData[8]],
			['09:00', chartData[9]],
			['10:00', chartData[10]],
			['11:00', chartData[11]],
			['12:00', chartData[12]],
			['13:00', chartData[13]],
			['14:00', chartData[14]],
			['05:00', chartData[15]],
			['16:00', chartData[16]],
			['17:00', chartData[17]],
			['18:00', chartData[18]],
			['19:00', chartData[19]],
			['20:00', chartData[20]],
			['21:00', chartData[21]],
			['22:00', chartData[22]],
			['23:00', chartData[23]]
		]);
		var options = {
          legend: { position: 'none' },
		  vAxis: {title: "Buses amount"},
		  hAxis: {title: "Hour"},
          bar: { groupWidth: "90%" }
        };
		
		// Instantiate and draw our chart, passing in some options.
		var chart = new google.charts.Bar(document.getElementById('bus-chart'));
		chart.draw(data , google.charts.Bar.convertOptions(options));
		document.getElementsByClassName('loader')[0].style.display='none'
	});
}




function getJSON(url) {
  return new Promise(function(resolve, reject){
    var xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.onreadystatechange = handler;
    xhr.responseType = 'json';
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send();

    function handler() {
      if (this.readyState === this.DONE) {
        if (this.status === 200) {
          resolve(this.response);
        } else {
          reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
        }
      }
    };
  });
}


function aggregateBusData(data){
	  var houres = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; //24 houres.
	  data.forEach(function(value , index){
		start = new Date(value.startTime);
		end = new Date(value.endTime);
		start.setMinutes(0); //round down;
		end.setMinutes(0); //round down;
		diffHours =  Math.abs(end - start) / 36e5;
		for (var i=0; i <= diffHours; i++){
		  currentIndex = (start.getHours() + i) % 24;
		  houres[currentIndex] +=1;
		}
	  });
  return houres;	   
}








