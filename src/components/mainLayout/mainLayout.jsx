import React, {useState, useEffect} from 'react';
import axios from 'axios';

// importing icons
import { FaSun, FaCloudRain, FaCloud, FaSnowflake, FaBolt, FaSearch } from 'react-icons/fa';
import { BsCloudHazeFill, BsCloudDrizzleFill, BsEye, BsWater, BsThermometer, BsWind } from 'react-icons/bs';
import { TbTemperatureCelsius } from 'react-icons/tb'
import { ImSpinner10 } from 'react-icons/im'

// api key
const APIkey = '6a6019a2331e5385694dd14151d68e1c';

const mainLayout = () => {
    const [data, setData] = useState(null);
    const [location, setLocation] = useState('Lagos');
    const [inputValue, setInputValue] = useState('');
    const [animate, setAnimate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, seterrorMsg] = useState('');

    const handleInput = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        // if input values is not empty
        if (inputValue !== '') {
            // set location
            setLocation(inputValue);
        }

        // select input 
        const input = document.querySelector('input');

        // if input value is empty
        if (input.value === '') {
            console.log("Triggering shake animation");
            setAnimate(true);
        
            setTimeout(() => {
                setAnimate(false);
                console.log("Shake animation ended");
            }, 500);
        }        

        // clear input 
        input.value = '';

        // prevent defaults
        e.preventDefault();
    }

    // fetch the data
    useEffect(()=> {
        setLoading(true);

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;

        axios.get(url).then(res => {
            // set the data after 1500 ms
            setTimeout(()=> {
                setData(res.data);

                // set loading false
                setLoading(false);
            }, 1500)
        }).catch(err => {
            setLoading(false);
            seterrorMsg(err);
        });
    }, [location]);

    // eror message
    useEffect(()=> {
        const timer = setTimeout(()=> {
            seterrorMsg('')
        }, 2000)

        // clear timer
        return () => clearTimeout(timer);
    }, [errorMsg])

    // if data is false show the loader
    if (!data) {
        return <div className='flex flex-col jsutify-center items-center'>
            <div>
                <ImSpinner10 className="text-5xl animate-spin" />
            </div>
        </div>
    }

    // set the icon according to the weather
    let icon;

    switch (
        data.weather[0].main // 'Clouds'
    ) {
        case 'Clouds':
            icon = <FaCloud />;
            break;
        case 'Haze':
            icon = <BsCloudHazeFill />;
            break;
        case 'Rain':
            icon = <FaCloudRain className='text-[#31cafb]' />;
            break;
        case 'Clear':
            icon = <FaSun className='text-[#ffde33]' />;
            break;
        case 'Drizzle':
            icon = <BsCloudDrizzleFill className='text-[#31cafb]' />;
            break;
        case 'Snow':
            icon = <FaSnowflake className='text-[#31cafb]' />;
            break;
        case 'Thunderstorm':
            icon = <FaBolt className='text-[#31cafb]' />;
            break;
    }

    // date object
    const date = new Date();

    return (
        <div className="flex items-center gap-6 justify-center">
            {/* Card */}
            <div className='w-full max-w-[340px] bg-black/20 min-h-[340px] backdrop-blur-[32px] rounded-[32px] py-6 px-4'>
                <div>
                    {/* card top */}
                    <div className='flex items-center gap-4'>
                        {/* icon */}
                        <div className='text-[87px]'>{icon}</div>

                        <div>
                            {/* country name */}
                            <div className='text-2xl font-semibold'>
                                {data.name}, {data.sys.country}
                            </div>

                            {/* date */}
                            <div>
                                {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getUTCDay()]} {date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}
                            </div>

                        </div>
                    </div>

                    {/* card body */}
                    <div className='my-10'>
                        <div className='flex justify-center'>
                            {/* temp */}
                            <div className='text-[100px] leading-none font-light'>
                                {parseInt(data.main.temp)}
                            </div>

                            {/* celsius icon */}
                            <div className='text-3xl'>
                                <TbTemperatureCelsius />
                            </div>
                        </div>

                        {/* weather description */}
                        <div className='capitalize text-center'>
                            {
                                data.weather[0].description
                            }
                        </div>
                    </div>

                    {/* card bottom */}
                    <div className='flex flex-col gap-y-6'>
                        <div className='flex justify-evenly gap-5 text-[10.8px]'>
                            <div className='flex items-center gap-1.5'>
                                {/* icon */}
                                <div className='text-[20px]'>
                                    <BsEye />
                                </div>

                                <div>
                                    Visibility{' '} <span className='ml-1'>{data.visibility / 1000}km</span>
                                </div>
                            </div>

                            <span className='text-[18px]'>
                                |
                            </span>

                            <div className='flex items-center gap-1.5'>
                                {/* icon */}
                                <div className='text-[20px]'>
                                    <BsThermometer />
                                </div>

                                <div className='flex'>
                                    Feels like <div className='flex ml-1'>{parseInt(data.main.feels_like)}
                                        <TbTemperatureCelsius />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='flex justify-evenly gap-5 text-[11px]'>
                            <div className='flex items-center gap-1.5'>
                                {/* icon */}
                                <div className='text-[20px]'>
                                    <BsWater />
                                </div>

                                <div>
                                    Humidity <span className='ml-1'>{data.main.humidity}%</span>
                                </div>
                            </div>

                            <span className='text-[18px]'>
                                |
                            </span>

                            <div className='flex items-center gap-1.5'>
                                {/* icon */}
                                <div className='text-[20px]'>
                                    <BsWind />
                                </div>

                                <div>
                                    Wind <span >{data.wind.speed}m/s</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            { loading ? <div
                className='w-full h-full flex justify-center items-center'
            >
                <ImSpinner10 className='text-5xl animate-spin' />
            </div> : 
                <div className='w-full max-w-[340px] bg-black/20 min-h-[340px] backdrop-blur-[32px] rounded-[32px] py-6 px-4'>
                    {errorMsg && <div className='w-full max-w-[90vw] lg:max-w-[450px] bg-[#f00] capitalize p-1 rounded-md mb-4 text-center'>{`${errorMsg.response.data.message}`}</div>}

                    {/* Form */}
                    <form className={`${animate ? 'animate-shake' : 'animate-none'} h-16 border w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8`}>
                        <div className='h-full relative flex items-center justify-between p-2'>
                            <input onChange={(e)=> handleInput(e)} className='flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] font-light pl-6 h-full' type="text" placeholder='Search by city or country' />
                            
                            <button onClick={(e)=> handleSubmit(e)} className='bg-[#1ab8ed] w-20 h-12 rounded-full flex justify-center items-center transition hover:bg-[#15abdd]'>
                                <FaSearch className='text-1.5xl text-white' />
                            </button>
                        </div>
                    </form>
                </div>
            }
        </div>
    );
};

export default mainLayout;

