import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

// this is a custom hook that takes in an array of errors and throws an error if any of them are defined
// this displays error message on the screen so user can report it
// triggers error boundary in routes.tsx
export const useError = (...errors: Array<FetchBaseQueryError | SerializedError | undefined>) => {
  let errorMessage = '';
  errors.forEach((error) => {
    if (error) {
      errorMessage += JSON.stringify(error) + '\n';
    }
  });

  if (errorMessage) {
    throw new Error(errorMessage);
  }
};
