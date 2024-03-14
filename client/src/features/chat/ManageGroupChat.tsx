import { MDBContainer, MDBCol, MDBRow } from "mdb-react-ui-kit"
import { FaPeopleGroup } from "react-icons/fa6";
import {
    useAppDispatch,
    useAppSelector,
  } from "../../hooks/useAppSelectorAndDispatch";

export const ManageGroupChat = () => {

    const existingChat = useAppSelector((state) => state.existingChat);
    return(
        <MDBContainer>
            <MDBRow><div>{existingChat.chatName + " " }<FaPeopleGroup/></div></MDBRow>
            <MDBRow>
                <MDBCol>
                    {existingChat.membersNicknames.map((members)=>{
                        return(<div>{members}</div>)
                    })}
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}