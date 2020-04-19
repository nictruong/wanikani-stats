import React, { useState } from 'react';
import { Input, Button, Segment, Container } from 'semantic-ui-react';

type ApiKeyInputProps = {
    onApiKeyClick: (apiKey: string) => void,
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({
    onApiKeyClick,
}) => {
    const [apiInputValue, setApiInputValue] = useState('282144d7-58c0-43f9-bec4-cc06229c4cf6');

    return (
        <Container>
            <Segment>
                <Input 
                    className='api-key-input'
                    action={
                        <Button 
                            primary 
                            onClick={ () => onApiKeyClick(apiInputValue) }
                        >
                            Enter Api Key
                        </Button>
                    }
                    value={apiInputValue}
                    onChange={(e) => setApiInputValue(e.target.value)}
                />
            </Segment>
        </Container>
    )
};

export default ApiKeyInput