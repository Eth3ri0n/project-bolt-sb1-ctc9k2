import React, { useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import './i18n';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SearchBar from './components/search/SearchBar';
import DropZone from './components/DropZone';
import WidgetSection from './components/widgets/WidgetSection';
import { Widget, DraggableMenuItem } from './types/widget';
import { useSearch } from './hooks/useSearch';

export default function App() {
  const { t } = useTranslation();
  const [isDark, setIsDark] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeWorkspace, setActiveWorkspace] = useState<'school' | 'personal'>('school');
  const [schoolWidgets, setSchoolWidgets] = useState<Widget[]>([]);
  const [personalWidgets, setPersonalWidgets] = useState<Widget[]>([]);
  const [activeDraggable, setActiveDraggable] = useState<Widget | DraggableMenuItem | null>(null);
  const [isOverDropZone, setIsOverDropZone] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [activeModals, setActiveModals] = useState<string[]>([]);

  const currentWidgets = activeWorkspace === 'school' ? schoolWidgets : personalWidgets;
  const setCurrentWidgets = activeWorkspace === 'school' ? setSchoolWidgets : setPersonalWidgets;

  const { searchQuery, setSearchQuery, filteredWidgets } = useSearch(currentWidgets, {
    category: selectedCategory,
    showFavorites
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveDraggable(event.active.data.current);
  }, []);

  const handleDragOver = useCallback((event: DragOverEvent) => {
    setIsOverDropZone(event.over?.id === 'main-drop-zone');
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    setIsOverDropZone(false);
    setActiveDraggable(null);

    if (!over) return;

    // Handle menu item drop
    if (active.data.current?.widgetType) {
      const menuItem = active.data.current;
      const newWidget: Widget = {
        id: `${menuItem.widgetType}-${Date.now()}`,
        type: menuItem.widgetType,
        title: menuItem.label,
        icon: menuItem.icon,
        section: menuItem.section,
        isFavorite: false,
        notifications: []
      };
      setCurrentWidgets(prev => [...prev, newWidget]);
      return;
    }

    // Handle widget reordering
    if (active.id !== over.id) {
      setCurrentWidgets((items) => {
        const oldIndex = items.findIndex(i => i.id === active.id);
        const newIndex = items.findIndex(i => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }, [setCurrentWidgets]);

  const handleModalOpen = useCallback((widgetId: string) => {
    setActiveModals(prev => [...prev, widgetId]);
  }, []);

  const handleModalClose = useCallback((widgetId: string) => {
    setActiveModals(prev => prev.filter(id => id !== widgetId));
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark(prev => !prev);
    document.documentElement.classList.toggle('dark');
  }, []);

  const removeWidget = useCallback((id: string) => {
    setCurrentWidgets(widgets => widgets.filter(w => w.id !== id));
  }, [setCurrentWidgets]);

  const toggleWidgetFavorite = useCallback((id: string) => {
    setCurrentWidgets(widgets => 
      widgets.map(w => 
        w.id === id ? { ...w, isFavorite: !w.isFavorite } : w
      )
    );
  }, [setCurrentWidgets]);

  const handleNotification = useCallback((widgetId: string, action: 'markAsRead' | 'markAsUnread' | 'delete', notificationId?: string) => {
    setCurrentWidgets(widgets => 
      widgets.map(w => {
        if (w.id !== widgetId || !w.notifications) return w;
        
        return {
          ...w,
          notifications: action === 'delete'
            ? notificationId
              ? w.notifications.filter(n => n.id !== notificationId)
              : []
            : w.notifications.map(n => 
                notificationId
                  ? n.id === notificationId 
                    ? { ...n, isRead: action === 'markAsRead' }
                    : n
                  : { ...n, isRead: action === 'markAsRead' }
              )
        };
      })
    );
  }, [setCurrentWidgets]);

  const favoriteWidgets = filteredWidgets.filter(w => w.isFavorite);

  // Group widgets by section
  const widgetsBySection = useMemo(() => {
    const nonFavorites = filteredWidgets.filter(w => !w.isFavorite);
    const sections: Record<string, Widget[]> = {};
    nonFavorites.forEach(widget => {
      if (!sections[widget.section]) {
        sections[widget.section] = [];
      }
      sections[widget.section].push(widget);
    });
    return sections;
  }, [filteredWidgets]);

  const isDraggingDisabled = activeModals.length > 0;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white ${isDark ? 'dark' : ''}`}>
        <Header 
          isDark={isDark} 
          toggleTheme={toggleTheme} 
          isSidebarCollapsed={isSidebarCollapsed} 
        />
        <Sidebar 
          onCollapse={setIsSidebarCollapsed} 
          activeWorkspace={activeWorkspace}
          onWorkspaceChange={setActiveWorkspace}
        />
        
        <main className={`transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'ml-16' : 'ml-64'
        } p-8 pt-24`}>
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              {t('welcome')}
            </h1>
            
            <SearchBar 
              onSearch={setSearchQuery}
              onCategoryChange={setSelectedCategory}
              onToggleFavorites={setShowFavorites}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              showFavorites={showFavorites}
            />

            <DropZone isOver={isOverDropZone} isEmpty={currentWidgets.length === 0}>
              <div className="space-y-8">
                {favoriteWidgets.length > 0 && (
                  <WidgetSection
                    title="Favoris"
                    color="bg-yellow-500"
                    widgets={favoriteWidgets}
                    onRemove={removeWidget}
                    onToggleFavorite={toggleWidgetFavorite}
                    onNotification={handleNotification}
                    isDraggingDisabled={isDraggingDisabled}
                    onModalOpen={handleModalOpen}
                    onModalClose={handleModalClose}
                  />
                )}

                {Object.entries(widgetsBySection).map(([section, sectionWidgets]) => (
                  <WidgetSection
                    key={section}
                    title={section.charAt(0).toUpperCase() + section.slice(1)}
                    color={`bg-sidebar-section-${section}`}
                    widgets={sectionWidgets}
                    onRemove={removeWidget}
                    onToggleFavorite={toggleWidgetFavorite}
                    onNotification={handleNotification}
                    isDraggingDisabled={isDraggingDisabled}
                    onModalOpen={handleModalOpen}
                    onModalClose={handleModalClose}
                  />
                ))}
              </div>
            </DropZone>
          </div>
        </main>
      </div>
    </DndContext>
  );
}