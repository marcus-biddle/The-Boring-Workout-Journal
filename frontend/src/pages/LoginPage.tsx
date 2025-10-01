import React from 'react'
import { useLocation, useNavigate } from 'react-router';
import { FormModal } from '../components/FormModal';

export const LoginPage = () => {s
    const navigate = useNavigate();
    const location = useLocation();

    // The location user intended to visit before login
    const from = location.state?.from?.pathname || "/dashboard";

    const handleLogin = async (email: string, password: string) => {
    const success = await login(email, password);
    console.log(success)
    if (success) {
    // Navigate back to the page user tried to visit or default
    navigate(from, { replace: true });
    } else {
    // handle error
    }
    };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <FormModal 
            open={true}
            setOpen={() => null}
            title={'Login'}
            subtext={'Please enter your username and password.'}
            fields={[
                { name: "email", label: "Email", type: "text" },
                { name: "password", label: "Password", type: "text" },
            ]}
            formId={'loginform'}
            confirmationButtonText={'Login'}
            onSubmit={(data) => handleLogin(data.email, data.password)} />
      </div>
  )
}
