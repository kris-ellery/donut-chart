/**
  * Demo
  * --------------------------------------------------
  */

// Object.create() polyfill
if (typeof Object.create !== 'function') {
  Object.create = function(obj) {
    function F() {}
    F.prototype = obj;
    return new F();
  };
}

// Select containers
var chartContainer1 = document.querySelector('[data-donut-chart="1"]');
var chartContainer2 = document.querySelector('[data-donut-chart="2"]');

// Data
var chartData1a = {
  total: 64,
  wedges: [
    { id: 'a', color: '#4FC1E9', value: 10 },
    { id: 'b', color: '#A0D468', value: 16 },
    { id: 'c', color: '#ED5565', value: 24 },
    { id: 'd', color: '#AC92EC', value: 14 }
  ]
};

var chartData1b = {
  total: 96,
  wedges: [
    { id: 'a', color: '#4FC1E9', value: 26 },
    { id: 'b', color: '#A0D468', value: 20 },
    { id: 'c', color: '#ED5565', value: 18 },
    { id: 'd', color: '#AC92EC', value: 32 }
  ]
};

var chartData2a = {
  total: 200,
  wedges: [
    { id: 'a', color: '#5D9CEC', value: 45 },
    { id: 'b', color: '#48CFAD', value: 25 },
    { id: 'c', color: '#FFCE54', value: 30 },
    { id: 'd', color: '#FC6E51', value: 100 }
  ]
};

var chartData2b = {
  total: 220,
  wedges: [
    { id: 'a', color: '#5D9CEC', value: 65 },
    { id: 'b', color: '#48CFAD', value: 40 },
    { id: 'c', color: '#FFCE54', value: 60 },
    { id: 'd', color: '#FC6E51', value: 55 }
  ]
};

// Create new chart objects
var Chart1 = Object.create(DonutChart);
var Chart2 = Object.create(DonutChart);

Chart1.init({
  container: chartContainer1,
  data: chartData1a
});

Chart2.init({
  container: chartContainer2,
  data: chartData2a
});

setTimeout(function() {
  setInterval(function() {

    Chart1.update({
      data: chartData1a
    });

    Chart2.update({
      data: chartData2a
    });

  }, 4000);
}, 2000);

setInterval(function() {

  Chart1.update({
    data: chartData1b
  });

  Chart2.update({
    data: chartData2b
  });

}, 4000);
