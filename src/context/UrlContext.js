import React, { createContext, useState } from 'react'
import coockies from 'js-cookie';



export const UrlContext = createContext()




export default function UrlProvider({children}) {

    // const [url, setUrl ] = useState('http://127.0.0.1:8000/')



    const URL = {
        url: 'https://www.freedaz.com/',
        //  url: 'http://127.0.0.1:8000/',
        lang: coockies.get('i18next')
    }

  return (
        <UrlContext.Provider value={URL}>
            {children}
        </UrlContext.Provider>
    )
}
