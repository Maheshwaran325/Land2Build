// Weather Service using Open-Meteo API (Free, no key required)

export interface WeatherData {
    current: {
        temperature: number;
        humidity: number;
        windSpeed: number;
        weatherCode: number;
        weatherDescription: string;
    };
    forecast: ForecastDay[];
    monthly: MonthlyData[];
}

export interface ForecastDay {
    date: string;
    tempMax: number;
    tempMin: number;
    precipitation: number;
    precipProbability: number;
    weatherCode: number;
    weatherDescription: string;
    isGoodForConstruction: boolean;
}

export interface MonthlyData {
    month: string;
    avgTemp: number;
    totalPrecipitation: number;
    rainyDays: number;
    constructionRisk: 'low' | 'medium' | 'high';
}

// Weather code to description mapping
const WEATHER_CODES: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
};

const getWeatherDescription = (code: number): string => {
    return WEATHER_CODES[code] || 'Unknown';
};

const isConstructionFriendly = (weatherCode: number, precipitation: number): boolean => {
    // Good for construction if no significant precipitation
    const badWeatherCodes = [55, 63, 65, 73, 75, 77, 81, 82, 85, 86, 95, 96, 99];
    return !badWeatherCodes.includes(weatherCode) && precipitation < 5;
};

/**
 * Fetch weather data for a location
 */
