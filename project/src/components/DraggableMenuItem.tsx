import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import * as Icons from 'lucide-react';
import { DraggableMenuItem as DraggableMenuItemType } from '../types/widget';

interface Props {
  item: DraggableMenuItemType;
  isCollapsed?: boolean;
}

export default function DraggableMenuItem({ item, isCollapsed }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: item.id,
    data: {
      widgetType: item.widgetType,
      label: item.label,
      icon: item.icon,
      section: item.section
    }
  });

  const Icon = (Icons as any)[item.icon] || Icons.Circle;

  return (
    <button
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`w-full flex items-center px-4 py-2.5 text-white hover:bg-sidebar-hover transition-colors group cursor-grab active:cursor-grabbing ${
        isCollapsed ? 'justify-center relative' : ''
      } ${isDragging ? 'opacity-50' : ''}`}
      title={isCollapsed ? item.label : undefined}
      style={{
        transform: CSS.Translate.toString(transform),
        touchAction: 'none',
      }}
    >
      <Icon className="w-5 h-5 min-w-5" />
      {!isCollapsed && <span className="text-sm ml-3 text-left">{item.label}</span>}
      {isCollapsed && (
        <div className="absolute left-full ml-2 py-1 px-2 bg-sidebar-hover rounded-md text-sm whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
          {item.label}
        </div>
      )}
    </button>
  );
}