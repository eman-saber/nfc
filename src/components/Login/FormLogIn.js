// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Form, Button } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
// function FormLogIn() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//     const handleLogIn = (e) => {
//         e.preventDefault();

//         const storedEmail = localStorage.getItem("userEmail");
//         const storedPassword = localStorage.getItem("userPassword");

//         if (email === storedEmail && password === storedPassword) {
            
//             navigate("/home");
//         } else {
//             alert("Incorrect email or password. Please try again.");
//         }
//     };

//     return (
//         <>
//             <Form onSubmit={handleLogIn}>
//                 <Form.Group controlId="formEmail" className="direction-L">
//                     <Form.Label>
//                         <FontAwesomeIcon icon={faEnvelope} className="me-2" style={{ color: "#74C0FC" }} />
//                         Email Address
//                     </Form.Label>
//                     <Form.Control type="email" placeholder="Enter email" value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required/>
//                 </Form.Group>

//                 <Form.Group controlId="formPassword" className="mt-3 direction-L">
//                     <Form.Label>
//                         <FontAwesomeIcon icon={faLock} className="me-2" style={{ color: "#74C0FC" }} />
//                         Password
//                     </Form.Label>
//                     <Form.Control type="password" placeholder="Enter password" value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required/>
//                 </Form.Group>

//                 <div className="mt-3">
//                     <Button variant="primary" type="submit">
//                         Login
//                     </Button>
//                 </div>
//             </Form>
//         </>
//     );
// }

// export default FormLogIn;