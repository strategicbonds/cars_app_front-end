import Plotly from 'plotly.js';

export function renderScatterPlot(data) {
    const mileageValues = data.map(car => car.mileage);
    const priceValues = data.map(car => car.price);
  
    const trace = {
      x: mileageValues,
      y: priceValues,
      mode: 'markers',
      type: 'scatter',
      marker: {
        size: 10,
        color: 'blue'
      }
    };
  
    const layout = {
      title: 'Scatter Plot of Mileage vs. Price',
      xaxis: {
        title: 'Mileage'
      },
      yaxis: {
        title: 'Price'
      }
    };
  
    const plotData = [trace];
    Plotly.newPlot('scatterPlotContainer', plotData, layout);
}
