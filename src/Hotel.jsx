import React, { useEffect, useState } from 'react';
import Bar from './Bar'
import Cards from './Cards'
import './index.css';
import './styles/App.css';


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
      const res = await fetch(`https://hotels-php-amralaaeldin.000webhostapp.com/?format=json&page=${page}${params ? `&${params}` : ''}`, {
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

  const changePage = (_e, value) => {
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
      <Bar inputs={inputs} handleChange={handleChange} handleSubmit={handleSubmit} clearFilters={clearFilters} />
      <Cards data={data} changePage={changePage} isLoading={isLoading} error={error} />
    </>
  );
}

export default Hotel;