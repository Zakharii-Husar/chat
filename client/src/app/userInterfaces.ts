export interface IUserModel {
  id: string;
  nickname: string;
}

export interface IUsersModel {
  allUsers: IUserModel[];
  filteredUsers: IUserModel[];
  searchedUser: string | null;
}

export interface IChatMember {
  userName: string | null;
  memberId: string | null;
}
