import React from 'react';
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
import './styles/Bar.css'

function Bar({ handleChange, handleSubmit, clearFilters, inputs }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ background: 'rgb(15 61 100)', color: '#fff' }} className='app-header' position="static">
        <Toolbar className="toolbar" style={{ margin: '15px', justifyContent: 'space-between' }}>
          <Typography className='logo' style={{ flexGrow: 'unset' }} variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img style={{ width: '60px' }} src={logo} alt="logo" /> Hotel.com
          </Typography>
          <form className="actions" onSubmit={handleSubmit}>
            <div className="elements">
              <div className="sorting">
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
              </div>
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
              <div className="filteration">
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
                <Box className='slider' sx={{ width: 220, margin: '0 15px' }}>
                  <Slider sx={{ color: 'aliceblue' }} getAriaLabel={() => 'Filter Range'}
                    min={inputs.filter === 'rate' ? 1 : 0}
                    max={inputs.filter === 'rate' ? 5 : 20000}
                    name="range"
                    value={[inputs.min, inputs.max]}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                  />
                </Box>
              </div>
            </div>
            <div className="btns">
              <Button size="medium" variant="outlined" type="submit" color="inherit">Apply</Button>
              <Button size="medium" variant="outlined" type="button" onClick={clearFilters} color="inherit">Clear Filters</Button>
            </div>
          </form>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Bar;