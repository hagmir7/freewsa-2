import React, { createContext, useState } from 'react'
import coockies from 'js-cookie';

export const UrlContext = createContext()




export default function UrlProvider({children}) {

    const [url, setUrl ] = useState('')

    if (! '%NODE_ENV%' || '%NODE_ENV%' === 'development') {
        setUrl("https://www.freedaz.com/")
    } else {
        setUrl("http://127.0.0.1:8000/")
    }


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
