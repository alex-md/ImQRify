import React from 'react';
import { Button, Input, Card } from '@heroui/react';
import { Icon } from '@iconify/react';
import QRCode from 'qrcode.react';
import { DropZone } from './drop-zone';

export function QRCodeGenerator() {
    const [imageUrl, setImageUrl] = React.useState<string>('');
    const [isDragging, setIsDragging] = React.useState(false);

    const handleDrop = (files: FileList) => {
        const file = files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageUrl(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePaste = async () => {
        try {
            const clipboardItems = await navigator.clipboard.read();
            for (const clipboardItem of clipboardItems) {
                for (const type of clipboardItem.types) {
                    if (type.startsWith('image/')) {
                        const blob = await clipboardItem.getType(type);
                        const url = URL.createObjectURL(blob);
                        setImageUrl(url);
                        break;
                    }
                }
            }
        } catch (err) {
            console.error('Failed to read clipboard:', err);
        }
    };

    const downloadQR = () => {
        const canvas = document.querySelector('canvas');
        if (canvas) {
            const url = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'qr-code.png';
            link.href = url;
            link.click();
        }
    };

    return (
        <div className="space-y-6">
            <DropZone
                onDrop={handleDrop}
                onDragStateChange={setIsDragging}
                className={isDragging ? 'border-primary' : ''}
            />

            <div className="flex gap-4">
                <Input
                    placeholder="Or paste image URL here..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="flex-1"
                />
                <Button
                    color="primary"
                    onPress={handlePaste}
                    startContent={<Icon icon="lucide:clipboard" />}
                >
                    Paste Image
                </Button>
            </div>

            {imageUrl && (
                <Card className="p-4">
                    <div className="flex flex-col items-center gap-4">
                        <QRCode
                            value={imageUrl}
                            size={200}
                            level="H"
                            includeMargin
                            className="bg-white p-2 rounded"
                        />
                        <Button
                            color="primary"
                            onPress={downloadQR}
                            startContent={<Icon icon="lucide:download" />}
                        >
                            Download QR Code
                        </Button>
                    </div>
                </Card>
            )}
        </div>
    );
}
