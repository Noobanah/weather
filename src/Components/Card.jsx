import './card.css';

export default function Card({ place, deleteNote, currentTown, temperature }) {
    function handleDelete(event) {
      event.stopPropagation();
      deleteNote();
    }
  
    return (
      <li onClick={currentTown} className="card">
        <h3>{place}</h3>
        <p className="fev-temp">{temperature}°C</p>
        <button onClick={handleDelete}>Delete</button>
      </li>
    );
  }