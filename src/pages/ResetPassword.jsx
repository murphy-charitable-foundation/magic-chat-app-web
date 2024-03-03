import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ResetPassword = () => {
  const auth=getAuth () ;
  const [showModal, setShowModal] = useState(false);

  function resetPassword() {
    const email = document.getElementById('email').value;
    sendPasswordResetEmail(auth, email).then(() => {
      setShowModal(true);
    }).catch((error) => {
      console.error(error);
    });
  }

  const Modal = ({ onClose }) => (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      zIndex: 1000,
    }}>
      <h2>Check your email</h2>
      <p>Please check your email inbox and spam folder for a verification email to reset your password.</p>
      <button onClick={onClose}>Cancel</button>
      <button onClick={onClose}>Understood</button>
    </div>
  );
  return <div style={{textAlign:'center',paddingTop:'50px'}}>
  <div style={{maxWidth:'400px',margin:'auto'}}>
      <h1 style={{marginBottom:'50px'}}>Reset your password</h1>
      <img src="./logo.png" alt="Logo" style={{width:'100px',height:'auto',marginBottom:'20px'}}/>
      <div style={{marginBottom:'20px'}}>
          <input type="email" id="email" placeholder="Write your e-mail registered" style={{padding:'10px','width':'100%'}}/>
      </div>
      <button onClick={resetPassword} style={{padding:'10px',width:'100%',backgroundColor:'#48801c',color:'white',borderRadius:'20px'}}>Reset</button>
  </div>
  {showModal && (
        <div style={{position: 'fixed',zIndex: '1',paddingTop: '100px',left: '0',top: '0',width: '100%',height: '100%',overflow: 'auto',backgroundColor: 'rgb(0,0,0)',backgroundColor: 'rgba(0,0,0,0.4)'}}>
          <div style={{backgroundColor: '#fefefe',margin: 'auto',padding: '20px',border: '1px solid #888',width: '80%',boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',animationName: 'animatetop',animationDuration: '0.4s'}}>
            <h2 style={{color: '#023268'}}>Check your email</h2>
            <p>Please check your email inbox and spam folder for a verification email to reset your password.</p>
            <button onClick={() => setShowModal(false)} style={{ backgroundColor: '#48801c', color: 'white', padding: '10px 20px', margin: '10px 0', borderRadius:'20px'}}>Understood</button>
          </div>
        </div>
      )}
</div>
};

export default ResetPassword;
