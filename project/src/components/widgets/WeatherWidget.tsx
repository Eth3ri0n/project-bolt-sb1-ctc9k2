import React, { useState, useEffect } from 'react';
import { CloudSun, MapPin, ChevronRight, AlertTriangle, Thermometer, Wind, Droplets, Navigation, Sun, CloudRain, CloudSnow } from 'lucide-react';
import BaseWidget from './BaseWidget';
import { WidgetProps } from '../../types/widget';

interface WeatherData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  description: string;
  icon: string;
  alerts?: {
    type: string;
    level: 'yellow' | 'orange' | 'red';
    message: string;
  }[];
}

interface Forecast {
  date: Date;
  temperature: {
    min: number;
    max: number;
  };
  icon: string;
  description: string;
}

export default function WeatherWidget({
  onToggleFavorite,
  isFavorite = false,
  notifications = [],
  onShowNotifications,
  notificationBtnRef,
  onModalOpen,
  onModalClose
}: WidgetProps) {
  const [location, setLocation] = useState('Tarbes');
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 10,
    feelsLike: 8,
    humidity: 75,
    windSpeed: 15,
    windDirection: 180,
    description: 'Partiellement nuageux',
    icon: 'partly_cloudy',
    alerts: [
      {
        type: 'Neige',
        level: 'yellow',
        message: 'Vigilance jaune neige'
      }
    ]
  });
  const [forecast, setForecast] = useState<Forecast[]>([
    {
      date: new Date(),
      temperature: { min: 5, max: 12 },
      icon: 'partly_cloudy',
      description: 'Partiellement nuageux'
    },
    // Add more forecast days...
  ]);

  const getWeatherIcon = (iconCode: string) => {
    switch (iconCode) {
      case 'sunny':
        return <Sun className="w-12 h-12 text-yellow-500" />;
      case 'partly_cloudy':
        return <CloudSun className="w-12 h-12 text-gray-500" />;
      case 'rain':
        return <CloudRain className="w-12 h-12 text-blue-500" />;
      case 'snow':
        return <CloudSnow className="w-12 h-12 text-blue-300" />;
      default:
        return <CloudSun className="w-12 h-12 text-gray-500" />;
    }
  };

  const getAlertColor = (level: 'yellow' | 'orange' | 'red') => {
    switch (level) {
      case 'yellow':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'orange':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'red':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    }
  };

  return (
    <BaseWidget
      title="Météo"
      icon={<CloudSun className="w-6 h-6 text-white" />}
      headerColor="bg-gradient-to-r from-blue-600 to-blue-500"
      onToggleFavorite={onToggleFavorite}
      isFavorite={isFavorite}
      notifications={notifications}
      onShowNotifications={onShowNotifications}
      notificationBtnRef={notificationBtnRef}
    >
      <div className="space-y-6">
        {/* Location selector */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-gray-400" />
            <h3 className="text-xl font-bold dark:text-white">{location}</h3>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
            Changer
          </button>
        </div>

        {/* Current weather */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {getWeatherIcon(weather.icon)}
              <div>
                <div className="text-4xl font-bold">{weather.temperature}°C</div>
                <div className="text-sm opacity-90">{weather.description}</div>
              </div>
            </div>
            {weather.alerts && weather.alerts.length > 0 && (
              <div className={`px-4 py-2 rounded-full flex items-center gap-2 ${getAlertColor(weather.alerts[0].level)}`}>
                <AlertTriangle className="w-4 h-4" />
                <span className="font-medium">{weather.alerts[0].message}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 opacity-75" />
              <div className="text-sm">
                <div className="opacity-75">Ressenti</div>
                <div className="font-medium">{weather.feelsLike}°C</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 opacity-75" />
              <div className="text-sm">
                <div className="opacity-75">Vent</div>
                <div className="font-medium">{weather.windSpeed} km/h</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 opacity-75" />
              <div className="text-sm">
                <div className="opacity-75">Humidité</div>
                <div className="font-medium">{weather.humidity}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Forecast */}
        <div>
          <h4 className="text-lg font-semibold mb-4 dark:text-white">Prévisions</h4>
          <div className="grid grid-cols-4 gap-4">
            {forecast.map((day, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 text-center"
              >
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {day.date.toLocaleDateString('fr-FR', { weekday: 'short' })}
                </div>
                <div className="flex justify-center mb-2">
                  {getWeatherIcon(day.icon)}
                </div>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {day.temperature.max}°
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {day.temperature.min}°
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Full forecast button */}
        <button className="w-full py-3 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl transition-colors text-sm font-medium">
          Les prévisions complètes
        </button>
      </div>
    </BaseWidget>
  );
}