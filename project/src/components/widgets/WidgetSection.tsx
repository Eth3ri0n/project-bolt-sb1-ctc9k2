import React from 'react';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import DroppableWidget from '../DroppableWidget';
import { Widget } from '../../types/widget';
import { Star } from 'lucide-react';

interface WidgetSectionProps {
  title: string;
  color: string;
  widgets: Widget[];
  onRemove: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onNotification: (widgetId: string, action: 'markAsRead' | 'markAsUnread' | 'delete', notificationId?: string) => void;
}

export default function WidgetSection({
  title,
  color,
  widgets,
  onRemove,
  onToggleFavorite,
  onNotification
}: WidgetSectionProps) {
  if (widgets.length === 0) return null;

  const isFavoriteSection = title === 'Favoris';

  return (
    <div className="space-y-4">
      <div className={`px-4 py-2 ${color} rounded-lg`}>
        <div className="flex items-center gap-2">
          {isFavoriteSection && (
            <Star className="w-5 h-5 text-white fill-white" />
          )}
          <h2 className="text-xl font-semibold text-white">{title}</h2>
        </div>
      </div>
      <SortableContext items={widgets.map(w => w.id)} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {widgets.map((widget) => (
            <DroppableWidget
              key={widget.id}
              widget={widget}
              onRemove={onRemove}
              onToggleFavorite={() => onToggleFavorite(widget.id)}
              onNotification={(action, notificationId) => 
                onNotification(widget.id, action, notificationId)
              }
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}