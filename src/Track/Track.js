import styles from './Track.module.css';


function Track({title, artist, album, onAdd}) {
    return (
        <div className={styles.container} className={styles.fixButton}>
            <div >
                <h3>{title}</h3>
                <p> {artist} | {album}</p>
            </div>
            <button className={styles.addButton}
                    onClick={onAdd}
            >+</button>
        </div>
    )};
    

export default Track;