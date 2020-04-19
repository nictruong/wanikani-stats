import React from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import { WanikaniUser } from '../../types/Wanikani';

type AppHeaderProps = {
    user: WanikaniUser,
}

const AppHeader: React.FC<AppHeaderProps> = ({
    user,
}) => {

    return (
        <Segment>
            <Menu fixed='top' inverted>
                <Menu.Item header>
                    Wanikani Stats
                </Menu.Item>
                <Menu.Item position='right'>
                    {user?.data ? `${user.data.username} lvl ${user.data.level}` : ''}
                </Menu.Item>
            </Menu>
        </Segment>
    );
};

export default AppHeader;