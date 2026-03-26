export const getUniqueEmployeeData = () => {
  const timestamp = Date.now();
  return {
    name: `Test User ${timestamp}`,
    email: `testuser${timestamp}@example.com`,
    role: 'Developer',
    isRemote: true
  };
};
