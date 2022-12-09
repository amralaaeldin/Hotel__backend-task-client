import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './styles/Cards.css'

const starsArr = "★★★★★☆☆☆☆☆"
const getRate = (rate) => {
  return starsArr.slice(5 - rate, 10 - rate)
}
function Cards({ data, changePage, isLoading, error }) {

  if (isLoading) return 'Loading...';
  if (error) return <p className='error'>Error</p>;
  if (!isLoading && !error && data?.data?.length === 0) return 'No data matches';


  return (
    <>
      {!isLoading && !error &&
        (data.data && data.data.map((hotel, i) => (
          <Card className='card' key={hotel.name + i} sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {hotel.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {hotel.amenities && (<span className='amenities'>
                  Amenities: <span>{hotel.amenities.join(", ")}</span>
                </span>)}
              </Typography>
            </CardContent>
            <p className='details'>
              <span className='price'>US${hotel.price}{hotel.discount && (<span className='discount'>${hotel.discount + hotel.price}</span>)}</span>
              <span className='stars'>
                {getRate(hotel.rate)}
              </span>
            </p>
          </Card>
        )))}
      <Stack className='pages' spacing={2}>
        <Pagination page={data.currentPage} count={data.pages} onChange={changePage} variant="outlined" shape="rounded" />
      </Stack>
    </>
  );
}

export default Cards;