import React from 'react'
import Navbar from '../../components/user/Navbar';
import Footer from '../../components/user/Footer';
import { Link } from 'react-router-dom';

export const Home = () => {
    return (
        <>
            <Navbar />
            <div className='home'>
                <h1>Teacher Evaluation Portal- Spring Semester, 2023</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates eius, impedit inventore magni incidunt vitae deleniti necessitatibus nam minus iste libero quia aspernatur sapiente. Incidunt nihil praesentium voluptate saepe dolorem! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi consectetur necessitatibus, doloremque iure voluptates maiores aliquam dicta saepe quasi ab iste mollitia veniam ullam ratione est id reprehenderit perspiciatis fugit.</p>

                <Link to="/subjects">Get Started</Link>
            </div>
            <Footer />
        </>
    )
}

export default Home;