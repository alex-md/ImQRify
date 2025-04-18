import React from 'react';
import { Card, CardBody } from '@heroui/react';
import { QRCodeGenerator } from './components/qr-code-generator';

export default function App() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl">
                <CardBody className="p-6">
                    <h1 className="text-2xl font-semibold text-foreground mb-4">
                        QR Code Generator
                    </h1>
                    <QRCodeGenerator />
                </CardBody>
            </Card>
        </div>
    );
}
