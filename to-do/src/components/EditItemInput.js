import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function EditItemInput(props) {
    const [input, setInput] = useState(props.edit? props.edit.value:'');
    const [startDate, setStartDate] = useState(new Date(props.date));
    const textRef = useRef();

    useEffect(() => {
        textRef.current.focus();
        textRef.current.setSelectionRange(-1, -1);
    }, []);
    
    const editText = e => {
        setInput(e.target.value);
    }

    const changeDate = (date) => {
        setStartDate(date);
        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            isCompleted: false, 
            text: input,
            date: date.toLocaleDateString()
        });
    }

    const handleKeyDown = e => {
        if(e.key === 'Enter') {
            props.onSubmit({
                id: Math.floor(Math.random() * 10000),
                isCompleted: false, 
                text: input,
                date: startDate.toLocaleDateString()
            });
            setInput('');
        }
    }

    return (
        <div className='edit-text'>
            <textarea 
                ref={textRef}
                defaultValue={input}
                onKeyDown={handleKeyDown}
                onChange={editText}
            />
            <DatePicker
                selected={startDate}
                onChange={changeDate}
            />
        </div>
        );
}

export default EditItemInput;
