export type UserRole = "parent" | "orthophonist";
export type SignupMethod = "email" | "google" | "phone";
export type KidAgeRange = "3-5" | "5-9";
export type KidGender = "male" | "female";

export type MockOrthophonist = {
  id: string;
  name: string;
  clinic: string;
  city: string;
};

export const MOCK_ORTHOPHONISTS: MockOrthophonist[] = [
  { id: "1", name: "Dr. Sarah Benali", clinic: "Speech & Smile Center", city: "Casablanca" },
  { id: "2", name: "Dr. Karim El Amrani", clinic: "Kids Voice Clinic", city: "Rabat" },
  { id: "3", name: "Dr. Lina Mansouri", clinic: "Little Talkers", city: "Marrakech" },
];

export type ParentSignupData = {
  firstName: string;
  lastName: string;
  phone: string;
  kidName: string;
  kidAge: KidAgeRange | null;
  kidGender: KidGender | null;
  orthophonistId: string | null;
  email: string;
  password: string;
  method: SignupMethod | null;
};

export type OrthophonistSignupData = {
  firstName: string;
  lastName: string;
  phone: string;
  professionalEmail: string;
  clinicName: string;
  licenseNumber: string;
  city: string;
  email: string;
  password: string;
  method: SignupMethod | null;
};

export const emptyParentSignup = (): ParentSignupData => ({
  firstName: "",
  lastName: "",
  phone: "",
  kidName: "",
  kidAge: null,
  kidGender: null,
  orthophonistId: null,
  email: "",
  password: "",
  method: null,
});

export const emptyOrthophonistSignup = (): OrthophonistSignupData => ({
  firstName: "",
  lastName: "",
  phone: "",
  professionalEmail: "",
  clinicName: "",
  licenseNumber: "",
  city: "",
  email: "",
  password: "",
  method: null,
});