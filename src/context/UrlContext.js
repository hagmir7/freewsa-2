import React, { createContext } from 'react'
import coockies from 'js-cookie';

export const UrlContext = createContext()




export default function UrlProvider({children}) {


    const URL = {
        url: "https://www.freedaz.com/",
        lang: coockies.get('i18next')
    }

  return (
        <UrlContext.Provider value={URL}>
            {children}
        </UrlContext.Provider>
    )
}
