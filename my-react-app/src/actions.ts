// Simulated Server Action
// In a real Next.js app, this would be a "use server" function.

export type ActionState = {
  message: string;
  count: number;
  status: 'idle' | 'success' | 'error';
  timestamp: number;
};

export const initialActionState: ActionState = {
  message: 'Ready to process',
  count: 0,
  status: 'idle',
  timestamp: Date.now(),
};

export async function processData(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const input = formData.get('inputData') as string;
  
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Randomly succeed or fail for demonstration
  const isSuccess = Math.random() > 0.3; // 70% success rate

  if (!input) {
    return {
      ...prevState,
      message: 'Error: Input cannot be empty!',
      status: 'error',
      timestamp: Date.now(),
    };
  }

  if (isSuccess) {
    return {
      message: `Successfully processed: "${input}"`,
      count: prevState.count + 1,
      status: 'success',
      timestamp: Date.now(),
    };
  } else {
    return {
      ...prevState,
      message: 'Error: Processing failed (Simulated)',
      status: 'error',
      timestamp: Date.now(),
    };
  }
}
