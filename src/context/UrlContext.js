import React, { createContext, useState } from 'react'
import coockies from 'js-cookie';
export const UrlContext = createContext()




export default function UrlProvider({children}) {

    const [url, setUrl ] = useState('https://www.freedaz.com/')

    // if (process.env.NODE_ENV !== 'production') {
    //     setUrl("https://www.freedaz.com/")
    //     console.log("Develpmnt")
    // } else {
    //     setUrl("http://127.0.0.1:8000/")
    // }


    const URL = {
        url: url,
        lang: coockies.get('i18next')
    }

  return (
        <UrlContext.Provider value={URL}>
            {children}
        </UrlContext.Provider>
    )
}
