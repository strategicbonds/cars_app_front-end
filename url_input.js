import React, { useState } from "react";
import axios from 'axios';

const CarDataComponent = () => {
  const [url, setUrl] = useState("");

  const startScraping = async () => {
    try {
      const response = await axios.get('http://localhost:8000/scrape_and_store', { params: { url } });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <input type="text" value={url} onChange={e => setUrl(e.target.value)} placeholder="Enter URL" />
      <button onClick={startScraping}>Start Scraping</button>
    </div>
  );
}

export default CarDataComponent;