export async function getWeatherData(lat: number, lng: number): Promise<WeatherData | null> {
    try {
        // Fetch current weather and 16-day forecast
        const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max&timezone=auto&forecast_days=16`;

        const response = await fetch(forecastUrl);
        if (!response.ok) throw new Error('Weather API error');

        const data = await response.json();

        // Parse current weather
        const current = {
            temperature: Math.round(data.current.temperature_2m),
            humidity: data.current.relative_humidity_2m,
            windSpeed: Math.round(data.current.wind_speed_10m),
            weatherCode: data.current.weather_code,
            weatherDescription: getWeatherDescription(data.current.weather_code),
        };

        // Parse forecast
        const forecast: ForecastDay[] = data.daily.time.map((date: string, i: number) => ({
            date,
            tempMax: Math.round(data.daily.temperature_2m_max[i]),
            tempMin: Math.round(data.daily.temperature_2m_min[i]),
            precipitation: data.daily.precipitation_sum[i],
            precipProbability: data.daily.precipitation_probability_max[i],
            weatherCode: data.daily.weather_code[i],
            weatherDescription: getWeatherDescription(data.daily.weather_code[i]),
            isGoodForConstruction: isConstructionFriendly(data.daily.weather_code[i], data.daily.precipitation_sum[i]),
        }));

        // Generate monthly summary (mock based on forecast patterns)
        const monthly = generateMonthlySummary(forecast);

        return { current, forecast, monthly };
    } catch (error) {
        console.error('Weather fetch error:', error);
        return null;
    }
}

/**
 * Generate monthly construction risk summary
 */
function generateMonthlySummary(forecast: ForecastDay[]): MonthlyData[] {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();

    // Use forecast data to extrapolate for next 6 months
    return Array.from({ length: 6 }, (_, i) => {
        const monthIndex = (currentMonth + i) % 12;
        const relevantDays = forecast.filter((_, j) => Math.floor(j / 16 * 6) === i);

        const avgTemp = relevantDays.length > 0
            ? Math.round(relevantDays.reduce((sum, d) => sum + (d.tempMax + d.tempMin) / 2, 0) / relevantDays.length)
            : 28; // Default for India

        const totalPrecip = relevantDays.reduce((sum, d) => sum + d.precipitation, 0);
        const rainyDays = relevantDays.filter(d => d.precipitation > 2).length;

        // Monsoon months in India (June-September) are high risk
        const isMonsoon = monthIndex >= 5 && monthIndex <= 8;
        let constructionRisk: 'low' | 'medium' | 'high' = 'low';
        if (isMonsoon || totalPrecip > 100) constructionRisk = 'high';
        else if (totalPrecip > 50 || rainyDays > 5) constructionRisk = 'medium';

        return {
            month: months[monthIndex],
            avgTemp,
            totalPrecipitation: Math.round(totalPrecip),
            rainyDays,
            constructionRisk,
        };
    });
}


export interface ConstructionInsights {
    concrete: { status: 'good' | 'warning' | 'bad'; message: string };
    painting: { status: 'good' | 'warning' | 'bad'; message: string };
    crane: { status: 'good' | 'warning' | 'bad'; message: string };
    excavation: { status: 'good' | 'warning' | 'bad'; message: string };
    general: string;
}

/**
 * Get accurate construction insights based on real-time metrics
 */
export function getConstructionInsights(weather: WeatherData): ConstructionInsights {
    const { temperature, humidity, windSpeed } = weather.current;
    const precipProb = weather.forecast[0].precipProbability;

    // 1. Concrete Curing
    // Ideal: 10°C - 32°C, moderate humidity
    let concrete = { status: 'good', message: 'Ideal curing conditions.' } as ConstructionInsights['concrete'];
    if (temperature < 5) concrete = { status: 'bad', message: 'Too cold. Risk of freezing. Use heaters.' };
    else if (temperature > 35) concrete = { status: 'warning', message: 'Too hot. Rapid evaporation risk. Keep wet.' };
    else if (humidity < 40) concrete = { status: 'warning', message: 'Low humidity. Cover immediately to prevent cracking.' };

    // 2. Painting / Finishing
    // Ideal: 10°C - 30°C, Humidity 40% - 85%
    let painting = { status: 'good', message: 'Perfect for painting & exterior finishes.' } as ConstructionInsights['painting'];
    if (precipProb > 40) painting = { status: 'bad', message: 'High rain risk. Postpone exterior work.' };
    else if (humidity > 85) painting = { status: 'bad', message: 'Too humid. Paint will not cure properly.' };
    else if (temperature < 10) painting = { status: 'warning', message: 'Too cold for standard latex paints.' };

    // 3. Crane / Heights
    // Warning > 30km/h, Danger > 50km/h
    let crane = { status: 'good', message: 'Wind speeds safe for lifting.' } as ConstructionInsights['crane'];
    if (windSpeed > 50) crane = { status: 'bad', message: 'DANGER. High winds. Cease all crane operations.' };
    else if (windSpeed > 30) crane = { status: 'warning', message: 'Gusty. Exercise caution with large surface loads.' };

    // 4. Excavation / Earthwork
    // Bad if heavy rain within last 24 hrs or coming up
    let excavation = { status: 'good', message: 'Ground conditions likely stable.' } as ConstructionInsights['excavation'];
    const totalRainForecast = weather.forecast.slice(0, 2).reduce((sum, d) => sum + d.precipitation, 0);
    if (totalRainForecast > 20) excavation = { status: 'bad', message: 'Heavy rain forecasted. Risk of trench collapse/flooding.' };
    else if (totalRainForecast > 5) excavation = { status: 'warning', message: 'Damp soil expected. Review shoring.' };

    return {
        concrete,
        painting,
        crane,
        excavation,
        general: getConstructionRecommendation(weather)
    };
}

/**
 * Get general construction recommendation (Legacy wrapper)
 */
export function getConstructionRecommendation(weather: WeatherData): string {
    const goodDays = weather.forecast.filter(d => d.isGoodForConstruction).length;
    const totalDays = weather.forecast.length;
    const percentage = Math.round((goodDays / totalDays) * 100);

    if (percentage >= 80) return `Excellent Week Ahead. ${goodDays}/${totalDays} days suitable for all activities.`;
    if (percentage >= 60) return `Good Conditions. ${goodDays} workable days. Plan outdoor tasks around rain gaps.`;
    if (percentage >= 40) return `challenging Mix. Only ${goodDays} good days. prioritize indoor fit-outs.`;
    return `Critical Weather Alert. Heavy disruptions likely. Secure site & materials.`;
}
