export const isUserNotConfirmedError = (error: any) =>
	error?.name === 'UserNotConfirmedException';
