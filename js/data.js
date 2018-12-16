'use strict';

const maleOrFemale = {};
const males = {};
const females = {};

let topTen = [];

d3.csv("../data/data.csv").then(function(data) {
  for (let i = 0; i < data.length; i++) {
    switch (data[i].sex_name) {
      case "Male":
        populateData(males, data[i]);
        break;
      case "Female":
        populateData(females, data[i]);
        break;
      default:
        populateData(maleOrFemale, data[i]);
    }
  }
  // findTopTen(males, 1995);
  // renderGraph(topTen);
  // console.log(topTen);
  populateYear();
});

// d3.csv("./data/data.csv").then(function(data) {
//   for (let i = 0; i < data.length; i++) {
//     switch (data[i].sex_name) {
//       case "Male":
//         populateData(males, data[i]);
//         break;
//       case "Female":
//         populateData(females, data[i]);
//         break;
//       default:
//         populateData(maleOrFemale, data[i]);
//     }
//   }
//   // findTopTen(males, 1995);
//   // renderGraph(topTen);
//   // console.log(topTen);
//   populateYear();
// });

// Populates gender specific data in objects
const populateData = (obj, pos) => {
    const country = pos.location_name;
    const rate = pos.val;
    if (!obj[pos.year]) {
      obj[pos.year] = {};
      obj[pos.year][country] = rate; 
    } else {
      obj[pos.year][country] = rate;
    }
}

// Finds top ten countries based on year
const findTopTen = (obj, year) => {
  topTen = [];
  for (let key in obj[year]) {
    const rate = parseFloat(obj[year][key]);
    topTen.push({ key, rate });
  }
  topTen.sort(function(a, b) {
    return b.rate - a.rate;
  })
  topTen = topTen.slice(0, 10);
}

const renderGraph = (arr) => {
  d3.selectAll('rect').remove();
  const barHeight = 20;
  const bar = d3.select('svg')
    .selectAll('rect')
    .data(arr)
    .enter()
    .append('rect')
    .attr('width', d => d.rate * 10)
    .attr('height', barHeight - 1)
    .attr('transform', function(d, i) {
      return `translate(0,${i * barHeight})`
    })
}

const populateYear = () => {
  d3.select('#yearDropDown')
    .selectAll('option')
    .data(Object.keys(maleOrFemale))
    .enter()
    .append('option')
    .text(d => d)
    .attr('value', d => d);
}

// d3.select('h3').style('color', 'darkblue');
// d3.select('h3').style('font-size', '24px');

const generateVis = (e) => {
  // findTopTen(females, 1992);
  e.preventDefault();
  // console.log(typeof e.target[1].value);
  const gender = e.target[1].value === 'both' ? maleOrFemale : (e.target[1].value === 'female' ? females : males);
  // console.log(gender);
  findTopTen(gender, e.target[0].value);
  console.log(topTen);
  renderGraph(topTen);
  // renderGraph(testing);
}

const btn = document.getElementById('form');
btn.addEventListener('submit', generateVis)
// console.log(btn);

