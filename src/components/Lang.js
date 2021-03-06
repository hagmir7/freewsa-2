import { useTranslation } from "react-i18next";
import coockies from 'js-cookie'
import { useContext, useEffect } from "react";
import { message } from 'antd';
import AuthContext from "../context/AuthContext";




const languages = [
    {
        code: 'en',
        name: 'English'
    },
    {
        code: 'ar',
        name: 'العربية',
        dir: 'rtl'
    }
    // },
    // {
    //     code: 'fr',
    //     name: 'Français'
    // },
    // {
    //     code: 'es',
    //     name: 'Español'
    // },

]

const Lang = () => {

    const {user} = useContext(AuthContext)

  


    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const currentLanguageCode = coockies.get('i18next') || 'en'
    const currentLanguage =  languages.find(lan=>lan.code == currentLanguageCode)
    useEffect(() =>{
        document.querySelector('html').dir = currentLanguage.dir || 'ltr'

        if(user){
            Menu();
        }

    },[currentLanguage])
    const Menu = ()=>{
        document.querySelector('#avatar-menu').classList.remove(currentLanguageCode === 'ar' ? 'dropdown-menu-end' : 'dropdown-menu-start')
        document.querySelector('#avatar-menu').classList.add(currentLanguageCode === 'ar' ? 'dropdown-menu-start' : 'dropdown-menu-end')
    }


        const success = () => {
            message.success(t('lang_chang_msg'));
          };

    return (
        <div className="small">
            <select
            value={i18n.language}
            onChange={(e) =>{
                i18n.changeLanguage(e.target.value);
                success();
            }
                
            }
            className="form-select form-select-sm lang"
        >
            {languages.map(item =>(
                <option value={item.code}>{item.name}</option>
            ))}
         </select>
        </div>
    )
}

export default Lang;