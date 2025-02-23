// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Form, Button } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

// function FormSignUp() {
//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const navigate = useNavigate();

//     const handleSignUp = (e) => {
//         e.preventDefault();

//         localStorage.setItem("userEmail", email);
//         localStorage.setItem("userPassword", password);

//         alert("Account created successfully!");
//         navigate("/login");
//     };

//     return (
//         <>
//             <Form onSubmit={handleSignUp}>
//                 <Form.Group controlId="formUsername" className="direction-L">
//                     <Form.Label>
//                         <FontAwesomeIcon icon={faUser} className="me-2" style={{ color: "#74C0FC" }} />
//                         Username
//                     </Form.Label>
//                     <Form.Control type="text" placeholder="Enter username" value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         required />
//                 </Form.Group>

//                 <Form.Group controlId="formEmail" className="mt-3 direction-L">
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

//                 <Button variant="primary" type="submit" className="mt-3">
//                     Sign Up
//                 </Button>
//             </Form>
//         </>
//     );
// }

// export default FormSignUp;