import React, {useState} from "react";

export default function ArrayStateVariable() {
    const [array, setArray] = useState([1, 2, 3, 4, 5]);
    const addElement = () => {
        setArray([...array, Math.floor(Math.random() * 100)]);
    };
    const deleteElement = (index: number) => {
        setArray(array.filter((item, i) => i !== index));
    };
    return (
        <div id="wd-array-state-variables">
            <h2>Array State Variable</h2>
            {/*<button onClick={addElement} className="btn btn-success">Add Element</button>*/}
            {/*<ul>*/}
            {/*    {array.map((item, index) => (*/}
            {/*        <li key={index}>*/}
            {/*            {item}*/}
            {/*            <button onClick={() => deleteElement(index)}*/}
            {/*                    id="wd-delete-element-click" className="btn btn-danger">*/}
            {/*                Delete*/}
            {/*            </button>*/}
            {/*        </li>*/}
            {/*    ))}*/}
            {/*</ul>*/}

            <div className="row justify-content-start">
                <div className="col-auto">
                    <button type="button" onClick={addElement} className="btn btn-success mb-3 ms-2">
                        Add Element
                    </button>
                </div>
            </div>

            <div className="list-group">
                {array.map((item, index) => (
                    <div key={index} className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">{item}</div>
                        <button
                            type="button"
                            className="btn btn-danger ms-2"
                            onClick={() => deleteElement(index)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            <hr/>
        </div>
    );
}

