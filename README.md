# weather forecast widget

## project overview

This project is a Weather Forecast Widget developed for CPRG-309 Web Application Development at SAIT.

The widget displays a three-day weather forecast for Calgary, Alberta, using real weather data retrieved from WeatherAPI.

The purpose of this assignment is to practise asynchronous JavaScript, API integration, dynamic content rendering, and responsive web design.

## features 

- Displays a three-day weather forecast for Calgary.
- Shows the day of the week, weather conditions, and average temperature.
- Displays weather icons that match the forecast conditions.
- Allows users to toggle between Celsius and Fahrenheit.
- Uses asynchronous JavaScript to retrieve weather information.
- Includes error handling when weather information cannot be retrieved.


## technologies used 

- html 
- tailwind css
- javasctipt 
- weather API
- node.js and npm

## how the widget works

When the webpage loads, JavaScript uses `fetch()` and `async/await` to request forecast information from WeatherAPI.

The returned JSON data is formatted and displayed in individual weather cards. Each card includes the day, weather condition, icon, and temperature.

Users can switch between Celsius and Fahrenheit by clicking the temperature toggle button.

## API information

This project uses [WeatherAPI](https://www.weatherapi.com/) to retrieve weather forecast information.

The widget displays a three-day forecast based on the API access available for this project.

## resources and Attributes


- [WeatherAPI](https://www.weatherapi.com/) - Weather forecast data and weather condition icons.
- [Tailwind CSS](https://tailwindcss.com/) - CSS utility framework.

## AI usage disclaimer

ChatGPT Was used as a learnign and development aid during this assignment

AI assistance included:
- explained JavaScript concepts and functions
- providing guidance with asynchronous programming and API intergration
- assisting with troubleshooting and debugging
- helping the organization of the documents 

## author 

created for CRPG-309 programming languages at SAIT

## installation and Setup 

1. clone or download the github repoitory
2. open the project folder in VS Code
3. open the terminal and install dependencies:
    npm install
4. compile tailwind CSS, run
    npx @tailwindcss/cli -i ./src/input.css -o ./dist/output.css --watch
5. configure a valid WeatherAPI key for local testing 
6. open index.html in a web browser

## testing and debugging

the following functionality was tested during development 

- weather forecast cards display correctly 
- weather data is reterived from weatherAPI
- weather icons display according to the forecast
- weather cards remain visable when switching temperature units
- browser console was used to identift and trouble Javascript errors

resposive design should also be tested on different sizes



## Project Limitations

- The widget displays a three-day forecast based on the WeatherAPI access available for this project.
- The forecast is currently set to Calgary, Alberta.
- An internet connection is required to retrieve weather information.
- The widget requires a valid WeatherAPI key to retrieve forecast data.
