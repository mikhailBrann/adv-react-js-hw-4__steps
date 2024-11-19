import { useState } from "react";
import StepType from "../types/StepType";
import Validate from "../classes/Validate";
import StepList from "./StepList";
import uniqid from 'uniqid';

const Steps = () => {
    const [data, setData] =  useState<Array<StepType>>([]);
    const [errors, setErrors] = useState({
        date: '',
        distance: ''
    });

    const updateDataList = (date: string, distance: number) => {
        const newData = [...data];
        const findItemIndex = newData.findIndex(item => item.date === date);

        if(findItemIndex !== -1) {
            newData[findItemIndex].distance = (parseFloat(newData[findItemIndex].distance) + parseFloat(distance)).toFixed(1);
        } else {
            newData.push({
                id: uniqid(),
                date,
                distance
            });
        }

        newData.sort((a, b) => {
            const [dayA, monthA, yearA] = a.date.split('.');
            const [dayB, monthB, yearB] = b.date.split('.');
            const dateA = new Date(2000 + parseInt(yearA), parseInt(monthA) - 1, parseInt(dayA));
            const dateB = new Date(2000 + parseInt(yearB), parseInt(monthB) - 1, parseInt(dayB));
            return dateB.getTime() - dateA.getTime();
        });
        setData(newData);
    }

    const removeItem = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        const id = event.currentTarget.dataset.id;
        const newData = data.filter(item => item.id !== id);
        setData(newData);        
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const [date, distance] = [form.date.value, form.distance.value];
        const newErrors = {
            date: '',
            distance: ''
        };

        //валидируем ошибки
        if(!Validate.isDate(date)) {
            newErrors.date = 'Дата должна быть в формате ДД.ММ.ГГ';
        }
        if(isNaN(distance) || distance <= 0) {
            newErrors.distance = 'Расстояние должно быть больше 0';
        }

        if(Object.values(newErrors).some(error => error)) {
            setErrors(newErrors);
            return;
        }
        
        updateDataList(date, distance);        
    }

    return (
        <div className='steps-form__wrap'>
            <form className="steps-form" autoComplete="off" onSubmit={handleSubmit}>
                <div className="form-fields__item">
                    <label className="form-fields__label" 
                        htmlFor="date">Дата (ДД.ММ.ГГ)</label>
                    <input 
                        type="text" 
                        name="date"
                        id="date" 
                        className="form__input form-fields" 
                    />
                    {errors.date && <span className="error-message">{errors.date}</span>}
                </div>
                <div className="form-fields__item">
                    <label className="form-fields__label" 
                        htmlFor="distance">Пройдено км</label>
                    <input 
                        type="text" 
                        name="distance"
                        id="distance" 
                        className="form__input form-fields" 
                    />
                    {errors.distance && <span className="error-message">{errors.distance}</span>}
                </div>
                <button className="form-btn" type="submit">Ok</button>
            </form>
            <StepList data={data} removeItem={removeItem}/>
        </div>
    );
}

export default Steps;