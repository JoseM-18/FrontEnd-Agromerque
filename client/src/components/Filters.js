import "./css/Filters.css"

function Filters() {
    return(
        <section className="filters">

            <div className="price">
                <label htmlFor="price">Precio</label>  
                <input
                    type="range"
                    id="price"
                    min="0"
                    max="100"
                />
            </div>

            <div className="category">
                <label htmlFor="category">Categoria</label>  
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