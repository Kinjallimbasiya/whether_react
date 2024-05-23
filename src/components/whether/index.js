import React, { useEffect, useState, useCallback } from 'react';
import "../whether.scss";
import Whetherprop from "./whether.js";

export default function Whetherapp() {
    const [searchValue, setSearchValue] = useState("pune");
    const [temInfo, setTemInfo] = useState({});
    console.log("teminfo*****", temInfo);

    const handleOnchange = (e) => {
        setSearchValue(e.target.value);
    };
    console.log("searcjVa****", searchValue);

    const handelOnclick = useCallback(async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=b94e299451f6a8718c5a636af08c160d`;

            let res = await fetch(url);
            let data = await res.json();
            const { temp, humidity, pressure } = data.main;
            const { main: weathermood } = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys;

            const newWetherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset
            };
            setTemInfo(newWetherInfo);
            console.log("**********", newWetherInfo);
        } catch (err) {
            console.log("err*******", err);
        }
    }, [searchValue]);

    useEffect(() => {
        handelOnclick();
    }, [handelOnclick]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Enter") {
                handelOnclick();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handelOnclick]);

    return (
        <div>
            <div className='whether'>
                <div className="mainwhether">
                    <div className='input'>
                        <input
                            type='search'
                            placeholder='Search here By City Name'
                            value={searchValue}
                            onChange={(e) => handleOnchange(e)}
                        />
                        <button className="btn" onClick={() => handelOnclick()}>Search</button>
                    </div>
                </div>
                <Whetherprop temInfo={temInfo} />
            </div>
        </div>
    );
}

