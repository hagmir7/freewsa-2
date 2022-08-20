import React, { useContext} from 'react'
import { message } from 'antd';
import AuthContext from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { UrlContext } from '../../context/UrlContext';
import { LoadingOutlined } from '@ant-design/icons';







export default function UpdateProfileCard(props) {

  const { userInof } = useContext(AuthContext);
  const {t} = useTranslation();
  const {lang, url} = useContext(UrlContext);

  const addSpenerUser = (woner)=>{
    document.getElementById(woner+'-box').classList.remove('d-none');
    document.getElementById(woner+'-save').classList.add('d-none');
    document.getElementById(woner+'-btn').setAttribute('disabled', '')
  }
  
  const removeSpenerUser = (woner)=>{
    document.getElementById(woner+'-box').classList.add('d-none');
    document.getElementById(woner+'-save').classList.remove('d-none');
    document.getElementById(woner+'-btn').removeAttribute('disabled');
  }


  

  const UpdateProfile = async (event) => {
      addSpenerUser('profile');
      event.preventDefault();
      const response = await fetch(`${url}${lang}/api/update/profile/${userInof.id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              phone: event.target.phone.value,
              gander: event.target.gander.value,
              country: event.target.country.value,
              city: event.target.city.value,
              bio: event.target.bio.value,
          })
      })
      const data = await response.json();
      if(response.status == 200){
          message.success(data.message)
          removeSpenerUser('profile')
      }else{
          removeSpenerUser('profile')
          message.error(data.message)
      }

  }







  return (
    <div className="card mt-3">
    <form onSubmit={UpdateProfile}>
        <div className="card-body">
            <div id='alert2'></div>
            <div className="row mb-3">
                <div className="col-sm-3">
                    <h6 className="mb-0">{t("Phone")}</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                    <input type="text" required name='phone' className="form-control" defaultValue={props.phone} />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-sm-3">
                    <h6 className="mb-0">{t("Country")}</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                    <input type="text" required name='country' className="form-control" defaultValue={props.country} />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-sm-3">
                    <h6 className="mb-0">{t("City or town")}</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                    <input type="text" required name='city' className="form-control" defaultValue={props.city} />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-sm-3">
                    <h6 className="mb-0">{t("Gander")}</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                    <select className='form-select' name='gander' required>
                        <option value="Male">{t("Male")}</option> 
                        <option value="Famele">{t("Famele")}</option> 
                    </select>

                </div>
            </div>
            <div className="row mb-3">
                <div className="col-sm-3">
                    <h6 className="mb-0">{t("Bio")}</h6>
                </div>
                <div className="col-sm-9 text-secondary">
                    <textarea required name='bio' className="form-control" defaultValue={props.bio}></textarea>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-sm-9 text-secondary">
                <button type="submit" id="profile-btn" className="btn btn-primary px-4 btn-sm w-50">
                        <span id="profile-save">{t("Save Changes")}</span> 
                        <LoadingOutlined className="d-none" id="profile-box" style={{ fontSize: 24}} />
                </button>

                </div>
            </div>
        </div>
    </form>
</div>
  )
}




