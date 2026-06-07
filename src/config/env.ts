export const validateEnvironmentVariables = (): void => {
  const requiredEnvVars = [
    "MONGO_URI",
    "JWT_SECRET",
    "EMAIL_USER",
    "EMAIL_PASS",
  ];

  const missingVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
  );

  if (missingVars.length > 0) {
    console.error(
      `❌ Missing required environment variables: ${missingVars.join(", ")}`
    );
    process.exit(1);
  }

  console.log("✅ All required environment variables are set");
};
