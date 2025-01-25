import FormSignup from "./FormSignup";
import { Link } from "react-router-dom";
import signUpPic from '../../images/signUpPic.svg'
import { Container, Row, Col } from 'react-bootstrap';
import './SignUp.css';
function SignUp(){
    return(
        <>
              <Container fluid className="d-flex justify-content-center align-items-center"  style={{ minHeight: "100vh" }}>
              <Row className="w-100 card-style"   style={{maxWidth: "900px",height:"600px",borderRadius: "15px",overflow: "hidden", }}>
              <Col md={6} className="bg-primary text-white  p-1 order-md-1 ">
                  <h2 className='mt-5 text-center'>WELCOME 🤗!</h2>
                  <p className="text-center mt-1">
                      To keep connected with us,
                      <br/> please sign up with your personal info.
                  </p>
              </Col>
              <Col md={6} className="p-4 d-flex flex-column justify-content-center order-md-2" >
               <div className="text-center">
                <img src={signUpPic} alt="sign up" height="100" />
               <h3 className="mt-3">Sign Up</h3>
               </div>

               {<FormSignup/>}
       
          <div className="mt-3 text-center">
            <p>
              Already have an account?{" "}
              <Link to='/' className="text-decoration-none">
               Login
              </Link>
            </p>
          </div>
        </Col>
        </Row>
        </Container>
        </>
    )
}
export default SignUp;