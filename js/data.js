'use strict';

let dataArray = null;

d3.csv("../data/data.csv").then(function(data) {
  dataArray = data;
  // d3.select('ul')
  //   .selectAll('li')
  //   .data(dataArray)
  //   .enter()
  //   .append('li')
  //   .text(function(d) { return d.location_name });
  console.log('finished');
  console.log(dataArray);
  var barHeight = 20;
  var test = [80, 120, 60, 150, 200];
  var bar = d3.select('svg')
    .selectAll('rect')
    .data(dataArray)
    .enter()
    .append('rect')
    .attr('width', d => d.val * 300)
    .attr('height', barHeight - 1)
    .attr('transform', function(d, i) {
      console.log(dataArray.length);
      return "translate(0," + i * barHeight + ")";
    })
})

d3.select('h3').style('color', 'darkblue');
d3.select('h3').style('font-size', '24px');

d3.select('#btn')
  .on('click', function () {
    d3.select('body')
      .append('h3')
      .text('Today is a beautiful day!!');
  });
