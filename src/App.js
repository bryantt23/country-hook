import React, { useState, useEffect } from 'react';
// import useCountry from './hooks/index';

const API_WEATHER_KEY = 'cbe3a5258849eb31e096fd9bf0763eb8';

const useField = type => {
  const [value, setValue] = useState('');

  const onChange = event => {
    // console.log(event.target.value);
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange
  };
};

const useCountry = name => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`https://restcountries.eu/rest/v2/name/${name}`);
      const data = await res.json();
      const c = { country: { data: data[0], found: true } };
      setCountry(c.country);
    }

    fetchData();
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  console.log('country', country);
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flag}
        height='100'
        alt={`flag of ${country.data.name}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField('text');
  const [name, setName] = useState('');
  const country = useCountry(name);

  const fetch = e => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
