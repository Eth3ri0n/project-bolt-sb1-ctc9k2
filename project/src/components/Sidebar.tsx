import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ChevronDown,
  Calendar,
  BookOpen,
  GraduationCap,
  Mail,
  Users,
  Building2,
  FileText,
  Library,
  Share2,
  MapPin,
  HelpCircle,
  Settings,
  LogOut,
  Menu,
  User,
  ChevronRight,
  School,
  Briefcase,
  Clock,
  BookMarked,
  Award,
  UserCheck,
  Building,
  Folder,
  Network,
  Tool,
  Utensils,
  CloudSun,
  Activity,
  Info,
  Phone,
  Bus,
  Train,
  Bike,
  Tag,
  Heart,
  Gift,
  Search,
  Car
} from 'lucide-react';
import { TeamsIcon, OutlookIcon, OneDriveIcon, CalendarIcon } from './icons/MicrosoftIcons';
import DraggableMenuItem from './DraggableMenuItem';

interface NavSectionProps {
  title: string;
  children: React.ReactNode;
  color: string;
  isCollapsed: boolean;
}

interface SidebarProps {
  onCollapse: (collapsed: boolean) => void;
}

function NavSection({ title, children, color, isCollapsed }: NavSectionProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-0.5">
      {!isCollapsed && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between p-3 text-white ${color} hover:opacity-90 transition-opacity`}
        >
          <span className="font-medium">{title}</span>
          <ChevronDown className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      )}
      <div className={`${!isCollapsed && !isOpen ? 'hidden' : ''} ${isCollapsed ? 'border-t border-sidebar-hover' : ''}`}>
        {children}
      </div>
    </div>
  );
}

const schoolMenuItems = {
  scolarite: [
    { id: 'timetable', label: 'Emploi du temps', icon: 'Calendar', widgetType: 'timetable' },
    { id: 'absences', label: 'Absences & retards', icon: 'Clock', widgetType: 'absences' },
    { id: 'homework', label: 'Travail à faire', icon: 'BookMarked', widgetType: 'homework' },
    { id: 'results', label: 'Résultats', icon: 'Award', widgetType: 'results' },
    { id: 'enit-info', label: 'Informations ENIT', icon: 'UserCheck', widgetType: 'enit-info' },
    { id: 'enit-map', label: 'Plan de l\'ENIT', icon: 'Building', widgetType: 'enit-map' }
  ],
  organisation: [
    { id: 'student-life', label: 'Vie étudiant', icon: 'Users', widgetType: 'student-life' },
    { id: 'mail', label: 'Mail', icon: 'Mail', widgetType: 'mail' },
    { id: 'moodle', label: 'Moodle', icon: 'BookOpen', widgetType: 'moodle' },
    { id: 'directory', label: 'Annuaire universitaire', icon: 'Users', widgetType: 'directory' },
    { id: 'jobs', label: 'Emplois & stages', icon: 'Briefcase', widgetType: 'jobs' }
  ],
  administration: [
    { id: 'documents', label: 'Mes documents', icon: 'Folder', widgetType: 'documents' },
    { id: 'library', label: 'Bibliothèque', icon: 'Library', widgetType: 'library' },
    { id: 'tools', label: 'Outils de collaboration', icon: 'Share2', widgetType: 'tools' },
    { id: 'equipment', label: 'Location de matériel', icon: 'Tool', widgetType: 'equipment' },
    { id: 'faq', label: 'FAQ', icon: 'HelpCircle', widgetType: 'faq' }
  ]
};

const personalMenuItems = {
  vieQuotidienne: [
    { id: 'restaurant', label: 'Restaurant universitaire', icon: 'Utensils', widgetType: 'restaurant' },
    { id: 'weather', label: 'Météo', icon: 'CloudSun', widgetType: 'weather' },
    { id: 'sports', label: 'Activités sportives', icon: 'Activity', widgetType: 'sports' },
    { id: 'traffic', label: 'Infos trafic', icon: 'Info', widgetType: 'traffic' },
    { id: 'contacts', label: 'Contacts utiles', icon: 'Phone', widgetType: 'contacts' }
  ],
  transport: [
    { id: 'parking', label: 'Places de parking', icon: 'Car', widgetType: 'parking' },
    { id: 'bus', label: 'Horaires de bus', icon: 'Bus', widgetType: 'bus' },
    { id: 'train', label: 'Horaires de train', icon: 'Train', widgetType: 'train' },
    { id: 'carpool', label: 'Covoiturage', icon: 'Users', widgetType: 'carpool' },
    { id: 'bike', label: 'Location (vélo, trottinette)', icon: 'Bike', widgetType: 'bike' }
  ],
  administration: [
    { id: 'calendar', label: 'Agenda personnel', icon: 'Calendar', widgetType: 'calendar' },
    { id: 'deals', label: 'Bons plans étudiants', icon: 'Tag', widgetType: 'deals' },
    { id: 'health', label: 'Prévention & Santé', icon: 'Heart', widgetType: 'health' },
    { id: 'housing', label: 'Dons (nourriture, habits)', icon: 'Gift', widgetType: 'housing' },
    { id: 'support', label: 'Recherche & Assistance', icon: 'Search', widgetType: 'support' }
  ]
};

const commonMenuItems = {
  compte: [
    { id: 'settings', label: 'Paramètres du compte', icon: 'Settings', widgetType: 'settings' },
    { id: 'help', label: 'Faire aux questions', icon: 'HelpCircle', widgetType: 'help' },
    { id: 'logout', label: 'Se déconnecter', icon: 'LogOut', widgetType: 'logout' }
  ]
};

export default function Sidebar({ onCollapse }: SidebarProps) {
  const { t } = useTranslation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeWorkspace, setActiveWorkspace] = useState<'school' | 'personal'>('school');
  
  const shortcuts = [
    { icon: TeamsIcon, label: 'Teams', isCustomIcon: true },
    { icon: CalendarIcon, label: 'Calendar', isCustomIcon: true },
    { icon: OneDriveIcon, label: 'OneDrive', isCustomIcon: true },
    { icon: OutlookIcon, label: 'Outlook', isCustomIcon: true },
  ];

  const toggleSidebar = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    onCollapse(newCollapsed);
  };

  return (
    <>
      {isCollapsed && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-sidebar-main text-white rounded-full hover:bg-sidebar-hover transition-colors shadow-lg"
          aria-label="Expand sidebar"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
      
      <aside 
        className={`fixed left-0 top-0 h-full bg-sidebar-gradient text-white overflow-y-auto transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
      >
        {!isCollapsed && (
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-sidebar-hover transition-colors"
            aria-label="Collapse sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className={`flex items-center p-4 ${isCollapsed ? 'justify-center' : ''}`}>
          {isCollapsed ? (
            <User className="w-6 h-6" />
          ) : (
            <>
              <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&fit=crop&q=80" 
                alt="Profile" 
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3">
                <h2 className="font-medium">Doe Eylona</h2>
              </div>
            </>
          )}
        </div>

        {/* Workspace toggle */}
        <div className={`px-4 mb-4 ${isCollapsed ? 'flex justify-center' : ''}`}>
          <button 
            onClick={() => setActiveWorkspace(activeWorkspace === 'school' ? 'personal' : 'school')}
            className={`${
              isCollapsed 
                ? 'w-12 h-12 flex items-center justify-center'
                : 'w-full flex items-center justify-between px-4 py-2'
            } bg-sidebar-hover rounded-md hover:opacity-90 transition-opacity group relative`}
          >
            {isCollapsed ? (
              <>
                <School className="w-5 h-5" />
                <div className="absolute left-full ml-2 py-1 px-2 bg-sidebar-hover rounded-md text-sm whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                  {activeWorkspace === 'school' ? 'Espace Scolaire' : 'Espace Personnel'}
                </div>
              </>
            ) : (
              <>
                <span className="font-medium">
                  {activeWorkspace === 'school' ? 'Espace Scolaire' : 'Espace Personnel'}
                </span>
                <School className="w-5 h-5 opacity-80" />
              </>
            )}
          </button>
        </div>

        {/* Shortcuts */}
        <div className={`px-3 mb-4 ${isCollapsed ? 'flex flex-col items-center space-y-2' : ''}`}>
          {!isCollapsed && <h3 className="text-sm mb-3 px-1">Vos Outils en Raccourcis</h3>}
          <div className={isCollapsed ? 'space-y-2' : 'grid grid-cols-2 gap-2'}>
            {shortcuts.map((item) => (
              <button
                key={item.label}
                className={`group relative ${
                  isCollapsed 
                    ? 'w-12 h-12 flex items-center justify-center hover:bg-sidebar-hover rounded-lg transition-colors'
                    : 'flex flex-col items-center p-2 bg-sidebar-hover rounded hover:opacity-90 transition-opacity'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <item.icon />
                {!isCollapsed && <span className="text-xs mt-1">{item.label}</span>}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 py-1 px-2 bg-sidebar-hover rounded-md text-sm whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                    {item.label}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Menu sections based on active workspace */}
        {activeWorkspace === 'school' ? (
          <>
            <NavSection title="Scolarité" color="bg-sidebar-section-scolarite" isCollapsed={isCollapsed}>
              {schoolMenuItems.scolarite.map((item) => (
                <DraggableMenuItem
                  key={item.id}
                  item={{
                    id: item.id,
                    label: item.label,
                    icon: item.icon,
                    section: 'scolarite',
                    widgetType: item.widgetType
                  }}
                  isCollapsed={isCollapsed}
                />
              ))}
            </NavSection>

            <NavSection title="Organisation" color="bg-sidebar-section-organisation" isCollapsed={isCollapsed}>
              {schoolMenuItems.organisation.map((item) => (
                <DraggableMenuItem
                  key={item.id}
                  item={{
                    id: item.id,
                    label: item.label,
                    icon: item.icon,
                    section: 'organisation',
                    widgetType: item.widgetType
                  }}
                  isCollapsed={isCollapsed}
                />
              ))}
            </NavSection>

            <NavSection title="Administration" color="bg-sidebar-section-administration" isCollapsed={isCollapsed}>
              {schoolMenuItems.administration.map((item) => (
                <DraggableMenuItem
                  key={item.id}
                  item={{
                    id: item.id,
                    label: item.label,
                    icon: item.icon,
                    section: 'administration',
                    widgetType: item.widgetType
                  }}
                  isCollapsed={isCollapsed}
                />
              ))}
            </NavSection>
          </>
        ) : (
          <>
            <NavSection title="Vie Quotidienne" color="bg-[#004D6A]" isCollapsed={isCollapsed}>
              {personalMenuItems.vieQuotidienne.map((item) => (
                <DraggableMenuItem
                  key={item.id}
                  item={{
                    id: item.id,
                    label: item.label,
                    icon: item.icon,
                    section: 'vieQuotidienne',
                    widgetType: item.widgetType
                  }}
                  isCollapsed={isCollapsed}
                />
              ))}
            </NavSection>

            <NavSection title="Transport & Mobilité" color="bg-[#004D6A]" isCollapsed={isCollapsed}>
              {personalMenuItems.transport.map((item) => (
                <DraggableMenuItem
                  key={item.id}
                  item={{
                    id: item.id,
                    label: item.label,
                    icon: item.icon,
                    section: 'transport',
                    widgetType: item.widgetType
                  }}
                  isCollapsed={isCollapsed}
                />
              ))}
            </NavSection>

            <NavSection title="Administration" color="bg-[#004D6A]" isCollapsed={isCollapsed}>
              {personalMenuItems.administration.map((item) => (
                <DraggableMenuItem
                  key={item.id}
                  item={{
                    id: item.id,
                    label: item.label,
                    icon: item.icon,
                    section: 'administration',
                    widgetType: item.widgetType
                  }}
                  isCollapsed={isCollapsed}
                />
              ))}
            </NavSection>
          </>
        )}

        {/* Common sections */}
        <NavSection title="Compte" color="bg-[#1A1A1A]" isCollapsed={isCollapsed}>
          {commonMenuItems.compte.map((item) => (
            <DraggableMenuItem
              key={item.id}
              item={{
                id: item.id,
                label: item.label,
                icon: item.icon,
                section: 'compte',
                widgetType: item.widgetType
              }}
              isCollapsed={isCollapsed}
            />
          ))}
        </NavSection>
      </aside>
    </>
  );
}