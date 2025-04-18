import React from 'react';
import { Card } from '@heroui/react';
import { Icon } from '@iconify/react';

interface DropZoneProps {
    onDrop: (files: FileList) => void;
    onDragStateChange: (isDragging: boolean) => void;
    className?: string;
}

export function DropZone({ onDrop, onDragStateChange, className = '' }: DropZoneProps) {
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        onDragStateChange(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        onDragStateChange(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        onDragStateChange(false);
        if (e.dataTransfer.files?.length) {
            onDrop(e.dataTransfer.files);
        }
    };

    return (
        <Card
            className={`border-2 border-dashed p-8 flex flex-col items-center justify-center gap-4 cursor-pointer transition-colors ${className}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <Icon icon="lucide:image-plus" className="w-12 h-12 text-default-400" />
            <div className="text-center">
                <p className="text-default-600 font-medium">
                    Drag and drop an image here
                </p>
                <p className="text-small text-default-400">
                    or paste from clipboard
                </p>
            </div>
        </Card>
    );
}
