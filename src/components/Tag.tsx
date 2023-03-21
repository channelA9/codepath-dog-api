import React from "react"

const Tag = (props:{
    tagName: string,
    btn: any
}) => {

    function clicked() {
        props.btn(props.tagName)
    }

    return (
        <button onClick={clicked} className="m-2 md:m-4 lg:text-lg  bg-purple-500 hover:bg-purple-800 font-black text-white p-4 md:p-8 min-w-16">{props.tagName}</button>
    );
}

export default Tag;