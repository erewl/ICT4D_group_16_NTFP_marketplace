import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import AuthService from '../services/auth-service';
import { UserContext } from '../context/UserContext';

export default function LoginModal(props) {

    const [context, setContext] = React.useContext(UserContext);

    const userRef = React.useRef('admin')
    const pwdRef = React.useRef('admin')


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 275,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: '25px',
    };

    const loginUser = () => {
        AuthService.loginUser({ user: userRef.current.value, password: pwdRef.current.value }, token => {
            setContext({ ...context, token: token })
            localStorage.setItem('token', token)
        })
        props.setClose()
    }

    return (
        <Modal
            open={true}
            onClose={() => props.setClose()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box>
                <TextField label="Username" variant="outlined" inputRef={userRef} />
                <TextField sx={{mt:2}} label="Password" type="password" inputRef={pwdRef} />
                </Box>
                <Button sx={{mt: 2, fontSize: 16}} variant="outlined" onClick={() => loginUser()} >Login</Button>
            </Box>
        </Modal>
    )
}