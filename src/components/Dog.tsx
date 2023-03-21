import React from "react"

const Dog = (props:{
    style: string,
    imgLink: string,
}) => {
    return (
        <div className={props.style}>
            <img className="w-full h-full object-contain" src={props.imgLink}/>
        </div>
    );
}

export default Dog;