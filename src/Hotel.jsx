import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from '@mui/material/Slider';
import logo from './react-logo.png';
import './index.css';
import './App.css';

const starsArr = "★★★★★☆☆☆☆☆"
const getRate = (rate) => {
  return starsArr.slice(5 - rate, 10 - rate)
}

function Hotel() {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [params, setParams] = useState('')
  const [inputs, setInputs] = useState({ 'filter': '', 'find': '', 'max': 20000, 'min': 0, 'sort-by': '', 'sort-type': '' })
  const [page, setPage] = useState(1)

  const fetchHotels = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`http://localhost:8082/?format=json&page=${page}${params ? `&${params}` : ''}`, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
      const data = await res.json()
      setData(data)
      setIsLoading(false)
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  const changePage = (e, value) => {
    setPage(value)
  }

  const handleChange = (e, value) => {
    if (e.target.name === 'range') return setInputs((prev) => ({ ...prev, min: value[0], max: value[1] }))
    return setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    settingParams(inputs)
  }

  const settingParams = (obj) => {
    let keys = Object.keys(obj)
    let parameters = '';
    for (let i = 0; i < keys.length; i++) {
      parameters += `${keys[i]}=${obj[keys[i]]}${i < keys.length - 1 ? '&' : ''}`
    }
    setParams(parameters)
  }

  const clearFilters = () => {
    setInputs({ 'filter': '', 'find': '', 'max': 20000, 'min': 0, 'sort-by': '', 'sort-type': '' })
    setPage(1)
    setParams('')
  }

  useEffect(() => {
    fetchHotels()
  }, [page, params])

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar style={{ background: 'rgb(15 61 100)', color: '#fff' }} className='app-header' position="static">
          <Toolbar style={{ margin: '15px', justifyContent: 'space-between' }}>
            <Typography className='logo' style={{ flexGrow: 'unset' }} variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img style={{ width: '60px' }} src={logo} alt="logo" /> Hotel.com
            </Typography>
            <form className="actions" onSubmit={handleSubmit}>
              <FormControl className='sort-by' sx={{ m: 1, minWidth: 120, }} size="small">
                <InputLabel sx={{ color: '#fff', '&.Mui-focused': { color: "#fff" } }} id="demo-select-small">Sort By</InputLabel>
                <Select
                  sx={{ color: '#ddd', '& .MuiSelect-iconOutlined': { fill: '#aeb5d0', } }}
                  labelId="demo-select-small"
                  id="demo-select-small"
                  name="sort-by"
                  value={inputs['sort-by']}
                  onChange={handleChange}
                  label="Sort By"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={'rate'}>Rate</MenuItem>
                  <MenuItem value={"price"}>Price</MenuItem>
                </Select>
              </FormControl>
              <FormControl className='sort-type'>
                <FormLabel sx={{ color: "#aeb5d0", '&.Mui-focused': { color: "#ffb74d" } }} id="demo-row-radio-buttons-group-label">Sort type</FormLabel>
                <RadioGroup
                  row
                  color="#fff"
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="sort-type"
                  value={inputs['sort-type']}
                  onChange={handleChange}
                >
                  <FormControlLabel value="desc" control={<Radio sx={{ color: "#ffa726", '&.Mui-checked': { color: "#ffb74d" } }} />} label="Desc" />
                  <FormControlLabel value="asc" control={<Radio sx={{ color: "#ffa726", '&.Mui-checked': { color: "#ffb74d" } }} />} label="Asc" />
                </RadioGroup>
              </FormControl>
              <TextField sx={{
                marginRight: '15px',
                '& label': {
                  color: '#fff',
                },
                '& label.Mui-focused': {
                  color: '#fff',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#aeb5d0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#fff',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#fff',
                  },
                },
              }} className='search' name='find' value={inputs.find} onChange={handleChange} size='small' id="outlined-search" label="Search field" type="search" />
              <FormControl name="filter" className='filter'>
                <FormLabel sx={{ color: "#aeb5d0", '&.Mui-focused': { color: "#ffb74d" } }} id="demo-row-radio-buttons-group-label">Filter By</FormLabel>
                <RadioGroup
                  sx={{ color: '#fff' }}
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="filter"
                  value={inputs.filter}
                  onChange={handleChange}
                >
                  <FormControlLabel value="rate" control={<Radio sx={{ color: "#ffa726", '&.Mui-checked': { color: "#ffb74d" } }} />} label="Rate" />
                  <FormControlLabel value="price" control={<Radio sx={{ color: "#ffa726", '&.Mui-checked': { color: "#ffb74d" } }} />} label="Price" />
                </RadioGroup>
              </FormControl>
              <Box className='slider' sx={{ width: 220, marginRight: '18px' }}>
                <Slider sx={{ margin: '-18px 0px', color: 'aliceblue' }} getAriaLabel={() => 'Filter Range'}
                  min={inputs.filter === 'rate' ? 1 : 0}
                  max={inputs.filter === 'rate' ? 5 : 20000}
                  name="range"
                  value={[inputs.min, inputs.max]}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                />
              </Box>
              <Button size="medium" variant="outlined" type="submit" color="inherit">Apply</Button>
              <Button size="medium" variant="outlined" type="button" onClick={clearFilters} color="inherit">Clear Filters</Button>
            </form>
          </Toolbar>
        </AppBar>
      </Box>
      <div className='cards'>
        {isLoading ? 'Loading...' : error ? <p className='error'>error</p> :
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
        {!isLoading && !error && data.pages > 0 && <Stack className='pages' spacing={2}>
          <Pagination page={data.currentPage} count={data.pages} onChange={changePage} variant="outlined" shape="rounded" />
        </Stack>}
      </div>
    </>
  );
}

export default Hotel;