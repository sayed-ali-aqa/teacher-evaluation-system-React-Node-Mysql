import React from 'react';
import Navbar from '../../components/user/Navbar';
import Footer from '../../components/user/Footer';

const PrivacyPollicy = () => {
    return (
        <>
            <Navbar />
            <div className='privacy-policy'>
                <h1>Privacy Policy for Teacher Evaluation System</h1>
                <p>At Khana-e Noor University, we are committed to protecting the privacy and confidentiality of our users. This privacy policy outlines the types of personal information we collect, how we use and protect that information, and the choices you have regarding your personal data. Please read this policy carefully to understand our practices regarding your information.</p>

                <ol>
                    <li>
                        <span className='title'>Collection and Use of Personal Information:</span>
                        <ul>
                            <li>We collect personal information, such as name, student ID, and email address, from students for the purpose of conducting teacher evaluations.</li>
                            <li>The collected information is used solely for evaluation purposes and to improve the quality of education.</li>
                            <li>We may also use aggregated and anonymized data for statistical analysis and research purposes.</li>
                        </ul>
                    </li>

                    <li>
                        <span className='title'>Consent and Voluntary Participation:</span>
                        <ul>
                            <li>Participation in the teacher evaluation process is voluntary, and students have the right to choose whether or not to participate.</li>
                            <li>By participating in the evaluation, students provide their consent for the collection, use, and processing of their personal information as outlined in this privacy policy.</li>
                        </ul>
                    </li>
                    <li>
                        <span className='title'>Data Security:</span>
                        <ul>
                            <li>We take appropriate technical and organizational measures to protect the personal information we collect against unauthorized access, alteration, disclosure, or destruction.</li>
                            <li>Access to personal information is restricted to authorized personnel only, who are required to maintain the confidentiality of such information.</li>
                        </ul>
                    </li>
                    <li>
                        <span className='title'>Disclosure of Personal Information:</span>
                        <ul>
                            <li>We do not disclose personal information collected through the teacher evaluation system to any third parties, except in cases where disclosure is required by law or with the explicit consent of the individual.</li>
                        </ul>
                    </li>
                    <li>
                        <span className='title'>Retention of Personal Information:</span>
                        <ul>
                            <li>We retain personal information collected through the teacher evaluation system for as long as necessary to fulfill the evaluation purposes.</li>
                            <li>After the retention period, personal information is securely disposed of or anonymized to prevent identification.</li>
                        </ul>
                    </li>
                    <li>
                        <span className='title'>Access and Control:</span>
                        <ul>
                            <li>Students have the right to access, update, and correct their personal information.</li>
                            <li>If you wish to exercise your rights or have any concerns regarding your personal data, please contact our data protection officer (DPO) using the contact information provided at the end of this privacy policy.</li>
                        </ul>
                    </li>
                    <li>
                        <span className='title'>Third-Party Services:</span>
                        <ul>
                            <li>Our teacher evaluation system may integrate with third-party services, such as authentication providers or analytics tools.</li>
                            <li>Please note that the privacy practices of these third-party services are governed by their respective privacy policies, and we are not responsible for their actions or policies.</li>
                        </ul>
                    </li>
                    <li>
                        <span className='title'>Changes to the Privacy Policy:</span>
                        <ul>
                            <li>We reserve the right to modify or update this privacy policy at any time.</li>
                            <li>Any significant changes will be communicated to users through appropriate means.</li>
                        </ul>
                    </li>
                    <li>
                        <span className='title'>Contact Information:</span>
                        <ul>
                            <li>If you have any questions, concerns, or requests regarding this privacy policy or the protection of your personal information, please contact our students affairs manager at the univsersity.</li>
                        </ul>
                    </li>
                </ol>

                <p>By using the teacher evaluation system, you acknowledge that you have read, understood, and agreed to the terms and conditions outlined in this privacy policy.</p>
            </div>
            <Footer />
        </>
    )
}

export default PrivacyPollicy;