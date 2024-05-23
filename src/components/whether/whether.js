import React, { useEffect, useState } from 'react'
import "../whether.scss";
import { MdOutlineWbSunny } from "react-icons/md";
import { WiSunset } from "react-icons/wi";
import { WiHumidity } from "react-icons/wi";
import { CiCloudDrizzle } from "react-icons/ci";
import { FaWind } from "react-icons/fa6";
import { RiSunFoggyFill } from "react-icons/ri";
import { BsCloudSun } from "react-icons/bs";

export default function Whetherprop({ temInfo }) {
    const [whethermo, setWhethermo] = useState("");
    const [timeOfDay, setTimeOfDay] = useState("day");
    const {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset
    } = temInfo
    let sec = sunset;
    let date = new Date(sec * 1000);
    let timestr = `${date.getHours()}: ${date.getMinutes()}`


    useEffect(() => {
        if (weathermood) {
            switch (weathermood) {
                case "Clouds":
                    setWhethermo(<BsCloudSun className='cloudsun' />)

                    break;
                case "Haze":
                    setWhethermo(<RiSunFoggyFill className='' />)

                    break;

                case "Clouds":
                    setWhethermo(<MdOutlineWbSunny />)

                    break;


                default:
                    setWhethermo(<MdOutlineWbSunny />)
                    break;
            }
        }
    }, [weathermood])

    useEffect(() => {
        const currentHour = new Date().getHours();
        console.log("currenthours************", currentHour)
        if (currentHour >= 18 || currentHour < 6) {
            setTimeOfDay("night");
        } else if (currentHour >= 16 && currentHour < 18) {
            setTimeOfDay("evening");
        } else {
            setTimeOfDay("day");
        }
    }, []);
    return (
        <div className="whether">
            <div className='box-flex'>
                <div className="box">


                    <div className='whether-icon'>
                        <i>{whethermo}</i>
                    </div>
                    <div className="whether-main">

                        <div className='whather-info'>
                            <div className="tem">
                                <span>{temp}</span>
                            </div>
                            <div className='description'>
                                <div className="wethercondition">{weathermood}</div>
                                <div className='place'>{name}, {country}</div>


                            </div>

                            <div className="date">{new Date().toLocaleString()}</div>
                        </div>
                        <div class="img-house">
                            <img src="https://i.imgur.com/QA63I0q.png" />
                        </div>
                    </div>

                    <div className="extra-temp-bg">
                        <div className="extra-temp">
                            <div className='extra-info'>
                                <WiSunset className='sunset' />
                                <div className='spandetails'>
                                    <p>{timestr}pm<br />sunset</p>


                                </div>

                            </div>
                            <div className='extra-info'>
                                <WiHumidity className='sunset' />
                                <div className='spandetails'>

                                    <p >{humidity}<br />humidity</p>

                                </div>

                            </div>
                            <div className='extra-info'>
                                <CiCloudDrizzle className='sunset' />
                                <div className='spandetails'>
                                    <p >{pressure}<br />pressure</p>


                                </div>

                            </div>
                            <div className='extra-info'>
                                <FaWind className='sunset' />
                                <div className='spandetails'>
                                    <p>{speed}<br />speed</p>


                                </div>

                            </div>
                        </div>
                    </div>


                </div>


            </div>

        </div >
    )
}




