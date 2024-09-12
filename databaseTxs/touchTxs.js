import { useSelector } from "react-redux";

const createTouch = (db, dispatch, playerID, seriesNumber, touchNumber, touchType, terminal) => {
    const pointInfo = useSelector((state) => state.pointInfo);
    db.transction(tx => {
        tx.executeSql(
            'INSERT INTO touch (pointID, playerID, seriesNumber, touchNumber, touchType, terminal) VALUES (?, ?, ?, ?, ?, ?);',
            [pointInfo.pointID, playerID, seriesNumber, touchNumber, touchType, terminal],
            (_, result) => {
                console.log('Touch logged')
            },
            (_, error) => {
                console.error('Error inserting touch: ', error);
            }

        );
    });
}

export { createTouch }; 