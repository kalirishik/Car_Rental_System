import { Link } from 'react-router'
import CarImage from "../image/car-image.png";

const Home = () => {
    return (
        <div className='Home'>
            <div>
                <h1 className="home-title">
                    Drive Your Dream Car Today
                    <img src={CarImage} alt="car" className="inline-car" />
                </h1>
                <p>Affordable rentals. Premium cars. Anytime, anywhere.</p>
                <button><Link to="/loginPage">Explore Cars</Link></button>
            </div>
        </div>
    )
}

export default Home