import React from 'react';
function Point(props){

    const date = new Date();

    const creationDate =date.getHours() + ":" + date.getMinutes();

    return (
        <div>
            <table>
                <tbody>
                <tr>
                    <td className={"point-point point"}><p>{props.point}</p></td>
                    <td className={"point-desc point"}><p>{props.desc}</p></td>
                    <td className={"point-date point"}><p>{creationDate}</p></td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}
export default Point;
//<td className={"point-interactions point"}><button type="button" value="delete">Delete</button></td>
