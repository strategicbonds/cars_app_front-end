import { useState } from 'react';
import logo from './car_logo.png';
import './App.css';

function App() {
  const [inputUrl, setInputUrl] = useState("");
  const [carData, setCarData] = useState([]);
  const [plotData, setPlotData] = useState(null);

  const handleInputChange = (event) => {
    setInputUrl(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!inputUrl) {
      console.error('URL is empty');
      return;
    }
  
    const encodedUrl = encodeURIComponent(inputUrl);
  
  fetch(`http://localhost:8000/cars_plot/get_data/?url=${encodedUrl}`)
    .then(response => response.json())
    .then(({ plot, cars }) => {
      // Log the data for debugging
      console.log('Plot:', plot); 
      console.log('Cars:', cars); 

      // Check if cars or plot is an object with code and name
      if (typeof cars === 'object' && cars !== null) {
        console.log('Cars keys:', Object.keys(cars));
      }
      if (typeof plot === 'object' && plot !== null) {
          console.log('Plot keys:', Object.keys(plot));
      }
      
      // Set the car data
      setCarData(cars);
      
      // Set the plot data
      setPlotData(plot);
    })
    .catch((error) => {
      console.error('Error:', error);
      setCarData([]);
      setPlotData(null);
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Find the best car deals in your area!
        </p>
      </header>
      <form onSubmit={handleFormSubmit}>
        <section>
          <label htmlFor="url-input">URL:</label>
          <input className="App-url_input" id="url-input" type="text" value={inputUrl} onChange={handleInputChange} />
        </section>
        <button type="submit">Submit</button>
      </form>
      
      {plotData ? (
        <img src={`data:image/png;base64,${plotData}`} alt="Scatter plot" />
      ) : (
        <p>No plot available.</p>
      )}

      {carData.length > 0 ? (
        <table className='centered-table'>
          <thead>
            <tr>
              <th>Make</th>
              <th>Model</th>
              <th>Type</th>
              <th>Year</th>
              <th>Mileage</th>
              <th>Dealer</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
          {carData.map((car, index) => (
            <tr key={index}>
              <td>{typeof car.make === 'object' ? JSON.stringify(car.make) : car.make}</td>
              <td>{typeof car.model === 'object' ? JSON.stringify(car.model) : car.model}</td>
              <td>{typeof car.type === 'object' ? JSON.stringify(car.type) : car.type}</td>
              <td>{typeof car.year === 'object' ? JSON.stringify(car.year) : car.year}</td>
              <td>{typeof car.mileage === 'object' ? JSON.stringify(car.mileage) : car.mileage}</td>
              <td>{typeof car.dealer === 'object' ? JSON.stringify(car.dealer) : car.dealer}</td>
              <td>{typeof car.price === 'object' ? JSON.stringify(car.price) : car.price}</td>
            </tr>
          ))}

          </tbody>
        </table>
      ) : (
        <p>No car data available.</p>
      )}
    </div>
  );
}

export default App;
