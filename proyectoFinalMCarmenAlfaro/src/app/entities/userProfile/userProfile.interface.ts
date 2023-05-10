export interface UserProfile {
    userId: number;
    userName: string;
    userType: 'Alumno' | 'Dueño' | 'Admin';
    registrationDate: Date;
    emailAddress: string;
    psswdUser: string;
  }