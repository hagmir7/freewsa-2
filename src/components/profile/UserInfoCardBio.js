import React from 'react';
import { Image } from 'antd';



export const UserInofCardBio = (props) => {
    return (
        <div className="card">
            <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                    <Image
                        width={150}
                        height={150}
                        src={props.avatar}
                        className="rounded-circle cover border overflow-hidden"
                    />
                    <div className="mt-3">
                        <h4>{props.first_name} {props.last_name}</h4>
                        <p className="text-secondary mb-1">{props.bio}</p>
                        <p className="text-muted font-size-sm">{props.country}, {props.city}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

