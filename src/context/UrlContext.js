import React, { createContext } from 'react'
import coockies from 'js-cookie';

export const UrlContext = createContext()




export default function UrlProvider({children}) {


    const URL = {
        url: "http://www.freewsad.com/",
        lang: coockies.get('i18next')
    }

  return (
        <UrlContext.Provider value={URL}>
            {children}
        </UrlContext.Provider>
    )
}
