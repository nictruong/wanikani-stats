import React, { useState, useEffect } from 'react';
import './App.scss';
import 'semantic-ui-css/semantic.min.css';
import AppHeader from './components/AppHeader/AppHeader';
import ApiKeyInput from './components/ApiKeyInput/ApiKeyInput';
import Stats from './components/Stats/Stats';
import WanikaniApi from './utils/WanikaniApi';
import { WanikaniUser } from './types/Wanikani';

function App() {
  const [apiKey, setApiKey] = useState();
  const [user, setUser] = useState<WanikaniUser>();

  const onApiKeyClick = (apiKeyValue: string) => {
    setApiKey(apiKeyValue);
  };

  useEffect(() => {  
    if (apiKey) {
      const getUser = async () => {
        const user: WanikaniUser = await WanikaniApi.getUser(apiKey);
        setUser(user);
      }

      getUser();
    }
  }, [apiKey]);

  return (
    <div>
      <AppHeader user={ user! } />
      <ApiKeyInput onApiKeyClick={ onApiKeyClick } />
      {
        user && <Stats apiKey={ apiKey } user={ user } />
      }
    </div>
  );
}

export default App;
