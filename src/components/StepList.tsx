
import StepType from "../types/StepType";

const StepList = ({...props}) => {
    const {data, removeItem} = props;

    if(data.length === 0) {
        return;
    }

    const stepList = [];
    const StepItem = (item: StepType) => {
        return (
            <div className="step-item" key={item.id}>
                <div className="step-item__date">{item.date}</div>
                <div className="step-item__distance">{item.distance}</div>
                <div className="step-item__remove" data-id={item.id} onClick={removeItem}>✘</div>
            </div>
        );
    }

    for(const item of data) {
        stepList.push(StepItem(item));
    }

    return (
        <div className="step-list__wrap">
            <div className="step-list__header">
                <div className="step-list__date">Дата (ДД.ММ.ГГ)</div>
                <div className="step-list__distance">Пройдено км</div>
                <div className="step-list__actions">Действия</div>
            </div>
            <div className="step-list">
                {stepList}
            </div>
        </div>
    )
}

export default StepList;