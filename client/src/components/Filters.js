import Typography from '@mui/material/Typography';
import "./css/Filters.css"

function Filters() {
    return (
        <section className="filters">

            <div className="price">
                <Typography variant='button' htmlFor="price">Precio</Typography>
                <input
                    type="range"
                    id="price"
                    min="0"
                    max="100"
                />
            </div>

            <div className="category">
                <Typography variant='button' htmlFor="category">Categoria</Typography>
                <select id="category">
                    <option value="All">Todas</option>
                    <option value="Hortalizas">Hortalizas</option>
                    <option value="Frutas">Frutas</option>
                </select>
            </div>

        </section>
    );
}

export default Filters