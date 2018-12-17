'use strict';

const maleOrFemale = {};
const males = {};
const females = {};

let topTen = [];

// Loads data from csv file
d3.csv("data.csv").then(function(data) {
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
  populateYear();
});

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

// renders visualization to the page

const chart = document.getElementById('chart');

let rateChart;

const renderChart = (data) => {
  // chart.style.display = 'hide';
  const ctx = document.getElementById('chart').getContext('2d');
  const names = [];
  const rates = [];
  for (let i = 0; i < data.length; i++) {
    names.push(data[i].key);
    rates.push(data[i].rate);
  }

  rateChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: names,
      datasets: [{
        label: 'rate per 100k',
        data: rates,
        backgroundColor: '#6290C8'
      }]
    }
  })

  // chart.style.display = 'block';

  // d3.selectAll('rect').remove();
  // const barHeight = 50;
  // const bar = d3.select('svg')

  //   .selectAll('rect')
  //   .data(data)
  //   .enter()
  //   .append('rect')
  //   .attr('width', d => d.rate * 20)
  //   .attr('height', 40)
  //   .attr('class', 'bar')
  //   .attr('transform', function(d, i) {
  //     return `translate(0,${i * barHeight})`
  //   });

  // const text = d3.select('rect')
  //   d3.selectAll('p')
  //   .data(data)
  //   .enter()
  //   .append('p')
  //   .text(d => d.key);

  
  // const svg = d3.select('svg');
  // const margin = 200;
  // const width = svg.attr('width') - margin;
  // const height = svg.attr('height') - margin;

  // svg.append('text')
  //   .attr('transform', 'translate(100,0)')
  //   .attr('x', 50)
  //   .attr('y', 50)
  //   .attr('font-size', '24px')
  //   .text('Opiod Related Death Rate');

  // const xScale = d3.scaleBand().range([0, width]).padding(0.4);
  // const yScale = d3.scaleLinear().range([height, 0]);

  // const g = svg.append('g')
  //   .attr('transform', `translate(${100},${100})`);

  // xScale.domain(data.map(d => d.key));
  // yScale.domain([0, d3.max(data, d => d.rate)]);

  // g.append('g')
  //   .attr('transform', "translate(0," + height + ")")
  //   .call(d3.axisBottom(xScale))
  //   .append('text')
  //   .attr('y', height - 250)
  //   .attr('x', width - 100)
  //   .attr('text-anchor', 'end')
  //   .attr('stroke', 'black')
  //   .text('Country');

  // g.append('g')
  //   .call(d3.axisLeft(yScale).tickFormat(d => d.rate).ticks(10))
  //   .append('text')
  //   .attr('transform', 'rotate(-90)')
  //   .attr('y', 6)
  //   .attr('dy', '-5.1em')
  //   .attr('text-anchor', 'end')
  //   .attr('stroke', 'black')
  //   .text('Rate');

  // console.log(data[0].rate);

  // g.selectAll('.bar')
  //   .data(data)
  //   .enter()
  //   .append('rect')
  //   .attr('class', 'bar')
  //   .attr('x', d => xScale(d.key))
  //   .attr('y', d => yScale(d.rate * 1000))
  //   .attr('width', xScale.bandwidth())
  //   .attr('height', d => height - yScale(d.rate));



  
  // bar.append('text')
  //   .text('LOCATION');
}

// populates drop down with years in study
const populateYear = () => {
  d3.select('#yearDropDown')
    .selectAll('option')
    .data(Object.keys(maleOrFemale))
    .enter()
    .append('option')
    .text(d => d)
    .attr('value', d => d);
}

// generates visualization pages on values selected in drop down
const generateVis = (e) => {
  e.preventDefault();
  const gender = e.target[1].value === 'both' ? maleOrFemale : (e.target[1].value === 'female' ? females : males);
  findTopTen(gender, e.target[0].value);
  if (rateChart) {
    rateChart.destroy();
  }
  renderChart(topTen);
}

const btn = document.getElementById('form');
btn.addEventListener('submit', generateVis);

  // const svgWidth = 600;
  // const svgHeight = 400;
  // const margin = { top: 20, right: 20, bottom: 30, left: 50 };
  // const width = svgWidth - margin.left - margin.right;
  // const height = svgHeight - margin.top - margin.bottom;

  // const svg = d3.select('svg')
  //   .attr('width', svgWidth)
  //   .attr('height', svgHeight);
  
  // const g = svg.append('g')
  //   .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  // const x = d3.scaleTime().rangeRound([0, width]);
  // const y = d3.scaleLinear().rangeRound([height, 0]);

  // const line = d3.line()
  //   .x(d => x(d.key))
  //   .y(d => y(d.value))
  //   x.domain(d3.extent(data, d => d.key))
  //   y.domain(d3.extent(data, d => d.value));

  // console.log(line);

  // g.append('g')
  //   .attr('transform', `translate(0, ${height})`)
  //   .call(d3.axisBottom(x))
  //   .select('.domain')
  //   .remove();

  // g.append('g')
  //   .call(d3.axisLeft(y))
  //   .append('text')
  //   .attr('fill', '#000')
  //   .attr('transform', 'rotate(-90)')
  //   .attr('y', 6)
  //   .attr('dy', '0.71em')
  //   .attr('text-anchor', 'end')
  //   .text('Rate per 100k');

  // g.append('path')
  //   .datum(data)
  //   .attr('fill', 'none')
  //   .attr('stroke', 'steelblue')
  //   .attr('stroke-linejoin', 'round')
  //   .attr('stroke-linecap', 'round')
  //   .attr('stroke-width', 1.5)
  //   // .attr('d', line);