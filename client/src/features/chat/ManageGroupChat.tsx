import { MDBContainer, MDBCol, MDBRow } from "mdb-react-ui-kit"
import { FaPeopleGroup } from "react-icons/fa6";
import { useState } from "react";
import {
    useAppDispatch,
    useAppSelector,
  } from "../../hooks/useAppSelectorAndDispatch";

export const ManageGroupChat = () => {

    const [showWindow, setShowWindow ] =useState(false);

    const existingChat = useAppSelector((state) => state.existingChat);

    console.log(existingChat);
    return(
        <MDBContainer>
            <MDBRow onClick={()=>setShowWindow(true)}><div>{existingChat.chatName + " " }<FaPeopleGroup/></div></MDBRow>
            <MDBRow className={"d-" + (showWindow ? "flex" : "none")}>
                <MDBCol>
                    {existingChat.members.map((member)=>{
                        return(<div>{member.userName}</div>)
                    })}
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}