import Lock from "../assets/icons/Lock.svg";
import Google from "../assets/icons/Google.svg";
import Facebook from "../assets/icons/Facebook.svg";
import Github from "../assets/icons/Github.svg";
import Twitter from "../assets/icons/Twitter.svg";
import PropTypes from "prop-types";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
function Register({ toggleDarkMode, modeLogo, logo }) {
  const {
    registerLocal,
    authenticateGoogle,
    authenticateFacebook,
    authenticateGitHub,
    authenticateTwitter,
  } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerHandler = (e) => {
    e.preventDefault();
    registerLocal({ email, password });
  };

  const registerWithSocialLinks = (str) => {
    if (str === "google") authenticateGoogle();
    else if (str === "github") authenticateGitHub();
    else if (str === "facebook") authenticateFacebook();
    else if (str === "twitter") authenticateTwitter();
  };

  return (
    <div className='flex justify-center items-center min-h-[100lvh] bg-light-light-bg dark:bg-dark-dark-bg'>
      <div className='min-[500px]:w-[29rem] w-full px-3 overflow-auto'>
        <div className=' tracking-[-0.0393rem] p-5 min-[500px]:p-8 sm:p-12 space-y-6 border border-border-color rounded-3xl shadow '>
          {" "}
          <div className='flex justify-between'>
            <img src={logo} alt='' />
            <img
              src={modeLogo}
              className='w-6 hover:cursor-pointer'
              onClick={toggleDarkMode}
              alt='sun'
            />
          </div>
          <h4 className='text-lg font-semibold font-noto max-w-xs text-light-dark dark:text-dark-dark'>
            Join thousands of learners from around the world
          </h4>
          <p className='font-normal text-[1rem] text-light-dark dark:text-dark-dark'>
            Master web development by making real-life projects. There are
            multiple paths for you to choose
          </p>
          <div className='inputs'>
            <form
              onSubmit={(e) => {
                registerHandler(e);
              }}>
              <div className='email relative mb-6'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none'>
                  <svg
                    className='w-4 h-4 text-gray-500'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 20 16'>
                    <path d='m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z' />
                    <path d='M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z' />
                  </svg>
                </div>
                <input
                  type='text'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className='bg-gray-50 border border-gray-300 outline-none text-light-light bg-inherit text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5'
                  placeholder='Email'
                  required
                />
              </div>
              <div className='relative mb-6'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                  <img src={Lock} className='w-6 h-6 ' alt='' />
                </div>
                <input
                  type='password'
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className='bg-gray-50 border border-gray-300 text-light-light bg-inherit outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5'
                  placeholder='Password'
                  minLength={6}
                  required
                />
              </div>
              <button
                type='submit'
                className='relative bg-light-link text-white w-full py-2 rounded-md font-semibold'>
                Start coding now
              </button>
            </form>
          </div>
          <div className='social-login space-y-6'>
            <p className='text-light-light text-center'>
              or continue with these social profile
            </p>
            <div className='social-links flex justify-between'>
              <img
                onClick={() => {
                  registerWithSocialLinks("google");
                }}
                className='hover:cursor-pointer'
                src={Google}
                alt='google'
              />
              <img
                onClick={() => {
                  registerWithSocialLinks("facebook");
                }}
                className='hover:cursor-pointer'
                src={Facebook}
                alt='facebook'
              />
              <img
                onClick={() => {
                  registerWithSocialLinks("twritter");
                }}
                className='hover:cursor-pointer'
                src={Twitter}
                alt='twritter'
              />
              <img
                onClick={() => {
                  registerWithSocialLinks("github");
                }}
                className='hover:cursor-pointer'
                src={Github}
                alt='github'
              />
            </div>
            <p className='already-account text-center text-light-light'>
              Adready a member?{" "}
              <Link to='/login' className='text-light-link'>
                Login
              </Link>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

Register.propTypes = {
  toggleDarkMode: PropTypes.func,
  modeLogo: PropTypes.string,
  logo: PropTypes.string,
};

export default Register;
