import React, { useState, useCallback, useRef } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import MDEditor from '@uiw/react-md-editor';
import { ImageUpload } from './ImageUpload';

export function MessageForm({ onMessageChange, message }) {
  const [sending, setSending] = useState(false);
  const messageRef = useRef(message);

  // Update ref when message changes
  React.useEffect(() => {
    messageRef.current = message;
  }, [message]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSending(true);
    try {
      const { error } = await supabase
        .from('message')
        .insert([{ content: message }]);

      if (error) throw error;

      onMessageChange('');
      alert('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const handleEditorChange = (value) => {
    messageRef.current = value || '';
    onMessageChange(value || '');
  };

  const handleImageUpload = useCallback((url) => {
    const currentMessage = messageRef.current;
    const imageMarkdown = `![](${url})`;
    const newMessage = currentMessage
      ? `${currentMessage}\n${imageMarkdown}`
      : imageMarkdown;

    onMessageChange(newMessage);
  }, [onMessageChange]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Message
        </label>
        <div data-color-mode="light" className="mb-4">
          <MDEditor
            value={message}
            onChange={handleEditorChange}
            preview="edit"
            height={400}
            visibleDragbar={false}
            enableScroll={true}
            textareaProps={{
              placeholder: 'Type your message here... Use the toolbar above for formatting!'
            }}
          />
        </div>
        <div className="mb-4">
          <ImageUpload onImageUrl={handleImageUpload} />
        </div>
        <button
          type="submit"
          disabled={sending || !message.trim()}
          className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {sending ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
              Sending...
            </>
          ) : (
            <>
              <Send className="-ml-1 mr-2 h-4 w-4" />
              Send Message
            </>
          )}
        </button>
      </div>
    </form>
  );
}
