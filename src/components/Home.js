import '../components/Home.css';
import homePic from '../images/homePic.svg'
function Home(){
    return(
        <>
         <img src={homePic} alt="" width="400" className="d-block m-auto"/>
              <h1 className='light-gray-text'> Approach your NFC </h1>
        </>
    )
}
export default Home;