import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/user/Navbar';
import Footer from '../../components/user/Footer';
import { useParams, useNavigate } from 'react-router-dom';
import FailToast from '../../components/user/FailToast';
import SuccessToast from '../../components/user/SuccessToast';

const Suggestion = () => {

  const [subjectData, setSubjectData] = useState({});
  const { id } = useParams();

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState({
    data: '',
    visibility: false
  });

  const [successMessage, setSuccessMessage] = useState({
    data: '',
    visibility: false
  });

  const fetchSubjectData = async () => {
    try {
      const response = await axios.get(`http://localhost:3500/subjects/${id}`);
      setSubjectData(response.data[0]);
    } catch (error) {
      console.log('Error fetching subject data: ' + error);
      setErrorMessage({ visibility: true, message: 'An error happened while fetching data. Please reload the page!' });
    }
  }

  useEffect(() => {
    fetchSubjectData();
  }, []);

  const handleBackToHome = () => {
    navigate('/subjects');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const suggestion = e.target.elements.suggestion.value;

      const response = await axios.post('http://localhost:3500/answers/suggestion', {
        suggestion: suggestion,
        subjectId: id
      });

      if (response.status === 201) {
        console.log('Sending Suggestion data error!');
        setSuccessMessage({ visibility: true, message: 'Thank you for submitting your suggestion successfully!' });
      } else {
        console.log('Sending Suggestion data error!');
        setErrorMessage({ visibility: true, message: 'An error happened while submitting the form. Please try again!' });
      }

    } catch (error) {
      console.log('Sending Suggestion data error: ' + error);
      setErrorMessage({ visibility: true, message: 'An error happened while submitting the form. Please try again!' });
    }
  }

  return (
    <>
      <Navbar />
      <div className='write-suggestion-page'>
        
        {errorMessage.visibility && <FailToast data={errorMessage} />}
        {successMessage.visibility && <SuccessToast data={successMessage} handleNavigation={handleBackToHome}/>}

        <div className="header">
          <div key={subjectData.sub_id}>
            <h5>{subjectData.subject}</h5>
            <div className="row">
              <div className="left">{subjectData.department} - {subjectData.faculty}</div>
              <div className="right">Writing Suggestion</div>
            </div>
          </div>
        </div>

        <div className="body">
          <form onSubmit={handleSubmit}>
            <div className="form-input">
              <label htmlFor="suggestion">Your suggestion</label>
              <textarea id='suggestion' name="suggestion" placeholder='Write suggestion here...' required></textarea>
            </div>

            <div className="submit-div">
              <button type="submit" className='submit-btn'>Submit</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Suggestion;
