'use strict';

let dataArray = null;

const yearMap = {};
function Country(name, rate) {
  this.name = name,
  this.rate = rate
}

d3.csv("../data/data.csv").then(function(data) {
  dataArray = data;
  for (let i = 0; i < dataArray.length; i++) {
    const country = dataArray[i].location_name;
    const rate = dataArray[i].val;
    if (!yearMap[dataArray[i].year] && dataArray[i].sex_name === 'Both') {
      yearMap[dataArray[i].year] = {};
      yearMap[dataArray[i].year][country] = rate; 
    } else if (dataArray[i].sex_name === 'Both') {
      yearMap[dataArray[i].year][country] = rate;
      // Object.keys(yearMap[dataArray[i].year]).sort();
    }
  }
});


d3.select('h3').style('color', 'darkblue');
d3.select('h3').style('font-size', '24px');

d3.select('#btn')
  .on('click', function () {
    d3.select('body')
      .append('h3')
      .text('Today is a beautiful day!!');
  });

const year90 = [];

  // d3.select('ul')
  //   .selectAll('li')
  //   .data(dataArray)
  //   .enter()
  //   .append('li')
  //   .text(function(d) { return d.location_name });
  // console.log('finished');
  // console.log(dataArray);
  // var barHeight = 20;
  // var test = [80, 120, 60, 150, 200];
  // var bar = d3.select('svg')
  //   .selectAll('rect')
  //   .data(dataArray)
  //   .enter()
  //   .append('rect')
  //   .attr('width', d => d.val * 300)
  //   .attr('height', barHeight - 1)
  //   .attr('transform', function(d, i) {
  //     console.log(dataArray.length);
  //     return "translate(0," + i * barHeight + ")";
  //   })