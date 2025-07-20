import { useEffect, useState, useRef, useCallback } from "react";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import supabase from '../supabase/supabase-client';

const chatContainer = {
    marginTop: '5px',
    padding: '8px 3px',
    width: "100%",
    height: '58vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(27, 33, 43, 0.7)',
    backdropFilter: 'blur(5px)',
    overflowY: 'scroll'
}

dayjs.extend(relativeTime);

export default function RealtimeChat({ data }) {
    const [messages, setMessages] = useState([]);
    const [loadingInitial, setLoadingInitial] = useState(false);
    const [error, setError] = useState("");
    const messageRef = useRef(null);
    
    const scrollSmoothToBottom = () => {
        if (messageRef.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight;
        }
    }
    
    const getInitialMessages = useCallback(async () => {
        setLoadingInitial(true);
        const { data: messages, error } = await supabase
        .from("messages")
        .select()
        .eq("game_id", data?.id);
        
        if (error) {
            setError(error.message);
            return;
        }
        setLoadingInitial(false);
        setMessages(messages);
    }, [data?.id]);
    
    useEffect(() => {
        if (data) {
            getInitialMessages();
            
            const channel = supabase
            .channel("messages")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "messages" },
                () => getInitialMessages()
            )
            .subscribe();
            
            return () => {
                if (channel) {
                    supabase.removeChannel(channel);
                    channel.unsubscribe();
                }
            }
        }
    }, [data, getInitialMessages]);
    
    useEffect(() => {
        scrollSmoothToBottom();
    }, [messages]);
    
    return (
        <div style={chatContainer} ref={messageRef}>
        {loadingInitial && <progress></progress>}
        {error && <article>{error}</article>}
        {messages && messages.map((message) => (
            <article key={message.id}>
            <p style={{ color: 'white' }}>{message.profile_username}</p>
            <small style={{ color: 'lightgray' }}>{message.content}</small>
            <p style={{ color: 'gray', fontSize: '0.7em' }}>{dayjs().to(dayjs(message.created_at))}</p>
            </article>
        ))}
        </div>
    )
}