// service to validate PIN
export const authService = {
    validatePin: (pin: string): Promise<boolean> =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (pin === '1234') {
            resolve(true);
          } else {
            reject(new Error('Incorrect PIN'));
          }
        }, 800);
      }),
  };