/**
 * Lightweight, dependency-free validation.
 * (If the project scales, swap this for Yup/Zod — but the
 * function signatures below can stay identical.)
 */
export function validateLogin({ email, password }) {
    const errors = {};
    if (!email) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Invalid email format';

    if (!password) errors.password = 'Password is required';
    else if (password.length < 6) errors.password = 'Password must be at least 6 characters';

    return errors;
}

export function validateRegister({ name, email, password, confirmPassword }) {
    const errors = validateLogin({ email, password });

    if (!name || name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters';
    }
    if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
}