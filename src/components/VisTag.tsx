import React from "react"

const VisTag = (props:{
    tagName: string,
}) => {

    return (
        <div className="m-2 md:m-4 lg:text-lg  bg-purple-500 font-black text-white p-4 md:p-8 min-w-16">{props.tagName}</div>
    );
}

export default VisTag;