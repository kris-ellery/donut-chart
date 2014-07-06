# Donut Chart
JavaScript driven donut chart - [http://www.kolszewski.com/lab/donut-chart/](live demo).

Please note, this is a proof of concept written in pure JavaScript and works only in modern browsers. Use with caution.

[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

---

## Create new chart

**HTML**
```html
<!-- Container - 'data-donut-chart' should be unique -->
<div class="donut-chart" data-donut-chart="1"></div>
```

**JavaScript**
```javascript
// Select container by its unique 'data-donut-chart' attribute
var container = document.querySelector('[data-donut-chart="1"]');

// Data
var data = {
  total: 64,
  wedges: [
    { id: 'a', color: '#4FC1E9', value: 10 },
    { id: 'b', color: '#A0D468', value: 16 },
    { id: 'c', color: '#ED5565', value: 24 },
    { id: 'd', color: '#AC92EC', value: 14 }
  ]
};

// Create new DonutChart object
var Chart = Object.create(DonutChart);

// Build chart
Chart.init({
  container: container,
  data: data
  // Optional
  // label: string
  // offset: integer from 0 to 360
});
```
---

## Update chart
You can update each chart with new data and colors.

**JavaScript**
```javascript
// Update chart
Chart.update({
  data: data
});
```

---

## To do
* Add ability to dynamically add/remove wedges on chart update
