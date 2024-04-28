import { useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInputGroup,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import { updateSearchedUser } from "../../../../redux/slices/usersSlice";
import { addChatCandidates } from "../../../../redux/slices/createGroupSlice";

import {
  useAppSelector,
  useAppDispatch,
} from "../../../../hooks/useAppSelectorAndDispatch";
import { IChatMember, IUser } from "../../../../redux/slices/Interfaces";
import searchUsersThunk from "../../../../redux/thunks/searchUsersThunk";

const AddCandidates: React.FC = () => {
  const { allUsers, filteredUsers, searchedUser } = useAppSelector(
    (state) => state.users
  );
  const currentUserId = useAppSelector((state) => state.loggedInUser.id);

  const createGroupState = useAppSelector((state) => state.createGroup);
  const currentUsersList = searchedUser ? filteredUsers : allUsers;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (searchedUser) dispatch(searchUsersThunk(searchedUser));
  }, [searchedUser]);

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    dispatch(updateSearchedUser(input !== "" ? input : null));
  };

  const add = (member: IChatMember) => {
    dispatch(addChatCandidates(member));
  };

  return (
    <MDBContainer fluid className="d-flex mb-3">
      <MDBCol>
        <MDBRow>
          <MDBInputGroup className="mb-3">
            <MDBInput placeholder="Search users" onInput={search} />
          </MDBInputGroup>

          {currentUsersList.map((user: IUser) => {
            //prevent showing current user and already added users
            return createGroupState.candidates.some(
              (member) =>
                member.memberId === user.id || user.id === currentUserId
            ) ? null : (
              //show candidats
              <MDBListGroup key={user.id}>
                <MDBListGroupItem>
                  <span
                    onClick={() =>
                      add({
                        userName: user.userName,
                        memberId: user.id,
                        isCreator: false,
                      })
                    }
                  >
                    {user.userName}
                  </span>
                </MDBListGroupItem>
              </MDBListGroup>
            );
          })}
        </MDBRow>
      </MDBCol>
    </MDBContainer>
  );
};

export default AddCandidates;
