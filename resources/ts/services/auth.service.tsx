import authRepo from '../repo/auth.repo';

const authLogin = async (email: string, password: string) => {
    const response = await authRepo.authLogin(email, password);
    return response;
};

const authService = {
    authLogin,
};

export default authService;
