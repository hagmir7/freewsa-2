import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../context/LanguageContext';
import { Button, Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function CreateLanguage() {

  const { CreateLang, language } = useContext(LanguageContext);
  const { t } = useTranslation();

  const [visible, setVisible] = useState(false);
  const [spenner, setSpenner] = useState(false);


  
  const showModal = () => {
    setVisible(true);
  };


  const handleCancel = () => {
    setVisible(false);
  };


  



  const LangList = () => {
    return (
      <ul className="list-group mt-2">
        {language.map(item => {
          return (
            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
              {item.name}
              <span className="badge bg-primary rounded-pill">{item.code}</span>
            </li>
          )
        })}
      </ul>
    )
  }



  return (
    <>
      <Button type="dashed" className='mx-1 mt-1' onClick={showModal}>+</Button>
      <Modal
        title={t("Create Langauge")}
        visible={visible}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: 'none' } }}
        cancelText={t("Cancel")}
        
      >
        {visible ?
          <>
            <form id='language-form'>
              <input type="text" name="name" id="name" maxLength={30} className='form-control' placeholder={t("Language") + "..."} />
              <input type="text" name="code" required maxLength={3} id="code" className='form-control mt-2' placeholder={t("Code") + "..."} />

              <button type='button' onClick={CreateLang} className='mt-3 btn btn-sm btn-primary w-50'>
                {spenner ? <LoadingOutlined style={{ fontSize: 24 }} />
                  : <span>{t("Create")}</span>}
              </button>
            </form>
            <LangList />
          </>

          : <></>}

      </Modal>
    </>
  )
}

 


