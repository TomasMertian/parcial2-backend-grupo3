import { Link } from 'react-router-dom';

//recibe 'children' que son las paginas que se van a mostrar dentro del layout
export const Layout = ({ children}) => (
    <div className="Layout">
        {/*Barra de navegación: Permite al usuario moverse entre rutas*/}
        <nav style={{ padding: '1rem', background: '#333', color: '#fff', display: 'flex', gap: '10px'}}>
            <Link style={{color: 'white'}} to="/login">Login</Link>
            <Link style={{color: 'white'}} to="/register">Registro</Link>
        </nav>

        {/*Aca se incorpora el contenido de cada página*/}
        <main className="container">{children}</main>

        {/*Pie de página*/}
        <footer className="footer" style={{ marginTop: '2rem', textAlign: 'center'}}>
            © 2026 Proyecto Colección
        </footer>
    </div>
);