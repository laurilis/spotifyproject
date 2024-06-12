import styles from './Track.module.css';


function Track({title, artist, album}) {
    return (
        <div>
        <h3>{title}</h3>
        <p> {artist} | {album}           
        </p>
        </div>
    )};
    

export default Track;