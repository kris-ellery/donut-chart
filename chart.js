(function(window, document, undefined) {
  'use strict';
  
  var DonutChart = {
  
    init: function( options ) {
      var self = this;
      
      // Set base variables
      self.offset = options.offset ? options.offset : 0;
      self.container = options.container;
      self.data = options.data;
      self.label = options.label ? self.label : 'Total';
      
      // Build chart
      self.build();

      return self;
      
    }, // init
    build: function() {
      var self = this;
      
      // Clear stage
      self.container.innerHTML = '';
      
      // Create outer circle
      var outerCircle = document.createElement('div');
      outerCircle.className = 'outer-circle';
      self.container.appendChild(outerCircle);
      
      // Create inner circle
      var innerCircle = document.createElement('div');
      innerCircle.className = 'inner-circle';
      self.container.appendChild(innerCircle);
      
      // Create inner circle label
      var innerCircleLabel = document.createElement('span');
      innerCircleLabel.className = 'inner-circle-label';
      innerCircleLabel.innerHTML = self.label;
      innerCircle.appendChild(innerCircleLabel);
      
      // Create inner circle value
      var innerCircleValue = document.createElement('span');
      innerCircleValue.className = 'inner-circle-value';
      innerCircleValue.innerHTML = self.data.total;
      innerCircle.appendChild(innerCircleValue);
      
      // Create base variables
      var wedgeContainer, wedge, wedgeExtension, wedgeLabel, wedgeDegrees, wedgeLabelDegrees, w;
      
      // Loop thru data array
      for (var i = 0; i < self.data.wedges.length; i++) {
        
        // Calculate wedge and label degrees
        wedgeDegrees = (360 * self.data.wedges[i].value) / self.data.total;
        wedgeLabelDegrees = wedgeDegrees / 2;
        
        // Create wedge container
        wedgeContainer = document.createElement('div');
        wedgeContainer.className = 'wedge-container';
        outerCircle.appendChild(wedgeContainer);
        
        // Get wedge container width
        w = wedgeContainer.offsetWidth;
        
        // Set CSS styles
        wedgeContainer.style.transform = 'rotate(' + self.offset + 'deg)';
        wedgeContainer.style.webkitTransform = 'rotate(' + self.offset + 'deg)';
        wedgeContainer.style.clip = wedgeDegrees > 180 ? 'auto' : 'rect(0, ' + w + 'px, ' + w +'px, ' + (w / 2) + 'px)';
        
        // Check if wedge needs an extension
        if (wedgeDegrees > 180) {
        
          // Create wedge extension
          wedgeExtension = document.createElement('div');
          wedgeExtension.className = 'wedge-extension';
          wedgeContainer.appendChild(wedgeExtension);
          
          // Set CSS styles
          wedgeExtension.style.transform = 'rotate(' + 180 + 'deg)';
          wedgeExtension.style.webkitTransform = 'rotate(' + 180 + 'deg)';
          wedgeExtension.style.backgroundColor = self.color(self.data.wedges[i].color, 5);
          wedgeExtension.style.clip = 'rect(0, ' + (w / 2) + 'px, ' + w +'px, 0)';
          
        }
        
        // Create wedge
        wedge = document.createElement('div');
        wedge.className = 'wedge';
        wedgeContainer.appendChild(wedge);
        
        // Set CSS styles
        wedge.style.transform = 'rotate(' + wedgeDegrees + 'deg)';
        wedge.style.webkitTransform = 'rotate(' + wedgeDegrees + 'deg)';
        wedge.style.backgroundColor = self.color(self.data.wedges[i].color, 5);
        wedge.style.clip = 'rect(0, ' + (w / 2) + 'px, ' + w +'px, 0)';

        // Create wedge label
        wedgeLabel = document.createElement('div');
        wedgeLabel.className = 'wedge-label';
        wedgeLabel.innerHTML = '<span>' + self.data.wedges[i].value + '</span>';
        wedgeContainer.appendChild(wedgeLabel);
        
        // Set CSS styles
        wedgeLabel.style.transform = 'rotate(' + wedgeLabelDegrees + 'deg)';
        wedgeLabel.style.webkitTransform = 'rotate(' + wedgeLabelDegrees + 'deg)';
        wedgeLabel.style.color = self.color(self.data.wedges[i].color, -30);
        
        // Update global degree offset
        self.offset = self.offset + wedgeDegrees;
      }
    }, //build
    color: function( color, percent ) {
      // Color shader
      var num = parseInt(color.slice(1), 16);
      var amt = Math.round(2.55 * percent);
      var R = (num >> 16) + amt;
      var B = (num >> 8 & 0x00FF) + amt;
      var G = (num & 0x0000FF) + amt;
      return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);
    } // color
  }; // DonutChart

  var chartContainer = document.querySelector('.donut-chart');
  var chartData = {
    total: 360,
    wedges: [{
      color: '#ac92ec',
      value: 50
    }, {
      color: '#4fc1e9',
      value: 200
    }, {
      color: '#a0d468',
      value: 80
    }, {
      color: '#ed5565',
      value: 30
    }]
  };
  
  DonutChart.init({
    container: chartContainer,
    data: chartData
  });
  
})(window, document);