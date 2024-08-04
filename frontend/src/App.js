import './assets/styles/main.scss';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/user/Home';
import Profile from './pages/user/Profile';
import SubjectCards from './pages/user/SubjectCards';
import ResetPassword from './pages/user/auth/ResetPassword';
import Login from './pages/user/auth/Login';
import PasswordResetLink from './pages/user/auth/PasswordResetLink';
import EvaluationSuccess from './pages/user/EvaluationSuccess';
import QuestionsForm from './pages/user/QuestionsForm';
import Suggestion from './pages/user/Suggestion';
import PrivacyPollicy from './pages/user/PrivacyPollicy';
// ---------- Admin Dashboard Imports ---------------
import DashboardIndex from './pages/admin/DashboardIndex';
import Students from './pages/admin/Students';
import Student from './pages/admin/Student';
import EditStudent from './pages/admin/EditStudent';
import Teachers from './pages/admin/Teachers';
import Teacher from './pages/admin/Teacher';
import EditTeacher from './pages/admin/EditTeacher';
import Faculties from './pages/admin/Faculties';
import EditFaculty from './pages/admin/EditFaculty';
import Departments from './pages/admin/Departments';
import Subjects from './pages/admin/Subjects';
import EditSubject from './pages/admin/EditSubject';
import Questions from './pages/admin/Questions';
import EditQuestion from './pages/admin/EditQuestion';
import Answers from './pages/admin/Answers';
import AddFaculty from './pages/admin/AddFaculty';
import AddDepartment from './pages/admin/AddDepartment';
import AddQuestion from './pages/admin/AddQuestion';
import AddStudent from './pages/admin/AddStudent';
import AddTeacher from './pages/admin/AddTeacher';
import AddSubject from './pages/admin/AddSubject';
import Scroll from './pages/admin/Scroll';

function App() {
  return (
    <>
      <Routes>
        <Route path='/subjects' element={<SubjectCards />} />
        <Route path='/' element={<Home />} />
        <Route path='/user/profile' element={<Profile />} />
        <Route path='/user/reset-password' element={<ResetPassword />} />
        <Route path='/user/login' element={<Login />} />
        <Route path='/user/password-reset' element={<PasswordResetLink />} />
        <Route path='/evaluation-success/:id' element={<EvaluationSuccess />} />
        <Route path='/evaluation-form/:id' element={<QuestionsForm />} />
        <Route path='/evaluation-form/suggestion/:id' element={<Suggestion />} />
        <Route path='/privacy-policy' element={<PrivacyPollicy />} />
        {/* ---------- Admin Dashboard Imports --------------- */}
        <Route path='/dashboard' element={<DashboardIndex />} />
        <Route path='/dashboard/students' element={<Students />}></Route>
        <Route path='/dashboard/students/:id' element={<Student />}></Route>
        <Route path='/dashboard/students/edit/:id' element={<EditStudent />}></Route>
        <Route path='/dashboard/teachers' element={<Teachers />}></Route>
        <Route path='/dashboard/teachers/:id' element={<Teacher />}></Route>
        <Route path='/dashboard/teachers/edit/:id' element={<EditTeacher />}></Route>
        <Route path='/dashboard/faculties' element={<Faculties />}></Route>
        <Route path='/dashboard/faculties/edit/:id' element={<EditFaculty />}></Route>
        <Route path='/dashboard/departments' element={<Departments />}></Route>
        <Route path='/dashboard/subjects' element={<Subjects />}></Route>
        <Route path='/dashboard/subjects/edit/:id' element={<EditSubject />}></Route>
        <Route path='/dashboard/questions' element={<Questions />}></Route>
        <Route path='/dashboard/questions/edit/:id' element={<EditQuestion />}></Route>
        <Route path='/dashboard/answers' element={<Answers />}></Route>
        <Route path='/dashboard/faculties/new' element={<AddFaculty />}></Route>
        <Route path='/dashboard/departments/new' element={<AddDepartment />}></Route>
        <Route path='/dashboard/questions/new' element={<AddQuestion />}></Route>
        <Route path='/dashboard/students/new' element={<AddStudent />}></Route>
        <Route path='/dashboard/teachers/new' element={<AddTeacher />}></Route>
        <Route path='/dashboard/subjects/new' element={<AddSubject />}></Route>
        <Route path='/dashboard/scroll' element={<Scroll />}></Route>
      </Routes >
    </>
  );
}

export default App;
