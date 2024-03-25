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
