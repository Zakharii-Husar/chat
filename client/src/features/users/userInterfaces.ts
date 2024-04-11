export interface IUserModel {
  id: string;
  userName: string;
  email: string;
  fullName: string;
  avatarName: string | null;
  bio: string | null;
}

export interface IUsersModel {
  allUsers: IUserModel[];
  filteredUsers: IUserModel[];
  searchedUser: string | null;
}

export interface IUserDetails {
  id: string | null;
  userName: string | null;
  email: string | null;
  fullName: string | null;
  avatarName: string | null;
  bio: string | null;
  lastVisit: Date | null;
}