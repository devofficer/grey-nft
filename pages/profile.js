export default function Profile() {
  return null;
}

// import { useState, useEffect } from 'react';
// import { useMoralis } from 'react-moralis';
// import { useWeb3React } from '@web3-react/core';
// import Box from '@material-ui/core/Box';
// import TextField from '@material-ui/core/TextField';
// import ContainedButton from 'components/Buttons/ContainedButton';

// export default function Profile({}) {
//   const { chainId, account } = useWeb3React();
//   const {
//     authenticate,
//     login,
//     signup,
//     logout,
//     isAuthenticated,
//     user,
//     authError,
//     auth,
//     hasAuthError,
//     isLoggingOut,
//     isAuthenticating,
//   } = useMoralis();
//   const [username, setUsername] = useState('');
//   const [bio, setBio] = useState('');
//   const [password, setPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [showProfileEdit, setShowProfileEdit] = useState(false);
//   const [showPasswordEdit, setShowPasswordEdit] = useState(false);

//   const saveProfileHandler = async () => {
//     try {
//       user.setUsername(username); // built in
//       user.set('bio', bio); // custom attribute

//       await user.save();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const loginHandler = () => {
//     login(username, password);
//   };

//   const logoutHandler = () => {
//     if (isAuthenticated) {
//       logout();
//     }
//   };

//   const setPasswordHandler = () => {
//     setShowPasswordEdit(true);
//   };

//   const setProfileHandler = value => () => {
//     setShowProfileEdit(value);
//   };

//   const savePasswordHandler = async () => {
//     try {
//       if (newPassword !== confirmPassword) {
//         alert('passwords not equal');
//         return;
//       }

//       user.setPassword(newPassword);
//       await user.save();
//       setShowPasswordEdit(false);
//       alert('Password updated successfully!');
//     } catch (error) {
//       console.error(error);
//       alert('Error while saving new password. See the console');
//     }
//   };

//   useEffect(() => {
//     console.log('authError, auth, hasAuthError ==>', hasAuthError, auth, auth.error);
//     if (hasAuthError) {
//       alert(auth.error.message || 'Error');
//     }
//   }, [hasAuthError]);

//   const reauthenticate = async () => {
//     authenticate();
//     // logout();
//     // setTimeout(() => {
//     //   authenticate();
//     // }, 1000);
//   };

//   useEffect(() => {
//     if (account) {
//       reauthenticate();
//     }
//     // if (!account) {
//     //   if (isAuthenticated) {
//     //     logout();
//     //   }
//     // } else {
//     //   reauthenticate();
//     // }
//   }, [account]);

//   if (!account) {
//     return <h2>Wallet is not connected</h2>;
//   }

//   if (isLoggingOut) {
//     return <div>Log out...</div>;
//   }

//   if (isAuthenticating) {
//     return <div>Authenticating...</div>;
//   }

//   if (!isAuthenticated) {
//     return (
//       <div>
//         <ContainedButton onClick={() => authenticate()}>Authenticate</ContainedButton>
//         <br />
//         <TextField
//           fullWidth
//           label='Username'
//           value={username}
//           placeholder='username'
//           margin='normal'
//           onChange={ev => setUsername(ev.target.value)}
//         />
//         <TextField
//           fullWidth
//           label='Password'
//           value={password}
//           type='password'
//           placeholder='password'
//           margin='normal'
//           onChange={ev => setPassword(ev.target.value)}
//         />
//         <ContainedButton onClick={loginHandler}>Login</ContainedButton>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h1>Welcome: {user && user.get('username')}</h1>
//       <h2>Bio: {user && user.get('bio')}</h2>
//       {showProfileEdit ? (
//         <Box display='flex' flexWrap='wrap' alignItems='flex-start' justifyContent='flex-end'>
//           <TextField
//             fullWidth
//             value={username}
//             placeholder='username'
//             margin='normal'
//             onChange={ev => setUsername(ev.target.value)}
//           />
//           <TextField
//             fullWidth
//             value={bio}
//             multiline
//             rows={4}
//             placeholder='bio'
//             margin='normal'
//             onChange={ev => setBio(ev.target.value)}
//           />
//           <ContainedButton onClick={saveProfileHandler}>Save Profile</ContainedButton>
//           <ContainedButton onClick={setProfileHandler(false)}>Cancel</ContainedButton>
//         </Box>
//       ) : (
//         <ContainedButton onClick={setProfileHandler(true)}>Edit Profile</ContainedButton>
//       )}
//       {showPasswordEdit ? (
//         <Box display='flex' flexWrap='wrap' justifyContent='flex-end'>
//           <TextField
//             fullWidth
//             value={newPassword}
//             placeholder='password'
//             type='password'
//             margin='normal'
//             onChange={ev => setNewPassword(ev.target.value)}
//           />
//           <TextField
//             fullWidth
//             value={confirmPassword}
//             placeholder='confirm password'
//             type='password'
//             margin='normal'
//             onChange={ev => setConfirmPassword(ev.target.value)}
//           />
//           <ContainedButton onClick={savePasswordHandler}>Save Password</ContainedButton>
//           <ContainedButton onClick={ev => setShowPasswordEdit(false)}>Cancel</ContainedButton>
//         </Box>
//       ) : (
//         <ContainedButton onClick={setPasswordHandler}>Set Password</ContainedButton>
//       )}
//       <ContainedButton onClick={logoutHandler}>Logout</ContainedButton>
//     </div>
//   );
// }
