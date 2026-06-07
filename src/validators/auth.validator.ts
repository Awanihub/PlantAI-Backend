export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateOTP = (otp: string): boolean => {
  return /^\d{6}$/.test(otp);
};

export const validateSignup = (data: any): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.fullName || typeof data.fullName !== "string" || data.fullName.trim().length === 0) {
    errors.push("Full name is required");
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.push("Valid email is required");
  }

  if (!data.password || !validatePassword(data.password)) {
    errors.push("Password must be at least 6 characters");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const validateSignin = (data: any): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.email || !validateEmail(data.email)) {
    errors.push("Valid email is required");
  }

  if (!data.password) {
    errors.push("Password is required");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const validateForgotPassword = (data: any): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.email || !validateEmail(data.email)) {
    errors.push("Valid email is required");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const validateVerifyOtp = (data: any): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!data.email || !validateEmail(data.email)) {
    errors.push("Valid email is required");
  }

  if (!data.otp || !validateOTP(data.otp)) {
    errors.push("OTP must be a 6-digit number");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const validateResetPassword = (
  data: any
): {
  valid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (
    !data.newPassword ||
    !validatePassword(data.newPassword)
  ) {
    errors.push(
      "Password must be at least 6 characters"
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};