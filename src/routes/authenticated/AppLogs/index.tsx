import React from 'react';
import Navbar from '../../../components/Navbar';

import styles from './logs.module.scss';
import { useTranslation } from 'react-i18next';
import Input from '../../../components/Input';

function AppLogs(props: any) {

    const {t} = useTranslation();
    
    const sample = `./src/routes/authenticated/Builds/index.tsx
    Line 11:8:  'App' is defined but never used                                                                                           @typescript-eslint/no-unused-vars
    Line 32:8:  React Hook useEffect has missing dependencies: 'dispatch' and 'name'. Either include them or remove the dependency array  react-hooks/exhaustive-deps
  
  ./src/Router.tsx
    Line 15:8:   'Navbar' is defined but never used           @typescript-eslint/no-unused-vars
    Line 32:11:  'router' is assigned a value but never used  @typescript-eslint/no-unused-vars
  
  ./src/routes/authenticated/Apps/index.tsx
    Line 22:8:  React Hook useEffect has a missing dependency: 'dispatch'. Either include it or remove the dependency array  react-hooks/exhaustive-deps
  
  ./src/routes/authenticated/Callback/index.tsx
    Line 24:8:  React Hook useEffect has missing dependencies: 'dispatch' and 'router.location'. Either include them or remove the dependency array  react-hooks/exhaustive-deps
  
  ./src/routes/authenticated/EditApp/index.tsx
    Line 28:8:   React Hook useEffect has missing dependencies: 'dispatch' and 'name'. Either include them or remove the dependency array      react-hooks/exhaustive-deps
    Line 37:28:  Using target="_blank" without rel="noopener noreferrer" is a security risk: see https://mathiasbynens.github.io/rel-noopener  react/jsx-no-target-blank
  
  ./src/actions/apps.actions.ts
    Line 2:8:  'history' is defined but never used  @typescript-eslint/no-unused-vars
  
  ./src/reducers/authentication.reducer.ts
    Line 5:8:  'User' is defined but never used  @typescript-eslint/no-unused-vars
  
  ./src/components/App/index.tsx
    Line 8:27:   'CrossIcon' is defined but never used   @typescript-eslint/no-unused-vars
    Line 16:12:  't' is assigned a value but never used  @typescript-eslint/no-unused-vars
  
  ./src/components/Navbar/index.tsx
    Line 8:27:   'useLocation' is defined but never used
  
                                                         @typescript-eslint/no-unused-vars
    Line 70:17:  The href attribute requires a valid value to be accessible. Provide a valid, navigable address as the href value. If you cannot provide a valid href, but still need the element to resemble a link, use a button and change it with appropriate styles. Learn more: https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md  jsx-a11y/anchor-is-valid
    Line 71:21:  img elements must have an alt prop, either with meaningful text, or an empty string for decorative images
  
                                                         jsx-a11y/alt-text
  
  Search for the keywords to learn more about each warning.
  To ignore, add // eslint-disable-next-line to the line before.`;

    return (
        <>
            <Navbar app/>
            <div className={`route ${styles.logs}`}>
                <div className={`container ${styles['logs-container']}`}>
                    <h3>{t('Logs')}</h3>
                    <Input large disabled value={sample}/>
                </div>
            </div>
        </>
    )
}

export default AppLogs;