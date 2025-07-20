import { useEffect, useState } from 'react';
import supabase from '../supabase/supabase-client';
import { Card, Form, Spinner, Image, Button } from 'react-bootstrap';

export default function Avatar({ url, size = 150, onUpload }) {
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [uploading, setUploading] = useState(false);
    
    useEffect(() => {
        if (url) {
            downloadImage(url);
        }
        return () => {
            if (avatarUrl) URL.revokeObjectURL(avatarUrl);
        };
    }, [url]);
    
    const downloadImage = async (path) => {
        try {
            const { data, error } = await supabase.storage.from('avatars').download(path);
            if (error) throw error;
            const objectUrl = URL.createObjectURL(data);
            setAvatarUrl(objectUrl);
        } catch (error) {
            console.error('Errore nel download immagine:', error.message);
        }
    };
    
    const uploadAvatar = async (event) => {
        try {
            setUploading(true);
            const file = event.target.files?.[0];
            if (!file) throw new Error('Nessun file selezionato');
            
            const ext = file.name.split('.').pop();
            const fileName = `${crypto.randomUUID()}.${ext}`;
            
            const { error } = await supabase.storage
            .from('avatars')
            .upload(fileName, file);
            
            if (error) throw error;
            
            onUpload(event, fileName);
        } catch (error) {
            alert(error.message);
        } finally {
            setUploading(false);
        }
    };
    
    return (
        <Card className="text-center p-3 border-0 shadow-sm bg-warning bg-opacity-75 rounded-4 mx-auto" style={{ maxWidth: size + 100 }}>
        {avatarUrl ? (
            <Image
            src={avatarUrl}
            roundedCircle
            style={{
                height: size,
                width: size,
                objectFit: 'cover',
                border: '2px solid #0d6efd',
                marginBottom: '15px',
                margin: '0 auto',
            }}
            alt="Avatar"
            />
        ) : (
            <div
            className="bg-light rounded-circle"
            style={{
                height: size,
                width: size,
                margin: '0 auto 15px',
                border: '2px dashed #ccc',
            }}
            />
        )}
        
        <Form.Group>
        <Form.Label className="mb-2 text-muted fw-semibold">Seleziona nuova immagine</Form.Label>
        <Form.Control type="file" accept="image/*" onChange={uploadAvatar} disabled={uploading} />
        </Form.Group>
        
        {uploading && (
            <div className="mt-3">
            <Spinner animation="border" size="sm" className="me-2" />
            <span className="text-muted">Caricamento in corso...</span>
            </div>
        )}
        </Card>
    );
}