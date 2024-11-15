import React from 'react';
import { Briefcase, MapPin, Mail, Clock } from 'lucide-react';

interface Service {
  name: string;
  description: string;
  location: string;
  contact: string;
  hours: string;
}

interface ServiceListProps {
  services: Service[];
  searchQuery: string;
}

export default function ServiceList({ services, searchQuery }: ServiceListProps) {
  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {filteredServices.map((service, index) => (
        <div
          key={index}
          className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {service.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {service.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {service.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <a 
                      href={`mailto:${service.contact}`}
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      {service.contact}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {service.hours}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {filteredServices.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Aucun service trouvé pour "{searchQuery}"
        </div>
      )}
    </div>
  );
}