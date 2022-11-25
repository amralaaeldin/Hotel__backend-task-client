import React, { useEffect, useState } from 'react';
import './index.css'

const starsArr = "★★★★★☆☆☆☆☆"
const getRate = (rate) => {
  return starsArr.slice(5 - rate, 10 - rate)
}

function Hotel() {
  const [hotels, setHotels] = useState()

  const fetchHotels = async (params) => {
    // const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${params}`)
    const res = await fetch(`http://localhost:8082${params}`, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
    const data = await res.json()
    console.log(data)
    setHotels(data)
  }

  useEffect(() => {
    fetchHotels('?format=json')
  }, [])
  return (
    <div className='cards'>
      {hotels && hotels.map((hotel, i) => (
        <div className='card' key={hotel.name + i}>
          <h3>
            {hotel.name}
          </h3>
          <p className='details'>
            <span className='price'>US${hotel.price}{hotel.discount && (<span className='discount'>${hotel.discount + hotel.price}</span>)}</span>
            <span className='stars'>
              {getRate(hotel.rate)}
            </span>
          </p>
          {hotel.amenities && (<p className='amenities'>
            Amenities: <span>{hotel.amenities.join(", ")}</span>
          </p>)}
        </div>
      ))
      }
    </div>
  );
}

export default Hotel;