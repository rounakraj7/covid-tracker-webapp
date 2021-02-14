import React, { useState, useEffect } from "react";
import "./Home.css";
import {
    MenuItem,
    FormControl,
    Select,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import { sortData, prettyPrintStat } from "./util";
import numeral from "numeral";
import "leaflet/dist/leaflet.css";
import Button from "@material-ui/core/Button";

const Home = ({handleLogout}) => {
    const [country, setInputCountry] = useState("worldwide");
    const [countryInfo, setCountryInfo] = useState({});
    const [countries, setCountries] = useState([]);
    const [casesType, setCasesType] = useState("cases");

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/all")
            .then((response) => response.json())
            .then((data) => {
                setCountryInfo(data);
            });
    }, []);

    useEffect(() => {
        const getCountriesData = async () => {
            fetch("https://disease.sh/v3/covid-19/countries")
                .then((response) => response.json())
                .then((data) => {
                    const countries = data.map((country) => ({
                        name: country.country,
                        value: country.countryInfo.iso2,
                    }));
                    let sortedData = sortData(data);
                    setCountries(countries);
                });
        };

        getCountriesData();
    }, []);

    const onCountryChange = async (e) => {
        const countryCode = e.target.value;

        const url =
            countryCode === "worldwide"
                ? "https://disease.sh/v3/covid-19/all"
                : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
        await fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setInputCountry(countryCode);
                setCountryInfo(data);
            });
    };

    return (
        <div className="app">
            <div className="app__left">
                <div className="app__header">
                    <h1>COVID-19 Tracker</h1>
                    <FormControl className="app__dropdown">
                        <Select
                            variant="outlined"
                            value={country}
                            onChange={onCountryChange}
                        >
                            <MenuItem value="worldwide">Worldwide</MenuItem>
                            {countries.map((country) => (
                                <MenuItem value={country.value}>{country.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button onClick={handleLogout}>Logout</Button>
                </div>
                <div className="app__stats">
                    <InfoBox
                        title="Coronavirus Cases"
                        active={casesType === "cases"}
                        cases={prettyPrintStat(countryInfo.todayCases)}
                        total={numeral(countryInfo.cases).format("0.0a")}
                    />
                    <InfoBox
                        title="Recovered"
                        active={casesType === "recovered"}
                        cases={prettyPrintStat(countryInfo.todayRecovered)}
                        total={numeral(countryInfo.recovered).format("0.0a")}
                    />
                    <InfoBox
                        title="Deaths"
                        active={casesType === "deaths"}
                        cases={prettyPrintStat(countryInfo.todayDeaths)}
                        total={numeral(countryInfo.deaths).format("0.0a")}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
