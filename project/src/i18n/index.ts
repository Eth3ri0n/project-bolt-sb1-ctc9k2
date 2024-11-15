import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          'dashboard': 'Dashboard',
          'statistics': 'Statistics',
          'tasks': 'Tasks',
          'calendar': 'Calendar',
          'messages': 'Messages',
          'settings': 'Settings',
          'dragAndDrop': 'Drag and drop widgets to customize your dashboard',
          'welcome': 'Welcome back',
          'recentActivity': 'Recent Activity',
          'performance': 'Performance',
          'todayTasks': "Today's Tasks",
          'upcomingEvents': 'Upcoming Events'
        }
      },
      fr: {
        translation: {
          'dashboard': 'Tableau de bord',
          'statistics': 'Statistiques',
          'tasks': 'Tâches',
          'calendar': 'Calendrier',
          'messages': 'Messages',
          'settings': 'Paramètres',
          'dragAndDrop': 'Faites glisser et déposez les widgets pour personnaliser votre tableau de bord',
          'welcome': 'Bienvenue',
          'recentActivity': 'Activité récente',
          'performance': 'Performance',
          'todayTasks': "Tâches du jour",
          'upcomingEvents': 'Événements à venir'
        }
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;