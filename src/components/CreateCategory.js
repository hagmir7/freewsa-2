import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button, message, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { LoadingOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { UrlContext } from '../context/UrlContext';


export default function CreateCategory() {


    useEffect(() => {
        categoryList()
        languageList();
    }, [])

    const { t } = useTranslation();

    const {url, lang} = useContext(UrlContext);


    const [languageOption, setLanguageOption] = useState();
    const [list, setList] = useState();
    const [spenner, setSpenner] = useState(false)

    const createCategory = async () => {
        const form = document.getElementById('form-category')
        const formData = new FormData(form);
        setSpenner(true);

        axios.post(url+lang+'/api/post/category/crud/1', formData, {
            headers: {
                'Content-Type': "application/json"
            }
        }).then(response => {
            message.success(response.data.message);
            setSpenner(false);
            form.reset();
            categoryList()
        }).catch(error => {
            setSpenner(false);
            message.error(t("Fail to create category."));
        })
    }

    // Category List 
    const categoryList = () => {
        axios.get(url+lang+'/api/post/category/', {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            const data = response.data.data;
            const listCategory = data.map(item => {
                return (
                    <li key={item.id} className="list-group-item d-flex fw-bold justify-content-between align-items-center">
                        {item.name}
                        <span className="badge text-black">{item.language}</span>
                    </li>
                )
            });
            setList(listCategory);

        }).catch(error => {
            message.error(t("Fail to load categories"));
        })
    }

    // language list
    const languageList = () => {
        axios.get(url+lang+'/api/language/list', {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {

            const data = response.data;
            const getOptions = data.map(item => {
                return <option key={item.id} value={item.id}>{item.name}</option>
            })
            setLanguageOption(getOptions);
        }).catch(error => {
            message.error("Fail to load Languages");
        })
    }



    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };



    return (
        <>
            <Button type="dashed" className='mx-1 mt-1' onClick={showModal}>+</Button>
            <Modal title={t("Create category")} visible={isModalVisible} okButtonProps={{ style: { display: 'none' } }} onCancel={handleCancel}>
                <form id='form-category'>
                    <input type="text" name="name" id="name" placeholder={t("Category name") + "..."} className='form-control' />
                    <select name="language" id="language" className='mt-2 form-select'>
                        <option value="">{t("Lanaguage")}</option>
                        {languageOption}
                    </select>
                    <button type='button' onClick={createCategory} className='mt-3 btn-sm btn btn-primary w-100'>
                        {spenner ? <LoadingOutlined style={{ fontSize: 24 }} />
                            : <span>{t("Publish")}</span>}
                    </button>
                </form>

                <div className='list-scroll mt-2'>
                    <h6 className='my-2'>{t("List categories")}</h6>
                    <ul className="list-group">
                        {list}
                    </ul>
                </div>
            </Modal>
        </>
    )
}
