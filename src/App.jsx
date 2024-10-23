import React, { useState } from 'react';
import { MessagePreview } from './components/MessagePreview';
import { MessageForm } from './components/MessageForm';

function App() {
  const [message, setMessage] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Send me a Message</h1>
          <p className="text-lg text-gray-600">
            Your message will be printed on my receipt printer. Markdown is supported!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <MessageForm 
            message={message}
            onMessageChange={setMessage}
          />
          <div className="sticky top-4">
            <MessagePreview content={message} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;