import React from 'react';
import { useDroppable } from '@dnd-kit/core';

interface DropZoneProps {
  children: React.ReactNode;
  isOver: boolean;
  isEmpty: boolean;
}

export default function DropZone({ children, isOver, isEmpty }: DropZoneProps) {
  const { setNodeRef } = useDroppable({
    id: 'main-drop-zone',
  });

  return (
    <div
      ref={setNodeRef}
      className={`relative min-h-[200px] rounded-xl transition-colors ${
        isOver ? 'bg-primary/5' : ''
      }`}
    >
      {isEmpty && isOver && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-lg text-gray-500 dark:text-gray-400">
            Déposez ici pour ajouter un widget
          </div>
        </div>
      )}
      {children}
    </div>
  );
}