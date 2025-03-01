import * as React from 'react';




function ButtonArrowLeft({onClick}){
    return (<button onClick={onClick} className=" border-2 border-green-500 rounded-br-2xl h-8 w-8 mt-1 ml-1 text-center bg-black text-white font-bold rounded-lg shadow-lg transition-all duration-300  hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-1 rounded-l-2xl" aria-hidden="true">&lt;</button>)
}
export {ButtonArrowLeft}

function ButtonArrowRight({ onClick }) {
    return (
        <button
            className=" border-2 border-green-500 h-8 w-8 bg-black text-center justify-center text-white font-bold  rounded-lg shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 mb-1 rounded-r-2xl mt-1 ml-0.5 rounded-bl-2xl"
            onClick={onClick}
            aria-hidden="true"
        >&gt;
        </button>
    );
}

export {ButtonArrowRight}
