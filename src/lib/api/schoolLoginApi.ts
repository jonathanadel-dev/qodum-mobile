// Login
type LoginProps = {
    admission_no: string;
    password: string;
    role: string;
}
export const login = async ({admission_no, password, role}: LoginProps) => {
    
}


// Register
type RegisterProps = {
    admission_no: string;
    password: string;
    confirmPassword: string;
    role: string;
}
export const register = async ({admission_no, password, confirmPassword, role}: RegisterProps) => {

}